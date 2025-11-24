
import React from 'react';
import { UserProfile, PetType } from '../types';
import { User, Phone, Mail, Dog, Cat, Activity, HeartPulse, Edit, Heart, Users, Sparkles, Crown, Camera, Star } from 'lucide-react';
import Button from './Button';

interface Props {
  userProfile: UserProfile;
  onEdit: () => void;
}

const UserProfileView: React.FC<Props> = ({ userProfile, onEdit }) => {
  const totalPets = userProfile.pets.length;
  const totalHumans = userProfile.owners.length;
  
  // Get a random "Family Vibe" tag
  const vibes = ["The Adventure Squad", "Cuddle Champions", "Chaos Coordinators", "Treat Connoisseurs"];
  const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
        {/* Header Section */}
        <div className="relative bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-brand-cream overflow-hidden mb-16 group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-bl-full -z-0 transition-transform duration-700 group-hover:scale-110"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-orange/10 rounded-tr-full -z-0 transition-transform duration-700 group-hover:scale-110"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                 <div>
                    <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1 rounded-full font-bold uppercase tracking-widest text-xs mb-4 border border-brand-orange/20">
                        <Sparkles size={14} className="animate-pulse"/> {randomVibe}
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-brand-brown mb-2 tracking-tight">My Furmily</h2>
                    <p className="text-xl text-gray-500 font-medium">
                        <span className="text-brand-orange font-bold">{totalHumans}</span> Pawrents & <span className="text-brand-yellow font-bold">{totalPets}</span> Furkids
                    </p>
                 </div>
                 
                 <div className="flex gap-4">
                     <div className="bg-brand-cream p-4 rounded-2xl text-center min-w-[100px] border border-brand-yellow/30 shadow-sm hover:shadow-md transition hover:-translate-y-1">
                         <span className="block text-3xl font-black text-brand-brown">{totalPets}</span>
                         <span className="text-xs font-bold text-gray-400 uppercase">Pets</span>
                     </div>
                     <div className="bg-brand-cream p-4 rounded-2xl text-center min-w-[100px] border border-brand-yellow/30 shadow-sm hover:shadow-md transition hover:-translate-y-1">
                         <span className="block text-3xl font-black text-brand-brown">{new Date().getFullYear()}</span>
                         <span className="text-xs font-bold text-gray-400 uppercase">Est.</span>
                     </div>
                 </div>

                 <Button onClick={onEdit} variant="outline" className="flex items-center gap-2 shadow-lg bg-white hover:bg-brand-cream border-2">
                    <Edit size={18}/> Edit Profile
                 </Button>
             </div>
        </div>

        {/* HUMANS SECTION - Creative Cards */}
        <div className="mb-16 relative">
            <h3 className="text-3xl font-black text-brand-brown mb-8 flex items-center gap-3 ml-4">
                <span className="bg-blue-100 p-2 rounded-xl text-blue-600"><Crown size={24} fill="currentColor" className="fill-blue-600"/></span>
                The Humans
            </h3>
            
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {userProfile.owners.map((owner) => (
                    <div key={owner.id} className="relative group w-full md:w-80">
                        {/* Card Backing Effect */}
                        <div className="absolute inset-0 bg-brand-orange rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition duration-300 opacity-20 group-hover:opacity-100"></div>
                        
                        <div className="relative bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 transition duration-300 hover:-translate-y-2 h-full flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-brand-yellow to-brand-orange mb-4 shadow-lg relative">
                                <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white">
                                    {owner.image ? (
                                        <img src={owner.image} className="w-full h-full object-cover"/>
                                    ) : (
                                        <User className="w-full h-full p-6 text-gray-300"/>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-100">
                                    <span className="text-lg">👑</span>
                                </div>
                            </div>
                            
                            <h4 className="text-2xl font-black text-brand-brown mb-1">{owner.name}</h4>
                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                                {owner.role}
                            </span>
                            
                            <div className="mt-auto w-full space-y-2 bg-gray-50 p-4 rounded-2xl">
                                {owner.email && (
                                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500">
                                        <Mail size={14}/> <span className="truncate max-w-[150px]">{owner.email}</span>
                                    </div>
                                )}
                                {owner.phone && (
                                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500">
                                        <Phone size={14}/> {owner.phone}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Add Human Button */}
                <button onClick={onEdit} className="w-full md:w-48 h-auto min-h-[200px] rounded-[2.5rem] border-3 border-dashed border-gray-300 hover:border-brand-orange flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-brand-orange hover:bg-orange-50/50 transition-all group bg-white/50">
                    <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition"><Users size={24}/></div>
                    <span className="font-bold text-sm">Add Human</span>
                </button>
            </div>
        </div>

        {/* PETS SECTION - Interactive Cards */}
        <div>
            <h3 className="text-3xl font-black text-brand-brown mb-8 flex items-center gap-3 ml-4">
                <span className="bg-pink-100 p-2 rounded-xl text-pink-500"><Heart size={24} fill="currentColor" className="fill-pink-500"/></span>
                The Fur-Babies
            </h3>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                {userProfile.pets.map((pet, index) => (
                    <div key={pet.id} className="group relative bg-white rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                         {/* Tape Effect */}
                         <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-200/80 rotate-[-2deg] shadow-sm z-20 backdrop-blur-sm border border-white/20"></div>

                         {/* Image Area */}
                         <div className="h-64 w-full relative overflow-hidden rounded-t-[3rem]">
                             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 opacity-60 group-hover:opacity-80 transition"></div>
                             {pet.image ? (
                                 <img src={pet.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-110"/>
                             ) : (
                                 <div className="w-full h-full bg-brand-cream flex items-center justify-center">
                                    {pet.type === PetType.DOG ? <Dog size={80} className="text-brand-brown/20"/> : <Cat size={80} className="text-brand-brown/20"/>}
                                 </div>
                             )}
                             
                             <div className="absolute bottom-6 left-6 z-20 text-white">
                                 <h4 className="text-4xl font-black mb-1 drop-shadow-lg">{pet.name}</h4>
                                 <p className="font-medium text-white/90 text-lg flex items-center gap-2">
                                     {pet.type === PetType.DOG ? <Dog size={18}/> : <Cat size={18}/>} {pet.breed}
                                 </p>
                             </div>
                             
                             <div className="absolute top-6 right-6 z-20 bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-full text-white shadow-lg">
                                 <Star fill="white" size={20}/>
                             </div>
                         </div>

                         {/* Content */}
                         <div className="p-8">
                             <div className="flex justify-around text-center mb-8">
                                 <div className="group/stat">
                                     <span className="block text-xs font-bold text-gray-400 uppercase mb-1 group-hover/stat:text-brand-orange transition">Age</span>
                                     <span className="text-2xl font-black text-brand-brown">{pet.age}<span className="text-sm text-gray-400">y</span></span>
                                 </div>
                                 <div className="w-px bg-gray-100"></div>
                                 <div className="group/stat">
                                     <span className="block text-xs font-bold text-gray-400 uppercase mb-1 group-hover/stat:text-brand-orange transition">Weight</span>
                                     <span className="text-2xl font-black text-brand-brown">{pet.weight}<span className="text-sm text-gray-400">kg</span></span>
                                 </div>
                                 <div className="w-px bg-gray-100"></div>
                                 <div className="group/stat">
                                     <span className="block text-xs font-bold text-gray-400 uppercase mb-1 group-hover/stat:text-brand-orange transition">Activity</span>
                                     <div className={`inline-block p-1 rounded-full ${pet.activityLevel.includes('High') ? 'bg-red-100 text-red-500' : pet.activityLevel.includes('Low') ? 'bg-blue-100 text-blue-500' : 'bg-green-100 text-green-500'}`}>
                                        <Activity size={18}/>
                                     </div>
                                 </div>
                             </div>

                             <div className="bg-brand-cream/50 p-5 rounded-2xl border border-brand-yellow/20 relative">
                                 <div className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold text-brand-orange uppercase tracking-wider border border-brand-orange/20 rounded-md">
                                     Health Note
                                 </div>
                                 <div className="flex gap-3">
                                     <HeartPulse size={20} className="text-red-400 flex-shrink-0 mt-1"/>
                                     <p className="text-sm text-gray-600 font-medium leading-relaxed italic">
                                         "{pet.healthNotes || "Healthy and happy!"}"
                                     </p>
                                 </div>
                             </div>
                         </div>
                    </div>
                ))}

                {/* Add Pet Card - Creative */}
                <button onClick={onEdit} className="rounded-[3rem] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[400px] hover:bg-gray-50 hover:border-brand-yellow transition-all group relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-yellow/5 scale-0 group-hover:scale-100 rounded-[3rem] transition-transform duration-500 origin-center"></div>
                    <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition relative z-10 border-4 border-brand-cream">
                        <Camera size={32} className="text-gray-300 group-hover:text-brand-yellow transition"/>
                    </div>
                    <h4 className="text-2xl font-black text-brand-brown relative z-10">Add New Furkid</h4>
                    <p className="text-sm text-gray-400 font-bold relative z-10 mt-1">Expand the family album</p>
                </button>
            </div>
        </div>
    </div>
  );
};

export default UserProfileView;
