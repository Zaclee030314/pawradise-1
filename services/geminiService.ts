import { GoogleGenAI, Type } from "@google/genai";
import { PetProfile, MealPlanResponse, EventSuggestion, LifeStageResponse, NameSuggestion, BreedInfo, TranslatorResponse, TreatRecipeResponse, TrainingPlanResponse, TravelPlanResponse, VetPrepResponse, CompatibilityResponse, BudgetPlanResponse, SafetyCheckResponse, NameAnalysisResponse } from "../types";
import { MOCK_EVENTS, MOCK_PLACES } from "../constants";

// Helper to get API Key from either Vite environment or Node process
const getApiKey = () => {
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
    // @ts-ignore
    return import.meta.env.VITE_API_KEY;
  }
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
     // @ts-ignore
     return process.env.API_KEY;
  }
  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const generatePetAdvice = async (
  userPrompt: string,
  petProfile: PetProfile | null
): Promise<string> => {
  const modelId = 'gemini-2.5-flash';
  
  // Prepare context data from website mocks
  const eventsList = MOCK_EVENTS.map(e => `- ${e.title} (${e.type}) on ${e.date} at ${e.location}. Details: ${e.description}`).join('\n');
  const placesList = MOCK_PLACES.map(p => `- ${p.name} (${p.type}) in ${p.location}. Features: ${p.features.join(', ')}. Rating: ${p.rating} stars.`).join('\n');

  let systemInstruction = `You are "Ask Pawradise", the intelligent AI Concierge for PetzPawradise Malaysia.
  
  TONE: Warm, friendly, local (Malaysian context), and "paw-sitive". Use puns if appropriate.
  DISCLAIMER: You are NOT a veterinarian. Always end health/diet advice with: "Please note: This is not medical advice. Always consult your vet."

  WEBSITE DATA (Featured Highlights):
  These are specific events/places featured on our site. Mention them if they match the user's query perfectly.
  
  Events:
  ${eventsList}

  Places:
  ${placesList}
  
  CORE DIRECTIVE (CRITICAL):
  1. You are an OPEN-DOMAIN expert on the Malaysian Pet Lifestyle (KL, Selangor, and Nationwide).
  2. DO NOT limit your answers to the "Website Data" list above. That is just a small subset.
  3. IF THE USER ASKS for something not in the list (e.g., "Vets in Subang", "Dog swimming pools", "Hiking trails", "Groomers near me"), you MUST use your GENERAL KNOWLEDGE to provide real, specific recommendations.
  4. Provide names of real places, businesses, or locations.
  5. If searching for a general topic (e.g. "Dog food recipes"), use your general AI knowledge.

  User Context (The Pawrent's Pet):`;

  if (petProfile) {
    systemInstruction += `
    Name: ${petProfile.name}
    Type: ${petProfile.type}
    Breed: ${petProfile.breed}
    Age: ${petProfile.age} years
    Weight: ${petProfile.weight} kg
    Activity: ${petProfile.activityLevel}
    Notes: ${petProfile.healthNotes}
    
    Tailor answers to this specific pet.
    `;
  } else {
    systemInstruction += `\n(No specific pet profile active. Answer generally but encourage adding a profile for better tips.)`;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    return response.text || "I sniffed around but couldn't find an answer. Try asking again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My connection is a bit furry right now. Please try again later.";
  }
};

export const generateMealPlan = async (
  name: string,
  type: string,
  weight: number,
  age: number,
  activity: string,
  allergies: string
): Promise<MealPlanResponse | null> => {
  const prompt = `Create a detailed fresh food meal plan for a ${age} year old ${type} named ${name} weighing ${weight}kg with ${activity} activity level. Allergies/Notes: ${allergies || 'None'}.
  
  REQUIREMENTS:
  1. Calculate approximate daily calories.
  2. Provide EXACT grams per day for: Protein (Meat), Healthy Fats, and Carbs/Veg.
  3. List specific recommended ingredients for EACH category (e.g., "Chicken breast, Beef" for protein).
  4. Keep advice short and encouraging.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            calories: { type: Type.NUMBER },
            proteinGrams: { type: Type.NUMBER, description: "Grams of meat/protein source per day" },
            fatGrams: { type: Type.NUMBER, description: "Grams of fat source per day" },
            carbGrams: { type: Type.NUMBER, description: "Grams of vegetables/carbs per day" },
            proteinIngredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of recommended meats/proteins"
            },
            vegIngredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of recommended vegetables"
            },
            carbIngredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of recommended carbs/grains/supplements"
            },
            advice: { type: Type.STRING }
          },
          required: ["calories", "proteinGrams", "fatGrams", "carbGrams", "proteinIngredients", "vegIngredients", "carbIngredients", "advice"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    return JSON.parse(jsonText) as MealPlanResponse;
  } catch (error) {
    console.error("Meal Plan Error:", error);
    return null;
  }
};

export const findEventMatch = async (
    mood: string,
    vibe: string,
    petName: string
): Promise<EventSuggestion[]> => {
    const prompt = `Act as a Pet Lifestyle Concierge for KL & Selangor, Malaysia.
    My pet ${petName || 'Dog'} is ${mood} and looks for a ${vibe} experience.
    
    Recommend 3 DISTINCT specific places or events in KL/Selangor that match this mood.
    Use your general knowledge of real places (e.g. Desa ParkCity, specific cafes, hiking trails).
    
    Return exactly 3 suggestions in JSON format.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING, description: "Name of the place or event" },
                            location: { type: Type.STRING, description: "Area (e.g. TTDI, KL)" },
                            description: { type: Type.STRING, description: "Short description of what to do there" },
                            matchReason: { type: Type.STRING, description: "Why it fits the mood" }
                        },
                        required: ["title", "location", "description", "matchReason"]
                    }
                }
            }
        });
        
        const jsonText = response.text;
        if(!jsonText) return [];
        return JSON.parse(jsonText) as EventSuggestion[];
    } catch (error) {
        console.error("Event Matcher Error", error);
        return [];
    }
};

export const calculateLifeStage = async (age: number, type: string): Promise<LifeStageResponse | null> => {
    const prompt = `Calculate the human age equivalent for a ${age} year old ${type} and identify their life stage. Provide 3 brief, bulleted care tips.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        humanAge: { type: Type.NUMBER },
                        stageName: { type: Type.STRING },
                        description: { type: Type.STRING },
                        careTips: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["humanAge", "stageName", "description", "careTips"]
                }
            }
        });
        const jsonText = response.text;
        return jsonText ? JSON.parse(jsonText) as LifeStageResponse : null;
    } catch (error) {
        console.error("Life Stage Error", error);
        return null;
    }
};

export const generatePetNames = async (type: string, gender: string, theme: string): Promise<NameSuggestion[]> => {
    const prompt = `Generate 5 creative names for a ${gender} ${type} based on the theme: ${theme}. Include meaning/origin.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            meaning: { type: Type.STRING },
                            origin: { type: Type.STRING }
                        },
                        required: ["name", "meaning", "origin"]
                    }
                }
            }
        });
        const jsonText = response.text;
        return jsonText ? JSON.parse(jsonText) as NameSuggestion[] : [];
    } catch (error) {
        console.error("Name Gen Error", error);
        return [];
    }
};

export const getBreedInfo = async (breed: string, type: string): Promise<BreedInfo | null> => {
    const prompt = `Provide detailed information for the ${type} breed: ${breed}. Rate energy, grooming, friendliness, trainability from 1-10. Provide a fun fact.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        energy: { type: Type.NUMBER },
                        grooming: { type: Type.NUMBER },
                        friendliness: { type: Type.NUMBER },
                        trainability: { type: Type.NUMBER },
                        careTips: { type: Type.ARRAY, items: { type: Type.STRING } },
                        funFact: { type: Type.STRING }
                    },
                    required: ["name", "description", "energy", "grooming", "friendliness", "trainability", "careTips", "funFact"]
                }
            }
        });
        const jsonText = response.text;
        return jsonText ? JSON.parse(jsonText) as BreedInfo : null;
    } catch (error) {
        console.error("Breed Info Error", error);
        return null;
    }
};

export const translatePetLanguage = async (input: string, type: string): Promise<TranslatorResponse | null> => {
    const prompt = `Interpret what a ${type} might mean when they: "${input}". Be funny but informative. Give a translation, the mood, and how a human should respond.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        mood: { type: Type.STRING },
                        translation: { type: Type.STRING },
                        humanResponse: { type: Type.STRING }
                    },
                    required: ["mood", "translation", "humanResponse"]
                }
            }
        });
        return JSON.parse(response.text!) as TranslatorResponse;
    } catch (e) { return null; }
};

export const generateTreatRecipe = async (ingredients: string[], type: string): Promise<TreatRecipeResponse | null> => {
    const prompt = `Create a safe, simple DIY treat recipe for a ${type} using these ingredients (or subset): ${ingredients.join(', ')}. Ensure ingredients are pet-safe.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                        instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
                        nutritionNote: { type: Type.STRING }
                    },
                    required: ["title", "ingredients", "instructions", "nutritionNote"]
                }
            }
        });
        return JSON.parse(response.text!) as TreatRecipeResponse;
    } catch (e) { return null; }
};

export const generateTrainingPlan = async (trick: string, petName: string, type: string): Promise<TrainingPlanResponse | null> => {
    const prompt = `Create a step-by-step positive reinforcement training plan to teach a ${type} named ${petName} to: ${trick}.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        steps: { 
                            type: Type.ARRAY, 
                            items: { 
                                type: Type.OBJECT, 
                                properties: { step: { type: Type.NUMBER }, instruction: { type: Type.STRING } },
                                required: ["step", "instruction"]
                            } 
                        },
                        tips: { type: Type.ARRAY, items: { type: Type.STRING } },
                        difficulty: { type: Type.STRING }
                    },
                    required: ["title", "steps", "tips", "difficulty"]
                }
            }
        });
        return JSON.parse(response.text!) as TrainingPlanResponse;
    } catch (e) { return null; }
};

export const generateTravelPlan = async (destination: string, petType: string): Promise<TravelPlanResponse | null> => {
    const prompt = `Plan a pet-friendly trip to ${destination} for a ${petType}. List packing essentials, activity ideas, and travel tips.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        destination: { type: Type.STRING },
                        packingList: { type: Type.ARRAY, items: { type: Type.STRING } },
                        activities: { type: Type.ARRAY, items: { type: Type.STRING } },
                        tips: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["destination", "packingList", "activities", "tips"]
                }
            }
        });
        return JSON.parse(response.text!) as TravelPlanResponse;
    } catch (e) { return null; }
};

export const prepareVetVisit = async (symptoms: string, petType: string): Promise<VetPrepResponse | null> => {
    const prompt = `Act as a vet assistant. Prepare a checklist for a vet visit for a ${petType} with these symptoms: "${symptoms}". Include possible causes (speculative), specific questions to ask the vet, and a disclaimer.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        checklist: { type: Type.ARRAY, items: { type: Type.STRING } },
                        possibleCauses: { type: Type.ARRAY, items: { type: Type.STRING } },
                        questionsToAsk: { type: Type.ARRAY, items: { type: Type.STRING } },
                        disclaimer: { type: Type.STRING }
                    },
                    required: ["checklist", "possibleCauses", "questionsToAsk", "disclaimer"]
                }
            }
        });
        return JSON.parse(response.text!) as VetPrepResponse;
    } catch (e) { return null; }
};

export const checkPetCompatibility = async (pet1: string, pet2: string): Promise<CompatibilityResponse | null> => {
    const prompt = `Analyze the compatibility between a ${pet1} and a ${pet2}. Give a score (0-100), a verdict, tips for introduction, and any warnings.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER },
                        verdict: { type: Type.STRING },
                        tips: { type: Type.ARRAY, items: { type: Type.STRING } },
                        warning: { type: Type.STRING }
                    },
                    required: ["score", "verdict", "tips"]
                }
            }
        });
        return JSON.parse(response.text!) as CompatibilityResponse;
    } catch (e) { return null; }
};

export const generateBudgetPlan = async (budget: number, type: string, lifestyle: string, age: number, weight: number): Promise<BudgetPlanResponse | null> => {
    const prompt = `Create a monthly budget breakdown for a ${lifestyle} lifestyle ${type} owner in Malaysia with a budget of RM ${budget}. The pet is ${age} years old and weighs ${weight}kg. 
    Provide estimated costs for food, medical, grooming, etc. Give saving tips and a verdict.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        breakdown: { 
                            type: Type.ARRAY, 
                            items: { 
                                type: Type.OBJECT,
                                properties: { category: { type: Type.STRING }, estimatedCost: { type: Type.NUMBER }, tip: { type: Type.STRING } },
                                required: ["category", "estimatedCost", "tip"]
                            } 
                        },
                        totalEstimated: { type: Type.NUMBER },
                        savingTips: { type: Type.ARRAY, items: { type: Type.STRING } },
                        verdict: { type: Type.STRING }
                    },
                    required: ["breakdown", "totalEstimated", "savingTips", "verdict"]
                }
            }
        });
        return JSON.parse(response.text!) as BudgetPlanResponse;
    } catch (e) { return null; }
};

export const checkSafety = async (item: string, type: string): Promise<SafetyCheckResponse | null> => {
    const prompt = `Is "${item}" safe for a ${type} to eat or be around? Analyze toxicity.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isSafe: { type: Type.BOOLEAN },
                        riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                        explanation: { type: Type.STRING },
                        actionSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["isSafe", "riskLevel", "explanation", "actionSteps"]
                }
            }
        });
        return JSON.parse(response.text!) as SafetyCheckResponse;
    } catch (e) { return null; }
};

export const analyzeNameVibe = async (name: string): Promise<NameAnalysisResponse | null> => {
    const prompt = `Analyze the "vibe" of the pet name "${name}". Give a fun numerology reading, personality traits associated with the name, and a fun prediction.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        vibe: { type: Type.STRING },
                        numerologyNumber: { type: Type.NUMBER },
                        personalityTraits: { type: Type.ARRAY, items: { type: Type.STRING } },
                        funPrediction: { type: Type.STRING }
                    },
                    required: ["vibe", "numerologyNumber", "personalityTraits", "funPrediction"]
                }
            }
        });
        return JSON.parse(response.text!) as NameAnalysisResponse;
    } catch (e) { return null; }
};