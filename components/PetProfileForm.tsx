
import React, { useState, useRef } from 'react';
import { PetProfile, PetType, ActivityLevel, UserProfile, OwnerProfile } from '../types';
import Button from './Button';
import { Dog, Cat, User, Phone, Mail, Plus, ChevronRight, Check, Camera, Trash2, Users, Heart, ArrowLeft, X } from 'lucide-react';

interface Props {
  onSave: (userProfile: UserProfile) => void;
  initialProfile: UserProfile | null;
  onCancel: () => void;
}

const PetProfileForm: React.FC<Props> = ({ onSave, initialProfile, onCancel }) => {
  const [step, setStep] = useState<'intro' | 'owners' | 'pets'>('owners');
  
  // --- OWNERS STATE ---
  const [owners, setOwners] = useState<OwnerProfile[]>(initialProfile?.owners || []);
  const [currentOwner, setCurrentOwner] = useState<OwnerProfile>({
    id: '',
    name: '',
    phone: '',
    email: '',
    role: 'Pawrent',
    image: ''
  });
  
  // --- PETS STATE ---
  const [pets, setPets] = useState<PetProfile[]>(initialProfile?.pets || []);
  const [currentPet, setCurrentPet] = useState<PetProfile>({
    id: '',
    name: '',
    type: PetType.DOG,
    breed: '',
    age: 1,
    weight: 5,
    activityLevel: ActivityLevel.NORMAL,
    healthNotes: '',
    image: ''
  });

  const ownerImageInputRef = useRef<HTMLInputElement>(null);
  const petImageInputRef = useRef<HTMLInputElement>(null);

  // --- HELPERS ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'owner' | 'pet') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === 'owner') {
          setCurrentOwner(prev => ({ ...prev, image: base64 }));
        } else {
          setCurrentPet(prev => ({ ...prev, image: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- OWNER HANDLERS ---
  const handleAddOwner = () => {
    if (!currentOwner.name) return;
    setOwners([...owners, { ...currentOwner, id: Date.now().toString() }]);
    setCurrentOwner({ id: '', name: '', phone: '', email: '', role: 'Pawrent', image: '' });
  };

  const removeOwner = (id: string) => {
    setOwners(owners.filter(o => o.id !== id));
  };

  // --- PET HANDLERS ---
  const handlePetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentPet(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' ? Number(value) : value
    }));
  };

  const handleAddPet = () => {
    if (!currentPet.name) return;
    setPets([...pets, { ...currentPet, id: Date.now().toString() }]);
    setCurrentPet({
      id: '',
      name: '',
      type: PetType.DOG,
      breed: '',
      age: 1,
      weight: 5,
      activityLevel: ActivityLevel.NORMAL,
      healthNotes: '',
      image: ''
    });
  };

  const removePet = (id: string) => {
    setPets(pets.filter(p => p.id !== id));
  };

  // --- FINAL SUBMIT ---
  const handleFinalize = () => {
    // Check if there is data in the current form that hasn't been added to the list
    let finalOwners = [...owners];
    if (currentOwner.name) {
        finalOwners.push({ ...currentOwner, id: Date.now().toString() });
    }

    let finalPets = [...pets];
    if (currentPet.name) {
        finalPets.push({ ...currentPet, id: Date.now().toString() });
    }

    if (finalOwners.length === 0) {
        alert("Please tell us who the Pawrent is!");
        setStep('owners');
        return;
    }
    if (finalPets.length === 0) {
        alert("Don't forget to add your Furkid!");
        return;
    }

    onSave({ owners: finalOwners, pets: finalPets });
  };

  // RENDER
  return (
    <div className="bg-white p-0 rounded-[3rem] shadow-2xl max-w-4xl mx-auto w-full relative overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Visual Progress / Welcome */}
        <div className={`md:w-1/3 bg-gradient-to-br ${step === 'owners' ? 'from-brand-orange to-orange-600' : 'from-brand-yellow to-yellow-500'} p-8 text-white flex flex-col justify-between transition-all duration-700 relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="relative z-10">
                <h3 className="text-3xl font-black mb-2 drop-shadow-md">
                    {step === 'owners' ? 'Who\'s the Pawrent?' : 'Who\'s the Furkid?'}
                </h3>
                <p className="text-white/80 font-medium leading-relaxed">
                    {step === 'owners' 
                        ? "Let's get to know the humans behind the pets. You can add partners or family members too!" 
                        : "Now for the stars of the show! Tell us all about your adorable companions."}
                </p>
            </div>

            <div className="relative z-10 space-y-4">
                <div className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${step === 'owners' ? 'bg-white/20 backdrop-blur-md' : 'opacity-50'}`}>
                    <div className="bg-white text-brand-orange p-2 rounded-full shadow-sm"><Users size={16}/></div>
                    <span className="font-bold">The Humans</span>
                    {step === 'pets' && <Check size={16} className="ml-auto"/>}
                </div>
                <div className={`w-0.5 h-6 bg-white/30 ml-6`}></div>
                <div className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${step === 'pets' ? 'bg-white/20 backdrop-blur-md' : 'opacity-50'}`}>
                    <div className="bg-white text-brand-yellow p-2 rounded-full shadow-sm"><Heart size={16}/></div>
                    <span className="font-bold">The Furkids</span>
                </div>
            </div>

            <div className="relative z-10 mt-8 text-xs font-medium text-white/60">
                Step {step === 'owners' ? '1' : '2'} of 2
            </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="md:w-2/3 p-8 md:p-12 bg-white relative overflow-y-auto h-[600px] md:h-auto">
            <button onClick={onCancel} className="absolute top-6 right-6 text-gray-300 hover:text-gray-600 transition">
                <X size={24}/>
            </button>

            {/* STEP 1: OWNERS */}
            {step === 'owners' && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                    {/* Added List */}
                    {owners.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-8">
                            {owners.map((owner) => (
                                <div key={owner.id} className="flex items-center gap-3 bg-orange-50 pr-3 pl-2 py-2 rounded-full border border-orange-100">
                                     <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                         {owner.image ? <img src={owner.image} className="w-full h-full object-cover"/> : <User className="w-full h-full p-1.5 text-gray-400"/>}
                                     </div>
                                     <div className="flex flex-col leading-none">
                                         <span className="font-bold text-sm text-brand-brown">{owner.name}</span>
                                         <span className="text-[10px] text-brand-orange font-bold uppercase">{owner.role}</span>
                                     </div>
                                     <button onClick={() => removeOwner(owner.id)} className="ml-2 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                                </div>
                            ))}
                        </div>
                    )}

                    <h4 className="font-black text-brand-brown text-xl mb-6 flex items-center gap-2">
                        {owners.length === 0 ? 'Primary Profile' : 'Add Another Human'}
                    </h4>

                    <div className="flex gap-6 mb-8">
                         {/* Image */}
                         <div className="flex-shrink-0">
                            <div 
                                onClick={() => ownerImageInputRef.current?.click()}
                                className="w-24 h-24 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-300 hover:border-brand-orange cursor-pointer flex items-center justify-center overflow-hidden relative group transition hover:shadow-md"
                            >
                                {currentOwner.image ? (
                                    <img src={currentOwner.image} className="w-full h-full object-cover"/>
                                ) : (
                                    <div className="text-center text-gray-400 group-hover:text-brand-orange transition">
                                        <Camera size={24} className="mx-auto mb-1"/>
                                        <span className="text-[10px] font-bold uppercase">Photo</span>
                                    </div>
                                )}
                            </div>
                            <input type="file" ref={ownerImageInputRef} onChange={(e) => handleImageUpload(e, 'owner')} className="hidden" accept="image/*"/>
                        </div>

                        {/* Inputs */}
                        <div className="flex-1 space-y-4">
                             <div className="grid grid-cols-2 gap-4">
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Name</label>
                                     <input 
                                        value={currentOwner.name} 
                                        onChange={(e) => setCurrentOwner({...currentOwner, name: e.target.value})}
                                        className="w-full p-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-orange-100 transition outline-none font-bold text-brand-brown"
                                        placeholder="Your Name"
                                     />
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Role</label>
                                     <select 
                                        value={currentOwner.role}
                                        onChange={(e) => setCurrentOwner({...currentOwner, role: e.target.value})}
                                        className="w-full p-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-orange-100 transition outline-none font-bold text-brand-brown"
                                     >
                                        <option>Pawrent</option>
                                        <option>Mom</option>
                                        <option>Dad</option>
                                        <option>Sibling</option>
                                        <option>Grandpawrent</option>
                                     </select>
                                 </div>
                             </div>
                             <div>
                                 <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Contact (Optional)</label>
                                 <div className="grid grid-cols-2 gap-4">
                                     <input 
                                        value={currentOwner.phone} 
                                        onChange={(e) => setCurrentOwner({...currentOwner, phone: e.target.value})}
                                        className="w-full p-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-orange-100 transition outline-none text-sm font-medium"
                                        placeholder="Phone Number"
                                     />
                                     <input 
                                        value={currentOwner.email} 
                                        onChange={(e) => setCurrentOwner({...currentOwner, email: e.target.value})}
                                        className="w-full p-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-orange-100 transition outline-none text-sm font-medium"
                                        placeholder="Email Address"
                                     />
                                 </div>
                             </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
                        {currentOwner.name && (
                            <button onClick={handleAddOwner} className="text-sm font-bold text-brand-orange hover:bg-orange-50 px-4 py-2 rounded-lg transition flex items-center gap-2">
                                <Plus size={16}/> Save & Add Another Person
                            </button>
                        )}
                        <Button 
                            onClick={() => {
                                if (owners.length === 0 && !currentOwner.name) {
                                    alert("Please add at least one name!");
                                    return;
                                }
                                if(currentOwner.name) handleAddOwner();
                                setStep('pets');
                            }} 
                            className="ml-auto px-8 py-3 text-lg shadow-xl shadow-orange-200"
                        >
                            Next Step <ChevronRight size={20} className="ml-2"/>
                        </Button>
                    </div>
                </div>
            )}

            {/* STEP 2: PETS */}
            {step === 'pets' && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                     {/* Added List */}
                     {pets.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-8">
                            {pets.map((pet) => (
                                <div key={pet.id} className="flex items-center gap-3 bg-yellow-50 pr-3 pl-2 py-2 rounded-full border border-yellow-100">
                                     <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                         {pet.image ? <img src={pet.image} className="w-full h-full object-cover"/> : (pet.type === PetType.DOG ? <Dog className="w-full h-full p-1.5 text-gray-400"/> : <Cat className="w-full h-full p-1.5 text-gray-400"/>)}
                                     </div>
                                     <span className="font-bold text-sm text-brand-brown">{pet.name}</span>
                                     <button onClick={() => removePet(pet.id)} className="ml-2 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                                </div>
                            ))}
                        </div>
                    )}

                    <h4 className="font-black text-brand-brown text-xl mb-6 flex items-center gap-2">
                        {pets.length === 0 ? 'First Furkid Details' : 'Add Another Furkid'}
                    </h4>

                    <div className="flex gap-6 mb-8">
                        {/* Pet Image */}
                         <div className="flex-shrink-0">
                            <div 
                                onClick={() => petImageInputRef.current?.click()}
                                className="w-28 h-28 rounded-[1.5rem] bg-gray-50 border-2 border-dashed border-gray-300 hover:border-brand-yellow cursor-pointer flex items-center justify-center overflow-hidden relative group transition hover:shadow-md"
                            >
                                {currentPet.image ? (
                                    <img src={currentPet.image} className="w-full h-full object-cover"/>
                                ) : (
                                    <div className="text-center text-gray-400 group-hover:text-brand-yellow transition">
                                        <Camera size={28} className="mx-auto mb-1"/>
                                        <span className="text-[10px] font-bold uppercase">Add Pic</span>
                                    </div>
                                )}
                            </div>
                            <input type="file" ref={petImageInputRef} onChange={(e) => handleImageUpload(e, 'pet')} className="hidden" accept="image/*"/>
                         </div>

                         {/* Pet Inputs */}
                         <div className="flex-1 space-y-4">
                             <div className="grid grid-cols-2 gap-4">
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Name</label>
                                     <input name="name" value={currentPet.name} onChange={handlePetChange} className="w-full p-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-yellow focus:ring-4 focus:ring-yellow-100 transition outline-none font-bold text-brand-brown" placeholder="Pet Name"/>
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Type</label>
                                     <div className="flex bg-gray-100 rounded-xl p-1">
                                         {[PetType.DOG, PetType.CAT, PetType.OTHER].map(t => (
                                             <button 
                                                key={t}
                                                onClick={() => setCurrentPet({...currentPet, type: t})}
                                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${currentPet.type === t ? 'bg-white shadow-sm text-brand-brown' : 'text-gray-400'}`}
                                             >
                                                 {t}
                                             </button>
                                         ))}
                                     </div>
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 gap-3">
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Breed</label>
                                     <input name="breed" value={currentPet.breed} onChange={handlePetChange} className="w-full p-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-yellow outline-none text-sm font-medium"/>
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Age (yr)</label>
                                     <input type="number" name="age" value={currentPet.age} onChange={handlePetChange} className="w-full p-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-yellow outline-none text-sm font-medium"/>
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Kg</label>
                                     <input type="number" name="weight" value={currentPet.weight} onChange={handlePetChange} className="w-full p-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-yellow outline-none text-sm font-medium"/>
                                 </div>
                             </div>

                             <div>
                                 <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">Activity</label>
                                 <select name="activityLevel" value={currentPet.activityLevel} onChange={handlePetChange} className="w-full p-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-brand-yellow outline-none text-sm text-gray-600 font-medium">
                                     {Object.values(ActivityLevel).map(l => <option key={l} value={l}>{l}</option>)}
                                 </select>
                             </div>
                         </div>
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
                        <button onClick={() => setStep('owners')} className="text-gray-400 font-bold hover:text-brand-dark flex items-center gap-2">
                            <ArrowLeft size={16}/> Back
                        </button>
                        
                        <div className="flex items-center gap-4">
                            {currentPet.name && (
                                <button onClick={handleAddPet} className="text-sm font-bold text-brand-yellow hover:bg-yellow-50 px-4 py-2 rounded-lg transition flex items-center gap-2">
                                    <Plus size={16}/> Save & Add Another
                                </button>
                            )}
                            <Button onClick={handleFinalize} className="px-8 py-3 text-lg bg-brand-yellow border-yellow-600 hover:bg-yellow-500 text-brand-brown shadow-xl shadow-yellow-100">
                                Complete Profile <Check size={20} className="ml-2"/>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default PetProfileForm;
