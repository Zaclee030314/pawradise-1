
export enum PetType {
  DOG = 'Dog',
  CAT = 'Cat',
  OTHER = 'Other'
}

export enum ActivityLevel {
  LOW = 'Low (Couch Potato)',
  NORMAL = 'Normal (Daily Walks)',
  HIGH = 'High (Zoomies all day)'
}

export interface OwnerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string; // e.g. Mom, Dad, Sibling, Pawrent
  image?: string; // Base64 string
}

export interface PetProfile {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number; // years
  weight: number; // kg
  activityLevel: ActivityLevel;
  healthNotes: string;
  image?: string; // Base64 string
}

export interface UserProfile {
  owners: OwnerProfile[];
  pets: PetProfile[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Bazaar' | 'Pawty' | 'Adoption' | 'Workshop' | 'Gathering';
  organizer: 'PetzPawradise' | 'Other'; // To split the sections
  description: string;
  image: string;
  // Detailed fields for Modal
  fullDescription?: string;
  time?: string;
  price?: string;
  highlights?: string[];
  videoUrl?: string;
}

export interface Place {
  id: string;
  name: string;
  type: 'Cafe' | 'Park' | 'Mall' | 'Hotel';
  location: string;
  rating: number;
  features: string[]; // e.g., "Indoor", "Outdoor", "Big Dog Friendly"
  image: string;
  coordinates: { x: number; y: number }; // % position on the map
  description?: string;
  address?: string;
  openingHours?: string;
  contact?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content: string; // HTML-like string or markdown
  image: string;
  tags: string[];
  likes: number;
}

export interface ProductVariant {
  size: string; // e.g., "50g", "100g", "1pc"
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'Treats' | 'Chews' | 'Supplements' | 'Bundle';
  description: string;
  benefits: string[]; // e.g., "Dental Health", "Joint Support"
  image: string;
  variants: ProductVariant[];
  tags: string[]; // e.g., "Dehydrated", "Single Ingredient"
}

export interface Partner {
  id: string;
  name: string;
  logo: string; // URL or placeholder
  type: 'Brand' | 'Venue' | 'Organizer';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface MealPlanResponse {
  calories: number;
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
  proteinIngredients: string[];
  vegIngredients: string[];
  carbIngredients: string[];
  advice: string;
}

export interface EventSuggestion {
  title: string;
  location: string;
  description: string;
  matchReason: string;
  
}

export interface LifeStageResponse {
  humanAge: number;
  stageName: string; // e.g., "Teenager", "Senior Citizen"
  description: string;
  careTips: string[];
}

export interface NameSuggestion {
  name: string;
  meaning: string;
  origin: string;
}

export interface BreedInfo {
  name: string;
  description: string;
  energy: number; // 1-10
  grooming: number; // 1-10
  friendliness: number; // 1-10
  trainability: number; // 1-10
  careTips: string[];
  funFact: string;
}

export interface TranslatorResponse {
  mood: string;
  translation: string;
  humanResponse: string;
}

export interface TreatRecipeResponse {
  title: string;
  ingredients: string[];
  instructions: string[];
  nutritionNote: string;
}

export interface TrainingPlanResponse {
  title: string;
  steps: { step: number; instruction: string }[];
  tips: string[];
  difficulty: string;
}

export interface TravelPlanResponse {
  destination: string;
  packingList: string[];
  activities: string[];
  tips: string[];
}

export interface VetPrepResponse {
  checklist: string[];
  possibleCauses: string[];
  questionsToAsk: string[];
  disclaimer: string;
}

export interface CompatibilityResponse {
  score: number; // 1-100
  verdict: string;
  tips: string[];
  warning: string;
}

export interface BudgetPlanResponse {
  breakdown: { category: string; estimatedCost: number; tip: string }[];
  totalEstimated: number;
  savingTips: string[];
  verdict: string; // e.g., "Thrifty Pawrent", "Luxury Living"
}

export interface SafetyCheckResponse {
  isSafe: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
  explanation: string;
  actionSteps: string[];
}

export interface NameAnalysisResponse {
  vibe: string;
  numerologyNumber: number;
  personalityTraits: string[];
  funPrediction: string;
}
