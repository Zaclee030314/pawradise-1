
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, Event, Place, BlogPost, Product } from './types';
import { MOCK_EVENTS, MOCK_PLACES, MOCK_BLOGS, MOCK_PRODUCTS, MOCK_PARTNERS } from './constants';
import Button from './components/Button';
import PetProfileForm from './components/PetProfileForm';
import UserProfileView from './components/UserProfileView';
import AiAssistant from './components/AiAssistant';
import MealPlannerTool from './components/MealPlannerTool';
import EventMatcherTool from './components/EventMatcherTool';
import LifeStageCalculatorTool from './components/LifeStageCalculatorTool';
import NameGeneratorTool from './components/NameGeneratorTool';
import BreedGuideTool from './components/BreedGuideTool';
import TranslatorTool from './components/TranslatorTool';
import TreatChefTool from './components/TreatChefTool';
import TrainingCoachTool from './components/TrainingCoachTool';
import TravelPlannerTool from './components/TravelPlannerTool';
import VetPrepTool from './components/VetPrepTool';
import CompatibilityTool from './components/CompatibilityTool';
import BudgetPlannerTool from './components/BudgetPlannerTool';
import SafetyCheckerTool from './components/SafetyCheckerTool';
import NameAnalyzerTool from './components/NameAnalyzerTool';
import ShopView from './components/ShopView';
import { 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Star,
  PawPrint,
  Instagram,
  Facebook,
  Utensils,
  Calculator,
  Bot,
  Heart,
  ArrowRight,
  Sparkles,
  Dna,
  Filter,
  MessageCircle,
  ChefHat,
  Trophy,
  Map,
  Stethoscope,
  HeartHandshake,
  Sun,
  ChevronDown,
  User,
  Users,
  Dog,
  Cat,
  Wallet,
  ShieldAlert,
  Zap,
  ThumbsUp,
  PenTool,
  CheckCircle,
  Info,
  Plus,
  Clock,
  Phone,
  Mail,
  Video,
  Image as ImageIcon,
  Upload,
  Send,
  Headset
} from 'lucide-react';

type View = 'home' | 'events' | 'places' | 'blog' | 'shop' | 'vendor' | 'tools' | 'search' | 'profile' | 'contact';
type ModalToolType = 'search' | 'ask-ai' | 'meal' | 'event' | 'lifestage' | 'name' | 'breed' | 'translator' | 'treat' | 'training' | 'travel' | 'vet' | 'compatibility' | 'budget' | 'safety' | 'name-analyzer' | null;

// Scroll Reveal Component
const RevealOnScroll: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'} ${className}`}>
            {children}
        </div>
    );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  
  // User Profile State (Owners + Pets)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activePetId, setActivePetId] = useState<string | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  
  // New State for managing which tool is active in the modal
  const [activeModalTool, setActiveModalTool] = useState<ModalToolType>(null);
  
  const [aiInitialQuery, setAiInitialQuery] = useState<string>(''); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Header Dropdown State
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  
  // Tools Section State (Homepage)
  const [activeHomeTool, setActiveHomeTool] = useState<'ask-ai' | 'meal' | 'event' | 'lifestage' | 'name' | 'breed'>('ask-ai');
  
  // Places Filters & Submission
  const [placeTypeFilter, setPlaceTypeFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [newPlace, setNewPlace] = useState({
      name: '',
      type: 'Cafe',
      location: '',
      address: '',
      description: '',
      image: null as string | null
  });

  // Event Selection & Submission
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
      title: '',
      date: '',
      location: '',
      description: '',
      videoUrl: '',
      image: null as string | null
  });

  // Blog State
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
  const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [blogFilter, setBlogFilter] = useState<string>('All');
  const [newBlog, setNewBlog] = useState({ 
      title: '', 
      excerpt: '', 
      content: '', 
      category: 'Community',
      image: null as string | null
  });

  const activePet = userProfile?.pets.find(p => p.id === activePetId) || null;

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    if (profile.pets.length > 0 && !activePetId) {
        setActivePetId(profile.pets[0].id);
    }
    setShowProfileForm(false);
    // Redirect to the profile view so they see the changes immediately
    setCurrentView('profile');
  };

  const handleAiSearch = () => {
    if (searchQuery.trim()) {
        setAiInitialQuery(searchQuery);
        setActiveModalTool('search');
    }
  };

  const openToolModal = (tool: ModalToolType) => {
      setAiInitialQuery(''); // Reset any search query
      setActiveModalTool(tool);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'blog' | 'event' | 'place') => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64 = reader.result as string;
              if (type === 'blog') {
                  setNewBlog(prev => ({ ...prev, image: base64 }));
              } else if (type === 'event') {
                  setNewEvent(prev => ({ ...prev, image: base64 }));
              } else if (type === 'place') {
                  setNewPlace(prev => ({ ...prev, image: base64 }));
              }
          };
          reader.readAsDataURL(file);
      }
  };

  const handlePublishBlog = () => {
    if (!newBlog.title || !newBlog.content) return;
    const blog: BlogPost = {
      id: Date.now().toString(),
      title: newBlog.title,
      author: userProfile?.owners[0]?.name || 'Guest Pawrent',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: newBlog.category,
      excerpt: newBlog.excerpt || newBlog.content.substring(0, 100) + '...',
      content: `<p>${newBlog.content}</p>`,
      image: newBlog.image || 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80', 
      tags: ['Community', 'Story'],
      likes: 0
    };
    setBlogs([blog, ...blogs]);
    setShowPublishModal(false);
    setNewBlog({ title: '', excerpt: '', content: '', category: 'Community', image: null });
  };

  const handleSubmitEvent = () => {
      // Simulate backend submission
      alert("Event submitted for review! Thank you for contributing.");
      setShowEventForm(false);
      setNewEvent({ title: '', date: '', location: '', description: '', videoUrl: '', image: null });
  }

  const handleSubmitPlace = () => {
      alert("Thank you! Your suggestion has been submitted for review.");
      setShowPlaceForm(false);
      setNewPlace({ name: '', type: 'Cafe', location: '', address: '', description: '', image: null });
  }

  const handleLikeBlog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBlogs(blogs.map(b => b.id === id ? { ...b, likes: b.likes + 1 } : b));
  };

  const NavLink = ({ view, label }: { view: View; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setMobileMenuOpen(false);
      }}
      className={`font-bold text-lg px-4 py-2 rounded-full transition-all duration-300 ${
        currentView === view 
            ? 'bg-brand-orange text-white shadow-lg shadow-orange-200' 
            : 'text-brand-dark hover:bg-orange-50 hover:text-brand-orange'
      }`}
    >
      {label}
    </button>
  );

  // Homepage Embedded Tool Renderer
  const renderHomeToolContent = () => {
    switch (activeHomeTool) {
      case 'meal':
        return <MealPlannerTool petProfile={activePet} />;
      case 'event':
        return <EventMatcherTool petProfile={activePet} />;
      case 'lifestage':
        return <LifeStageCalculatorTool petProfile={activePet} />;
      case 'name':
        return <NameGeneratorTool />;
      case 'breed':
        return <BreedGuideTool />;
      case 'ask-ai':
      default:
        return (
          <AiAssistant 
            key={`ask-ai-${activePetId}`} // Force re-render on pet switch
            petProfile={activePet} 
            onOpenProfile={() => setShowProfileForm(true)} 
            embedded={true}
            initialContext={activePet ? `Hi! I see you're asking about ${activePet.name}. How can I help?` : "Hi Pawrent! I'm Ask Petz AI. I can help with training tips, general care, or finding pet-friendly spots!"}
            placeholder="Ask about training, care, or places..."
          />
        );
    }
  };

  // Modal Content Renderer
  const renderModalContent = () => {
      switch (activeModalTool) {
          case 'search':
          case 'ask-ai':
              return (
                <AiAssistant 
                    key={`modal-ai-${activePetId}`}
                    petProfile={activePet} 
                    onOpenProfile={() => setShowProfileForm(true)} 
                    initialQuery={aiInitialQuery}
                />
              );
          case 'meal':
              return <MealPlannerTool petProfile={activePet} />;
          case 'event':
              return <EventMatcherTool petProfile={activePet} />;
          case 'lifestage':
              return <LifeStageCalculatorTool petProfile={activePet} />;
          case 'name':
              return <NameGeneratorTool />;
          case 'breed':
              return <BreedGuideTool />;
          case 'translator':
              return <TranslatorTool />;
          case 'treat':
              return <TreatChefTool />;
          case 'training':
              return <TrainingCoachTool />;
          case 'travel':
              return <TravelPlannerTool />;
          case 'vet':
              return <VetPrepTool />;
          case 'compatibility':
              return <CompatibilityTool />;
          case 'budget':
              return <BudgetPlannerTool />;
          case 'safety':
              return <SafetyCheckerTool />;
          case 'name-analyzer':
              return <NameAnalyzerTool />;
          default:
              return null;
      }
  };

  // Filter logic for places
  const filteredPlaces = MOCK_PLACES.filter(place => {
    const typeMatch = placeTypeFilter === 'All' || place.type === placeTypeFilter;
    const locationMatch = locationFilter === 'All' || place.location.includes(locationFilter);
    return typeMatch && locationMatch;
  });

  const selectedPlace = selectedPlaceId ? MOCK_PLACES.find(p => p.id === selectedPlaceId) : null;
  const selectedEvent = selectedEventId ? MOCK_EVENTS.find(e => e.id === selectedEventId) : null;

  // Filter Logic for Events
  const petzEvents = MOCK_EVENTS.filter(e => e.organizer === 'PetzPawradise');
  const otherEvents = MOCK_EVENTS.filter(e => e.organizer !== 'PetzPawradise');

  // Filter Logic for Blogs
  const filteredBlogs = blogs.filter(b => blogFilter === 'All' || b.category === blogFilter);

  return (
    <div className="min-h-screen font-sans bg-brand-cream text-brand-dark overflow-x-hidden">
      {/* Navigation */}
      <nav className="glass-nav sticky top-0 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center cursor-pointer group" onClick={() => setCurrentView('home')}>
              <img 
                src="/images/logo.png" 
                alt="PetzPawradise Logo" 
                className="h-10 w-auto mr-2 hidden md:block group-hover:scale-110 transition duration-300" 
              />
              <div className="flex items-baseline">
                <h1 className="text-3xl font-black tracking-tight flex items-center gap-1">
                    <span className="text-brand-red drop-shadow-sm transform group-hover:scale-105 transition inline-block">Petz</span>
                    <span className="text-stroke-orange text-white drop-shadow-md inline-block">Pawradise</span>
                </h1>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              <NavLink view="home" label="Home" />
              <NavLink view="events" label="Events" />
              <NavLink view="places" label="Pet Friendly Places" />
              <NavLink view="tools" label="Tools" />
              <NavLink view="blog" label="Blog" />
              <NavLink view="shop" label="Shop" />
              <NavLink view="contact" label="Contact Us" />
              
              {/* Profile Switcher / Create Button */}
              <div className="relative ml-4">
                  {!userProfile ? (
                      <Button variant="primary" size="sm" onClick={() => setShowProfileForm(true)} className="shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition">
                        Create Profile
                      </Button>
                  ) : (
                      <div>
                          <button 
                            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                            className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md border-2 border-brand-yellow/50 hover:border-brand-orange transition"
                          >
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-brand-orange">
                                  {activePet?.image ? <img src={activePet.image} className="w-full h-full object-cover"/> : (activePet?.type === 'Cat' ? <Cat size={20} className="m-auto text-gray-400 mt-1"/> : <Dog size={20} className="m-auto text-gray-400 mt-1"/>)}
                              </div>
                              <span className="font-bold text-brand-brown text-sm max-w-[100px] truncate">{activePet ? activePet.name : "My Pets"}</span>
                              <ChevronDown size={16} className={`transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`}/>
                          </button>
                          
                          {profileMenuOpen && (
                              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-2 z-50">
                                  <div className="px-3 py-2 border-b border-gray-100 mb-2">
                                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Switch Pet Context</span>
                                  </div>
                                  {userProfile.pets.map(pet => (
                                      <button 
                                        key={pet.id}
                                        onClick={() => { setActivePetId(pet.id); setProfileMenuOpen(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold mb-1 flex items-center gap-3 transition-all ${activePetId === pet.id ? 'bg-brand-orange text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                                      >
                                          <div className="w-6 h-6 rounded-full overflow-hidden bg-white/30 flex-shrink-0">
                                            {pet.image ? <img src={pet.image} className="w-full h-full object-cover"/> : (pet.type === 'Cat' ? <Cat size={14} className="m-auto mt-1"/> : <Dog size={14} className="m-auto mt-1"/>)}
                                          </div>
                                          <span className="truncate">{pet.name}</span>
                                          {activePetId === pet.id && <Star size={12} fill="white" className="ml-auto"/>}
                                      </button>
                                  ))}
                                  <div className="border-t border-gray-100 my-2"></div>
                                  <button 
                                    onClick={() => { setCurrentView('profile'); setProfileMenuOpen(false); }}
                                    className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-brand-brown hover:bg-brand-yellow/20 flex items-center gap-2"
                                  >
                                      <User size={14}/> View Family Profile
                                  </button>
                              </div>
                          )}
                      </div>
                  )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-brand-brown p-2 rounded-xl hover:bg-brand-cream">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 pt-2 pb-6 space-y-2 flex flex-col shadow-2xl absolute w-full z-50">
            <NavLink view="home" label="Home" />
            <NavLink view="events" label="Events" />
            <NavLink view="places" label="Pet Friendly Places" />
            <NavLink view="tools" label="Tools" />
            <NavLink view="blog" label="Blog" />
            <NavLink view="shop" label="Shop" />
            <NavLink view="contact" label="Contact Us" />
            <div className="pt-4">
                 {userProfile ? (
                     <Button className="w-full shadow-lg" onClick={() => {setCurrentView('profile'); setMobileMenuOpen(false)}}>
                        View Profile ({activePet?.name})
                     </Button>
                 ) : (
                     <Button className="w-full shadow-lg" onClick={() => {setShowProfileForm(true); setMobileMenuOpen(false)}}>
                        Create Profile
                     </Button>
                 )}
            </div>
          </div>
        )}
      </nav>

      {/* Modal for Pet Profile Creation/Editing */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <PetProfileForm 
            initialProfile={userProfile} 
            onSave={handleSaveProfile} 
            onCancel={() => setShowProfileForm(false)} 
          />
        </div>
      )}

      {/* Modal for Publish Blog */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-brand-brown/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-300">
             <div className="w-full max-w-2xl bg-white rounded-[2rem] p-8 shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
                 <button onClick={() => setShowPublishModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={24}/></button>
                 
                 <div className="text-center mb-6">
                     <h3 className="text-3xl font-black text-brand-brown mb-2">Share Your Story</h3>
                     <p className="text-gray-500">Inspire other pawrents in the community.</p>
                 </div>

                 <div className="space-y-4">
                     {/* Image Upload */}
                     <div className="relative group">
                         <div 
                            className="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-orange transition"
                            onClick={() => document.getElementById('blog-img-upload')?.click()}
                         >
                             {newBlog.image ? (
                                 <img src={newBlog.image} className="w-full h-full object-cover rounded-2xl" alt="Preview"/>
                             ) : (
                                 <div className="text-center text-gray-400">
                                     <ImageIcon size={32} className="mx-auto mb-2"/>
                                     <span className="text-sm font-bold">Click to upload cover image</span>
                                 </div>
                             )}
                         </div>
                         <input id="blog-img-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'blog')}/>
                     </div>

                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Blog Title</label>
                         <input 
                            value={newBlog.title}
                            onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none font-bold text-lg"
                            placeholder="e.g. My Dog's First Beach Day"
                         />
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Category</label>
                         <div className="flex gap-2 flex-wrap">
                             {['Community', 'Tips', 'Funny', 'Travel', 'Events', 'Reviews', 'Guides'].map(cat => (
                                 <button 
                                    key={cat} 
                                    onClick={() => setNewBlog({...newBlog, category: cat})}
                                    className={`px-3 py-1 rounded-lg text-sm font-bold border transition ${newBlog.category === cat ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-500 border-gray-200'}`}
                                 >
                                     {cat}
                                 </button>
                             ))}
                         </div>
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Content</label>
                         <textarea 
                            value={newBlog.content}
                            onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none h-40 resize-none"
                            placeholder="Write something paw-some..."
                         />
                         <p className="text-xs text-gray-400 mt-1">Tip: You can include image links in your text for now!</p>
                     </div>
                     <Button onClick={handlePublishBlog} className="w-full py-4 text-lg shadow-lg">
                        Publish Now <PenTool className="ml-2" size={18}/>
                     </Button>
                 </div>
             </div>
        </div>
      )}

      {/* Modal for Event Submission */}
      {showEventForm && (
        <div className="fixed inset-0 bg-brand-brown/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-300">
             <div className="w-full max-w-2xl bg-white rounded-[2rem] p-8 shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
                 <button onClick={() => setShowEventForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={24}/></button>
                 
                 <div className="text-center mb-6">
                     <h3 className="text-3xl font-black text-brand-brown mb-2">Submit an Event</h3>
                     <p className="text-gray-500">Hosting a pawty? Let the community know!</p>
                 </div>

                 <div className="space-y-4">
                     {/* Image Upload */}
                     <div className="relative group">
                         <div 
                            className="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-orange transition"
                            onClick={() => document.getElementById('event-img-upload')?.click()}
                         >
                             {newEvent.image ? (
                                 <img src={newEvent.image} className="w-full h-full object-cover rounded-2xl" alt="Preview"/>
                             ) : (
                                 <div className="text-center text-gray-400">
                                     <Upload size={32} className="mx-auto mb-2"/>
                                     <span className="text-sm font-bold">Upload Event Poster</span>
                                 </div>
                             )}
                         </div>
                         <input id="event-img-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'event')}/>
                     </div>

                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Event Name</label>
                         <input 
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none"
                            placeholder="e.g. Weekend Doggy Yoga"
                         />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Date</label>
                             <input 
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none"
                                placeholder="e.g. 12th March 2025"
                             />
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Location</label>
                             <input 
                                value={newEvent.location}
                                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none"
                                placeholder="e.g. Desa ParkCity"
                             />
                         </div>
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                         <textarea 
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none h-32 resize-none"
                            placeholder="Tell us about the activities, fees, etc."
                         />
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Video Link (Optional)</label>
                         <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 px-3">
                             <Video size={18} className="text-gray-400 mr-2"/>
                             <input 
                                value={newEvent.videoUrl}
                                onChange={(e) => setNewEvent({...newEvent, videoUrl: e.target.value})}
                                className="w-full p-3 bg-transparent outline-none"
                                placeholder="https://youtube.com/..."
                             />
                         </div>
                     </div>
                     <Button onClick={handleSubmitEvent} className="w-full py-4 text-lg shadow-lg">
                        Submit Request <Send className="ml-2" size={18}/>
                     </Button>
                 </div>
             </div>
        </div>
      )}

      {/* Modal for Place Suggestion */}
      {showPlaceForm && (
        <div className="fixed inset-0 bg-brand-brown/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-300">
             <div className="w-full max-w-2xl bg-white rounded-[2rem] p-8 shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
                 <button onClick={() => setShowPlaceForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={24}/></button>
                 
                 <div className="text-center mb-6">
                     <h3 className="text-3xl font-black text-brand-brown mb-2">Suggest a New Place</h3>
                     <p className="text-gray-500">Know a hidden gem? Share it with the pack!</p>
                 </div>

                 <div className="space-y-4">
                     {/* Image Upload */}
                     <div className="relative group">
                         <div 
                            className="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-orange transition"
                            onClick={() => document.getElementById('place-img-upload')?.click()}
                         >
                             {newPlace.image ? (
                                 <img src={newPlace.image} className="w-full h-full object-cover rounded-2xl" alt="Preview"/>
                             ) : (
                                 <div className="text-center text-gray-400">
                                     <ImageIcon size={32} className="mx-auto mb-2"/>
                                     <span className="text-sm font-bold">Upload Photo</span>
                                 </div>
                             )}
                         </div>
                         <input id="place-img-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'place')}/>
                     </div>

                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Place Name</label>
                         <input 
                            value={newPlace.name}
                            onChange={(e) => setNewPlace({...newPlace, name: e.target.value})}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none"
                            placeholder="e.g. The Barking Bean"
                         />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Category</label>
                             <select 
                                value={newPlace.type}
                                onChange={(e) => setNewPlace({...newPlace, type: e.target.value})}
                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none"
                             >
                                 {['Cafe', 'Park', 'Mall', 'Hotel', 'Groomer', 'Shop'].map(t => <option key={t} value={t}>{t}</option>)}
                             </select>
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Area / City</label>
                             <input 
                                value={newPlace.location}
                                onChange={(e) => setNewPlace({...newPlace, location: e.target.value})}
                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none"
                                placeholder="e.g. Mont Kiara"
                             />
                         </div>
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Address</label>
                         <input 
                            value={newPlace.address}
                            onChange={(e) => setNewPlace({...newPlace, address: e.target.value})}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none"
                            placeholder="Street address, postcode, state"
                         />
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                         <textarea 
                            value={newPlace.description}
                            onChange={(e) => setNewPlace({...newPlace, description: e.target.value})}
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none h-32 resize-none"
                            placeholder="What makes this place pet-friendly? (e.g. Indoor seating allowed, pet menu provided)"
                         />
                     </div>
                     <Button onClick={handleSubmitPlace} className="w-full py-4 text-lg shadow-lg">
                        Submit Suggestion <Send className="ml-2" size={18}/>
                     </Button>
                 </div>
             </div>
        </div>
      )}

      {/* Universal Tool Modal */}
      {activeModalTool && (
        <div className="fixed inset-0 bg-brand-brown/40 backdrop-blur-md z-[70] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-3xl h-[700px] bg-white/90 backdrop-blur-xl rounded-[40px] relative shadow-2xl border-2 border-white/50 flex flex-col overflow-hidden transform transition-all scale-100">
                <button 
                    onClick={() => setActiveModalTool(null)} 
                    className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full hover:bg-white text-brand-brown transition hover:rotate-90 duration-300 shadow-sm"
                >
                    <X size={24} />
                </button>
                {renderModalContent()}
            </div>
        </div>
      )}

      {/* Place Details Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-brand-brown/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
                <button 
                    onClick={() => setSelectedPlaceId(null)} 
                    className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full hover:bg-white text-brand-brown transition hover:rotate-90 duration-300 shadow-sm"
                >
                    <X size={24} />
                </button>

                <div className="h-64 md:h-80 relative flex-shrink-0">
                    <img src={selectedPlace.image} className="w-full h-full object-cover" alt={selectedPlace.name}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:left-10 text-white">
                         <div className="flex items-center gap-2 mb-2">
                             <span className="bg-brand-orange px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{selectedPlace.type}</span>
                             <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-2 py-1 rounded-full">
                                 <Star size={14} className="fill-brand-yellow text-brand-yellow"/>
                                 <span className="font-bold text-sm">{selectedPlace.rating}</span>
                             </div>
                         </div>
                         <h2 className="text-4xl md:text-5xl font-black leading-tight">{selectedPlace.name}</h2>
                         <p className="text-lg font-medium opacity-90 flex items-center gap-2 mt-1"><MapPin size={18}/> {selectedPlace.location}</p>
                    </div>
                </div>

                <div className="p-8 md:p-10 overflow-y-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-brand-brown mb-3">About this place</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{selectedPlace.description}</p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-brand-brown mb-3">Features & Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedPlace.features.map((feat, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">
                                            <CheckCircle size={14} className="text-green-500"/> {feat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1 space-y-4">
                            <div className="bg-brand-cream/50 p-6 rounded-[2rem] border border-brand-yellow/20">
                                <h3 className="font-bold text-brand-brown mb-4 flex items-center gap-2"><Info size={18}/> Details</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <MapPin size={18} className="text-brand-orange flex-shrink-0 mt-1"/>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Address</p>
                                            <p className="text-sm text-gray-700 font-medium">{selectedPlace.address || 'Address details unavailable'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Clock size={18} className="text-brand-orange flex-shrink-0 mt-1"/>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Opening Hours</p>
                                            <p className="text-sm text-gray-700 font-medium">{selectedPlace.openingHours || 'Check website'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Phone size={18} className="text-brand-orange flex-shrink-0 mt-1"/>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Contact</p>
                                            <p className="text-sm text-gray-700 font-medium">{selectedPlace.contact || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-brand-brown/10">
                                    <Button className="w-full">Get Directions</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-brand-brown/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
                <button 
                    onClick={() => setSelectedEventId(null)} 
                    className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-full hover:bg-white text-brand-brown transition hover:rotate-90 duration-300 shadow-sm"
                >
                    <X size={24} />
                </button>

                <div className="h-64 md:h-80 relative flex-shrink-0">
                    <img src={selectedEvent.image} className="w-full h-full object-cover" alt={selectedEvent.title}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:left-10 text-white">
                         <span className="bg-brand-orange px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 inline-block shadow-lg">{selectedEvent.type}</span>
                         <h2 className="text-3xl md:text-5xl font-black leading-tight mb-2">{selectedEvent.title}</h2>
                         <p className="text-lg font-medium opacity-90 flex items-center gap-2"><Calendar size={18}/> {selectedEvent.date}</p>
                    </div>
                </div>

                <div className="p-8 md:p-10 overflow-y-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-brand-brown mb-3">Event Details</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{selectedEvent.fullDescription || selectedEvent.description}</p>
                            </div>
                            
                            {selectedEvent.highlights && (
                                <div>
                                    <h3 className="text-xl font-bold text-brand-brown mb-4">Activities & Highlights</h3>
                                    <ul className="space-y-3">
                                        {selectedEvent.highlights.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                                                <CheckCircle className="text-brand-orange flex-shrink-0 mt-0.5" size={18}/>
                                                <span className="text-gray-700 font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-1 space-y-4">
                            <div className="bg-brand-cream/50 p-6 rounded-[2rem] border border-brand-yellow/20 shadow-sm">
                                <h3 className="font-bold text-brand-brown mb-4 flex items-center gap-2"><Info size={18}/> Key Info</h3>
                                
                                <div className="space-y-5">
                                    <div className="flex gap-3">
                                        <MapPin size={18} className="text-brand-orange flex-shrink-0 mt-1"/>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Location</p>
                                            <p className="text-sm text-gray-700 font-bold">{selectedEvent.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Clock size={18} className="text-brand-orange flex-shrink-0 mt-1"/>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Time</p>
                                            <p className="text-sm text-gray-700 font-bold">{selectedEvent.time || 'TBA'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Wallet size={18} className="text-brand-orange flex-shrink-0 mt-1"/>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Price</p>
                                            <p className="text-sm text-gray-700 font-bold">{selectedEvent.price || 'Free'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-brand-brown/10">
                                    <Button className="w-full shadow-lg">Register Interest</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Main Content Area */}
      <main>
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-32 px-4 overflow-hidden text-center">
                 {/* Background Gradients & Blobs */}
                 <div className="absolute inset-0 bg-gradient-to-b from-[#FF9A76] via-[#FFD0A8] to-brand-cream -z-20"></div>
                 
                 {/* Animated Blobs */}
                 <div className="absolute top-10 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob -z-10"></div>
                 <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 -z-10"></div>
                 <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 -z-10"></div>

                 <div className="max-w-5xl mx-auto relative z-10">
                     <div className="inline-block bg-white/30 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/50 shadow-lg animate-fade-in-up">
                         <span className="text-brand-brown font-bold text-sm md:text-base tracking-wide flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-200 animate-pulse" /> The lifestyle hub for every pawrent!
                         </span>
                     </div>
                     
                     <h1 className="text-5xl md:text-7xl font-black text-brand-brown mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                        Welcome to <br className="md:hidden"/>
                        <span className="inline-block mt-2 md:mt-0 relative">
                            <span className="absolute -inset-1 bg-white/20 blur-lg rounded-full"></span>
                            <span className="relative text-brand-red drop-shadow-xl">Petz</span>
                            <span className="relative text-stroke-orange ml-2 drop-shadow-xl">Pawradise</span>
                        </span>
                     </h1>
                     
                     <div className="mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                        <span className="text-2xl md:text-4xl font-extrabold text-brand-brown block drop-shadow-sm tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-brand-brown to-brand-red">
                            Made for Pawrents. <br className="md:hidden"/> Loved by Furkids.
                        </span>
                     </div>

                     {/* AI Search Bar */}
                     <div className="max-w-2xl mx-auto mt-8 relative group z-20 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-red rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500 animate-tilt"></div>
                        <div className="relative bg-white/90 backdrop-blur-xl rounded-full shadow-2xl p-2 flex items-center border border-white ring-4 ring-transparent focus-within:ring-brand-orange/20 transition-all transform hover:scale-[1.02] duration-300">
                             <div className="pl-4 pr-2">
                                <Bot className="text-brand-orange w-7 h-7 flex-shrink-0 animate-bounce" />
                             </div>
                             <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                                placeholder="Ask AI: 'Best vets in PJ', 'Hiking trails'..."
                                className="flex-1 px-2 py-4 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-lg min-w-0 font-medium"
                             />
                             <Button className="rounded-full !py-3 !px-8 shadow-xl flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-red hover:to-brand-orange border-none" onClick={handleAiSearch}>
                                <span className="font-extrabold">Search</span> <Search size={20}/>
                             </Button>
                        </div>
                        <div className="mt-4 text-brand-brown/80 text-sm font-bold flex justify-center gap-2 flex-wrap">
                            <span className="opacity-70">Try:</span>
                            {['Dog friendly beaches', '24 hour vet KL', 'Homemade treats'].map(tag => (
                                <span key={tag} className="bg-white/20 px-2 py-1 rounded-lg border border-white/30 text-xs cursor-pointer hover:bg-white/40 transition" onClick={() => {setSearchQuery(tag); handleAiSearch();}}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                     </div>
                 </div>

                 {/* Floating Pets */}
                 <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80" className="absolute top-[15%] left-[-20px] md:left-[10%] w-32 h-32 md:w-56 md:h-56 rounded-full border-8 border-white/50 shadow-2xl rotate-[-12deg] hidden md:block object-cover animate-float" alt="Happy Dog" />
                 <img src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=300&q=80" className="absolute bottom-[15%] right-[-10px] md:right-[10%] w-28 h-28 md:w-48 md:h-48 rounded-full border-8 border-white/50 shadow-2xl rotate-[12deg] hidden md:block object-cover animate-float-delayed" alt="Curious Cat" />
            </section>

            {/* Upcoming Events Preview Section */}
            <RevealOnScroll className="py-20 px-4 bg-brand-cream">
                 <div className="max-w-7xl mx-auto">
                     <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                        <div>
                            <h2 className="text-4xl font-black text-brand-brown mb-2">Upcoming Events</h2>
                            <p className="text-gray-600 text-lg">Don't miss out on the fun!</p>
                        </div>
                     </div>
                     <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {MOCK_EVENTS.slice(0, 3).map(event => (
                             <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-transparent hover:border-brand-orange/30 hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-2" onClick={() => setSelectedEventId(event.id)}>
                                 <div className="h-48 relative overflow-hidden">
                                     <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                                     <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase text-brand-orange shadow-md">{event.type}</span>
                                 </div>
                                 <div className="p-6">
                                     <div className="text-xs font-bold text-gray-400 uppercase mb-2">{event.date}</div>
                                     <h3 className="text-xl font-bold text-brand-brown mb-2 group-hover:text-brand-orange transition">{event.title}</h3>
                                     <p className="text-gray-500 text-sm flex items-center gap-2"><MapPin size={14}/> {event.location}</p>
                                 </div>
                             </div>
                        ))}
                     </div>
                     <div className="flex justify-center">
                        <Button onClick={() => setCurrentView('events')} size="lg" className="px-8 py-4 text-xl">View All Events</Button>
                     </div>
                 </div>
            </RevealOnScroll>

            {/* Pet Friendly Places Preview Section */}
            <RevealOnScroll className="py-20 px-4 bg-white relative overflow-hidden">
                 {/* Decor */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-bl-full"></div>
                 <div className="max-w-7xl mx-auto relative z-10">
                     <div className="text-center mb-12">
                         <h2 className="text-4xl font-black text-brand-brown">Pet-Friendly Spots</h2>
                         <p className="text-gray-500 text-lg mt-2">Top rated places to hang out with your furkid.</p>
                     </div>
                     <div className="grid md:grid-cols-3 gap-8">
                        {MOCK_PLACES.slice(0, 3).map(place => (
                             <div key={place.id} className="bg-gray-50 rounded-[2.5rem] p-4 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group cursor-pointer" onClick={() => setSelectedPlaceId(place.id)}>
                                 <div className="h-56 rounded-[2rem] overflow-hidden mb-4 relative">
                                     <img src={place.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                                     <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                                         <Star size={12} className="text-brand-yellow fill-current"/>
                                         <span className="text-white font-bold text-xs">{place.rating}</span>
                                     </div>
                                 </div>
                                 <div className="px-2 mb-2">
                                     <h3 className="text-xl font-bold text-brand-brown group-hover:text-brand-orange transition">{place.name}</h3>
                                     <p className="text-sm text-gray-500">{place.location}</p>
                                 </div>
                             </div>
                        ))}
                     </div>
                     <div className="text-center mt-10">
                         <Button onClick={() => setCurrentView('places')} size="lg" className="px-8 py-4 text-xl">Explore All Places</Button>
                     </div>
                 </div>
            </RevealOnScroll>

            {/* PetzPawradise Shop Showcase Section */}
            <RevealOnScroll className="py-24 px-4 bg-[#5D4037] relative overflow-hidden text-center">
                 {/* Background Texture */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20"></div>
                 
                 <div className="max-w-7xl mx-auto relative z-10">
                     
                     <h2 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
                        <span className="text-brand-red inline-block mr-2 drop-shadow-lg">Petz</span>
                        <span className="text-stroke-orange text-white inline-block mr-4 drop-shadow-lg">Pawradise</span>
                        <span className="text-white inline-block">Shop</span>
                     </h2>
                     <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                         Premium single-ingredient treats and chews. <br/>
                         <span className="text-brand-yellow font-bold">100% Natural. 0% Nasties.</span>
                     </p>

                     {/* Featured Products Grid */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {MOCK_PRODUCTS.slice(0, 4).map(product => (
                            <div key={product.id} className="bg-white rounded-[2rem] p-4 group cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-xl" onClick={() => setCurrentView('shop')}>
                                <div className="h-48 rounded-[1.5rem] bg-gray-50 overflow-hidden relative mb-4">
                                    <img src={product.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-110"/>
                                    {product.tags.includes('Hypoallergenic') && (
                                        <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-lg">Sensitive</span>
                                    )}
                                </div>
                                <h3 className="font-bold text-brand-brown text-lg leading-tight mb-1 group-hover:text-brand-orange transition">{product.name}</h3>
                                <p className="text-sm text-gray-400 font-medium">{product.category}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="font-black text-brand-brown">RM {product.variants[0].price.toFixed(2)}</span>
                                    <button className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-orange-600 transition shadow-md">
                                        <Plus size={16}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                     </div>
                     
                     <div className="flex justify-center">
                        <Button onClick={() => setCurrentView('shop')} size="lg" className="px-8 py-4 text-xl shadow-2xl bg-brand-orange border-orange-700">
                            SHOP NOW!
                        </Button>
                     </div>
                     
                     {/* Trust Badges */}
                     <div className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto opacity-60 text-white border-t border-white/10 pt-8">
                        <div className="flex flex-col items-center">
                            <ShieldAlert className="mb-2"/>
                            <span className="text-xs font-bold uppercase tracking-wider">PetzPawradise Verified Vendors</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Sparkles className="mb-2"/>
                            <span className="text-xs font-bold uppercase tracking-wider">Curated Excellence</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Heart className="mb-2"/>
                            <span className="text-xs font-bold uppercase tracking-wider">Trusted Community Choice</span>
                        </div>
                     </div>
                 </div>
            </RevealOnScroll>

            {/* Homepage AI Tools Section */}
            <RevealOnScroll className="py-20 px-4 bg-white relative overflow-hidden">
                 <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black text-brand-brown flex items-center justify-center gap-3">
                            <Sparkles className="text-brand-orange" size={36}/> Paw-some Magic for Super Pawrents
                        </h2>
                        <p className="text-gray-500 mt-2 text-lg">Try our AI-powered tools designed to make pet parenting easier.</p>
                    </div>

                    <div className="bg-white rounded-[3rem] shadow-2xl border-4 border-brand-cream overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                        {/* Sidebar */}
                        <div className="md:w-1/3 bg-brand-cream/50 p-8 border-r border-brand-brown/10">
                            <div className="space-y-3">
                                {[
                                    { id: 'ask-ai', icon: Bot, label: 'Ask Petz AI', desc: 'Your lifestyle assistant.' },
                                    { id: 'meal', icon: Utensils, label: 'Smart Meal Planner', desc: 'Fresh food recipes.' },
                                    { id: 'event', icon: Heart, label: 'Event Matcher', desc: 'Find perfect outings.' },
                                    { id: 'lifestage', icon: Calculator, label: 'Life Stage Calc', desc: 'Human age converter.' },
                                    { id: 'name', icon: Sparkles, label: 'Name Generator', desc: 'Find the perfect name.' },
                                    { id: 'breed', icon: Dna, label: 'Breed Guide', desc: 'Learn about traits.' }
                                ].map((tool) => (
                                    <button
                                        key={tool.id}
                                        onClick={() => setActiveHomeTool(tool.id as any)}
                                        className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 group ${activeHomeTool === tool.id ? 'bg-white shadow-lg ring-2 ring-brand-orange/20' : 'hover:bg-white/50'}`}
                                    >
                                        <div className={`p-3 rounded-xl ${activeHomeTool === tool.id ? 'bg-brand-orange text-white' : 'bg-white text-gray-400 group-hover:text-brand-orange'}`}>
                                            <tool.icon size={20}/>
                                        </div>
                                        <div>
                                            <h4 className={`font-bold ${activeHomeTool === tool.id ? 'text-brand-brown' : 'text-gray-500'}`}>{tool.label}</h4>
                                            <p className="text-xs text-gray-400">{tool.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-brand-brown/10 text-center">
                                <p className="text-sm text-gray-500 mb-4">Want more magic?</p>
                                <Button onClick={() => setCurrentView('tools')} className="w-full">Explore All Tools</Button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="md:w-2/3 bg-white relative">
                            <div className="absolute inset-0 overflow-hidden">
                                {renderHomeToolContent()}
                            </div>
                        </div>
                    </div>
                 </div>
            </RevealOnScroll>
            
            {/* Community / Blog Section */}
            <RevealOnScroll className="py-20 px-4 bg-brand-cream relative">
                 <div className="max-w-7xl mx-auto">
                     <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-4xl font-black text-brand-brown">For Pawrents, By Pawrents</h2>
                            <p className="text-gray-600 mt-2 text-lg">Community stories, tips and guides.</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {blogs.slice(0, 3).map(blog => (
                            <div key={blog.id} className="bg-white rounded-[2rem] p-5 hover:-translate-y-3 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer border border-transparent hover:border-brand-yellow/50 flex flex-col h-full" onClick={() => {setCurrentView('blog'); setExpandedBlogId(blog.id);}}>
                                 <div className="h-48 rounded-[1.5rem] overflow-hidden mb-5 relative">
                                     <img src={blog.image} className="w-full h-full object-cover rounded-[1.5rem] transition duration-700 hover:scale-110"/>
                                     <span className="absolute top-3 left-3 text-xs font-bold bg-white/90 backdrop-blur text-brand-brown px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">{blog.category}</span>
                                 </div>
                                 <h3 className="text-3xl font-black text-brand-brown mb-4 group-hover:text-brand-orange transition leading-tight">{blog.title}</h3>
                                 <p className="text-sm text-gray-500 mb-4 line-clamp-2">{blog.excerpt}</p>
                                 <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                                     <span className="text-gray-400 text-sm font-bold">5 min read</span>
                                     <span className="text-brand-orange font-extrabold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Read more <ArrowRight size={14}/></span>
                                 </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                         <Button onClick={() => setCurrentView('blog')} size="lg" className="px-8 py-4 text-xl">Read the Blog</Button>
                    </div>
                 </div>
            </RevealOnScroll>

            {/* Partners Section - Homepage */}
            <RevealOnScroll className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Collaborative Partners</span>
                    <h2 className="text-3xl font-black text-brand-brown mt-3 mb-12">Brands We Love & Trust</h2>
                    
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                        {MOCK_PARTNERS.map(partner => (
                            <div key={partner.id} className="w-32 md:w-40 h-20 flex items-center justify-center">
                                <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain hover:scale-110 transition duration-300" title={partner.name}/>
                            </div>
                        ))}
                    </div>
                </div>
            </RevealOnScroll>
          </>
        )}

        {/* Events View */}
        {currentView === 'events' && (
          <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
             
             <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                 <div>
                     <h2 className="text-4xl font-black text-brand-brown mb-2">Events & Activities</h2>
                     <p className="text-gray-600">Discover what's happening in the pet community.</p>
                 </div>
                 <Button onClick={() => setShowEventForm(true)} className="shadow-lg flex items-center gap-2">
                     <Plus size={18}/> Submit Event
                 </Button>
             </div>

             {/* Section 1: PetzPawradise Official Events */}
             <div className="mb-20">
                 <h2 className="text-3xl font-black text-brand-brown mb-8 flex items-center gap-3">
                    <span className="bg-brand-orange text-white p-2 rounded-xl"><Calendar size={24}/></span> 
                    Upcoming PetzPawradise Events
                 </h2>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {petzEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border-2 border-brand-orange/20 flex flex-col hover:shadow-2xl transition duration-300 group cursor-pointer hover:-translate-y-2 relative">
                            <div className="absolute top-4 right-4 z-30 bg-brand-red text-white font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide shadow-md">Official Event</div>
                            <div className="relative h-56 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                                <img src={event.image} alt={event.title} className="h-full w-full object-cover group-hover:scale-110 transition duration-700"/>
                                <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-brand-orange font-bold px-3 py-1 rounded-full text-xs uppercase shadow-md">{event.type}</span>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-sm font-bold text-brand-orange flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg"><Calendar size={14}/> {event.date}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-brand-brown mb-3 group-hover:text-brand-orange transition">{event.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                                    <MapPin size={16} className="text-brand-brown"/> {event.location}
                                </p>
                                <p className="text-gray-500 text-sm mb-8 flex-1 leading-relaxed">{event.description}</p>
                                <Button 
                                    onClick={() => setSelectedEventId(event.id)} 
                                    className="w-full shadow-lg shadow-orange-100"
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>

             {/* Section 2: Other Community Activities */}
             <div>
                 <h2 className="text-3xl font-black text-brand-brown mb-8 flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Users size={24}/></span> 
                    Other Community Activities
                 </h2>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition duration-300 group cursor-pointer hover:-translate-y-2">
                            <div className="relative h-48 overflow-hidden">
                                <img src={event.image} alt={event.title} className="h-full w-full object-cover group-hover:scale-110 transition duration-700"/>
                                <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur text-gray-600 font-bold px-3 py-1 rounded-full text-xs uppercase shadow-md">{event.type}</span>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Calendar size={12}/> {event.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-brand-brown mb-2 group-hover:text-brand-orange transition">{event.title}</h3>
                                <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                                    <MapPin size={14} className="text-gray-400"/> {event.location}
                                </p>
                                <div className="mt-auto">
                                    <Button 
                                        onClick={() => setSelectedEventId(event.id)}
                                        variant="outline" 
                                        size="sm" 
                                        className="w-full group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition"
                                    >
                                        More Info
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
          </div>
        )}
        
        {/* Places View */}
        {currentView === 'places' && (
          <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
             
             <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                 <h2 className="text-4xl font-black text-brand-brown flex items-center gap-3">
                    <MapPin className="text-brand-orange" size={36}/> Pet-Friendly Places
                 </h2>
                 <Button onClick={() => setShowPlaceForm(true)} className="shadow-lg flex items-center gap-2">
                     <Plus size={18}/> Suggest a Place
                 </Button>
             </div>

             {/* Filters */}
             <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 mb-12">
                 <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                     <div className="flex items-center gap-2 text-brand-brown font-bold min-w-[100px] text-lg">
                         <Filter size={24} className="text-brand-orange"/> Filters:
                     </div>
                     
                     <div className="flex-1 space-y-6 md:space-y-0 md:flex md:gap-12 w-full">
                         {/* Type Filter */}
                         <div>
                             <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Category</label>
                             <div className="flex flex-wrap gap-3">
                                 {['All', 'Cafe', 'Park', 'Mall', 'Hotel'].map(type => (
                                     <button 
                                        key={type}
                                        onClick={() => setPlaceTypeFilter(type)}
                                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                                            placeTypeFilter === type 
                                            ? 'bg-brand-orange text-white shadow-lg transform scale-105 ring-2 ring-orange-200' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                     >
                                         {type}
                                     </button>
                                 ))}
                             </div>
                         </div>

                         {/* Location Filter */}
                         <div>
                             <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Location</label>
                             <div className="flex flex-wrap gap-3">
                                 {['All', 'Kuala Lumpur', 'Selangor'].map(loc => (
                                     <button 
                                        key={loc}
                                        onClick={() => setLocationFilter(loc)}
                                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                                            locationFilter === loc 
                                            ? 'bg-brand-orange text-white shadow-lg transform scale-105 ring-2 ring-orange-200' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                     >
                                         {loc}
                                     </button>
                                 ))}
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaces.length > 0 ? (
                    filteredPlaces.map((place) => (
                        <div key={place.id} className="group bg-white rounded-[2.5rem] p-6 hover:bg-white transition-all cursor-pointer border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:-translate-y-2">
                            <div className="h-64 rounded-[2rem] overflow-hidden mb-6 relative">
                                <img src={place.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={place.name}/>
                                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                                    {place.type === 'Cafe' && <Utensils size={20} className="text-brand-orange"/>}
                                    {place.type === 'Park' && <Sun size={20} className="text-green-500"/>}
                                    {place.type === 'Mall' && <ShoppingBag size={20} className="text-blue-500"/>}
                                    {place.type === 'Hotel' && <MapPin size={20} className="text-purple-500"/>}
                                </div>
                                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                                    <Star size={14} className="text-brand-yellow fill-current"/>
                                    <span className="text-white font-bold text-sm">{place.rating}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-brand-brown text-2xl leading-tight group-hover:text-brand-orange transition">{place.name}</h3>
                                </div>
                                <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wide flex items-center gap-1"><MapPin size={14}/> {place.location}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {place.features.map(feat => (
                                        <span key={feat} className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-lg">{feat}</span>
                                    ))}
                                </div>
                                
                                <Button 
                                    onClick={() => setSelectedPlaceId(place.id)}
                                    variant="outline" 
                                    className="w-full group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition"
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-20 text-gray-400">
                        <div className="inline-block bg-gray-100 p-4 rounded-full mb-4"><Search size={32}/></div>
                        <p className="text-xl font-bold">No places found fitting those criteria.</p>
                        <button onClick={() => {setPlaceTypeFilter('All'); setLocationFilter('All')}} className="text-brand-orange font-bold mt-2 hover:underline">Clear Filters</button>
                    </div>
                )}
             </div>
          </div>
        )}
        
        {/* Blog View */}
        {currentView === 'blog' && (
          <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
             {!expandedBlogId ? (
                 <>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl font-black text-brand-brown flex items-center gap-3">
                                <MessageCircle className="text-brand-orange" size={36}/> Petz Community Blog
                            </h2>
                            <p className="text-gray-500 mt-2 text-lg">Stories, tips, and laughs from the furmily.</p>
                        </div>
                        <Button onClick={() => setShowPublishModal(true)} className="shadow-lg flex items-center gap-2">
                            <PenTool size={18}/> Publish Your Story
                        </Button>
                    </div>

                    {/* Blog Filters */}
                    <div className="mb-10 flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                        {['All', 'Community', 'Guides', 'Events', 'Reviews', 'Recipes', 'Behavior', 'Travel', 'Health'].map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setBlogFilter(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${blogFilter === cat ? 'bg-brand-orange text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map(blog => (
                                <div key={blog.id} className="bg-white rounded-[2.5rem] p-5 hover:-translate-y-3 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer border border-transparent hover:border-brand-yellow/50 flex flex-col h-full" onClick={() => setExpandedBlogId(blog.id)}>
                                     <div className="h-48 rounded-[1.5rem] overflow-hidden mb-5 relative flex-shrink-0">
                                         <img src={blog.image} className="w-full h-full object-cover rounded-[1.5rem] transition duration-700 hover:scale-110"/>
                                         <span className="absolute top-3 left-3 text-xs font-bold bg-white/90 backdrop-blur text-brand-brown px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">{blog.category}</span>
                                     </div>
                                     
                                     <div className="flex items-center gap-2 mb-3 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                         <span>{blog.date}</span> • <span className="text-brand-orange">{blog.author}</span>
                                     </div>

                                     <h3 className="text-2xl font-black text-brand-brown mb-3 group-hover:text-brand-orange transition leading-tight">{blog.title}</h3>
                                     <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{blog.excerpt}</p>
                                     
                                     <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                                         <button 
                                            onClick={(e) => handleLikeBlog(blog.id, e)}
                                            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition group/like"
                                         >
                                             <Heart size={18} className={`transition ${blog.likes > 0 ? 'fill-red-500 text-red-500' : 'group-hover/like:scale-125'}`}/> 
                                             <span className="font-bold text-sm">{blog.likes}</span>
                                         </button>
                                         <span className="text-brand-orange font-extrabold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Read full story <ArrowRight size={14}/></span>
                                     </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 text-gray-400">
                                <p className="text-xl font-bold">No stories found in this category yet.</p>
                                <button onClick={() => setBlogFilter('All')} className="text-brand-orange font-bold mt-2 hover:underline">View All Stories</button>
                            </div>
                        )}
                    </div>
                 </>
             ) : (
                 <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8">
                     {(() => {
                         const blog = blogs.find(b => b.id === expandedBlogId);
                         if(!blog) return null;
                         return (
                             <div>
                                 <div className="h-80 md:h-96 relative">
                                     <img src={blog.image} className="w-full h-full object-cover"/>
                                     <button 
                                        onClick={() => setExpandedBlogId(null)}
                                        className="absolute top-6 left-6 bg-white/90 backdrop-blur p-3 rounded-full hover:bg-white transition shadow-lg"
                                     >
                                         <ArrowRight className="rotate-180 text-brand-brown" size={24}/>
                                     </button>
                                     <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent h-32"></div>
                                 </div>
                                 
                                 <div className="px-8 md:px-16 pb-16 -mt-20 relative">
                                     <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-50 mb-8">
                                         <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
                                             <span className="bg-brand-yellow/20 text-brand-brown px-3 py-1 rounded-lg">{blog.category}</span>
                                             <span>{blog.date}</span>
                                             <span>By {blog.author}</span>
                                         </div>
                                         <h1 className="text-4xl md:text-5xl font-black text-brand-brown mb-6 leading-tight">{blog.title}</h1>
                                         <div className="flex flex-wrap gap-2">
                                             {blog.tags.map(tag => (
                                                 <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-bold">#{tag}</span>
                                             ))}
                                         </div>
                                     </div>

                                     <div className="prose prose-lg prose-orange max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{__html: blog.content}}></div>

                                     <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                                         <div>
                                             <h4 className="font-bold text-brand-brown">Enjoyed this read?</h4>
                                             <p className="text-sm text-gray-400">Give it a paws up!</p>
                                         </div>
                                         <button 
                                            onClick={(e) => handleLikeBlog(blog.id, e)}
                                            className="bg-red-50 text-red-500 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-red-100 transition transform active:scale-95"
                                         >
                                             <ThumbsUp size={20} className={blog.likes > 0 ? "fill-current" : ""}/> {blog.likes} Likes
                                         </button>
                                     </div>
                                 </div>
                             </div>
                         );
                     })()}
                 </div>
             )}
          </div>
        )}
        
        {/* Shop View - USING NEW COMPONENT */}
        {currentView === 'shop' && (
            <ShopView />
        )}
        
        {/* User Profile View */}
        {currentView === 'profile' && userProfile && (
            <UserProfileView userProfile={userProfile} onEdit={() => setShowProfileForm(true)}/>
        )}

        {/* Contact View */}
        {currentView === 'contact' && (
            <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-brand-brown mb-4">Get in Touch</h2>
                    <p className="text-gray-600 text-lg">We'd love to hear from you! Choose how you want to connect.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Customer Service */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition duration-300 text-center">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                            <Headset size={40}/>
                        </div>
                        <h3 className="text-2xl font-bold text-brand-brown mb-4">Customer Service</h3>
                        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                            Have a question about the website, tools, or your profile? Our support team is here to help every pawrent.
                        </p>
                        <Button className="w-full bg-blue-600 border-blue-800 hover:bg-blue-700 shadow-blue-200">Contact Support</Button>
                    </div>

                    {/* Shop Vendor */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition duration-300 text-center">
                        <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-orange">
                            <ShoppingBag size={40}/>
                        </div>
                        <h3 className="text-2xl font-bold text-brand-brown mb-4">Join as Shop Vendor</h3>
                        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                            Sell your premium pet products on PetzPawradise Shop. Reach thousands of pet owners in Malaysia.
                        </p>
                        <Button className="w-full shadow-orange-200">Apply as Vendor</Button>
                    </div>

                    {/* Event Vendor */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition duration-300 text-center">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                            <Calendar size={40}/>
                        </div>
                        <h3 className="text-2xl font-bold text-brand-brown mb-4">Join Event Vendors</h3>
                        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                            Book a booth at our upcoming Bazaars and Pawties. Showcase your brand to a live crowd!
                        </p>
                        <Button className="w-full bg-purple-600 border-purple-800 hover:bg-purple-700 shadow-purple-200">Book a Booth</Button>
                    </div>
                </div>

                <div className="mt-20 bg-brand-brown text-white rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-4">Direct Contact</h3>
                        <p className="text-xl opacity-80 mb-8">You can also reach us directly via email or WhatsApp.</p>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <a href="mailto:hello@petzpawradise.my" className="bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/20 transition font-bold">
                                <Mail/> hello@petzpawradise.my
                            </a>
                            <a href="#" className="bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/20 transition font-bold">
                                <Phone/> +60 12-345 6789
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Tools View - List of all tools */}
        {currentView === 'tools' && (
            <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-700">
                <div className="text-center mb-16">
                    <div className="inline-block bg-blue-100 p-4 rounded-full mb-4 animate-bounce">
                        <Sparkles className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-5xl font-black text-brand-brown mb-6 flex items-center justify-center gap-3">
                        <Sparkles className="text-brand-orange" size={40}/> Paw-Some Magic! <Sparkles className="text-brand-orange" size={40}/>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-xl">
                        From finding the perfect event to calculating your pet's life stage, our AI tools are here to help you be the best pawrent!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {[
                        { id: 'ask-ai', icon: Bot, label: 'Ask Petz AI', desc: 'Your 24/7 general lifestyle assistant.', color: 'bg-brand-yellow', text: 'text-brand-brown' },
                        { id: 'meal', icon: Utensils, label: 'Smart Meal Planner', desc: 'Personalized portion suggestions & recipes.', color: 'bg-green-100', text: 'text-green-600' },
                        { id: 'event', icon: Heart, label: 'Event Matcher', desc: 'Find events that match your pet\'s vibe.', color: 'bg-pink-100', text: 'text-pink-600' },
                        { id: 'lifestage', icon: Calculator, label: 'Life Stage Calculator', desc: 'Convert pet age to human years.', color: 'bg-blue-100', text: 'text-blue-600' },
                        { id: 'name', icon: Sparkles, label: 'Name Generator', desc: 'Find the perfect name.', color: 'bg-purple-100', text: 'text-purple-600' },
                        { id: 'breed', icon: Dna, label: 'Breed Guide', desc: 'Learn about traits.' },
                        { id: 'translator', icon: MessageCircle, label: 'Pet Translator', desc: 'Decode body language & sounds.', color: 'bg-teal-100', text: 'text-teal-600' },
                        { id: 'treat', icon: ChefHat, label: 'DIY Treat Chef', desc: 'Turn pantry items into yummy treats.', color: 'bg-orange-100', text: 'text-orange-600' },
                        { id: 'training', icon: Trophy, label: 'Training Coach', desc: 'Step-by-step trick guides.', color: 'bg-blue-100', text: 'text-blue-600' },
                        { id: 'travel', icon: Map, label: 'Travel Planner', desc: 'Plan road trips & packing lists.', color: 'bg-green-100', text: 'text-green-600' },
                        { id: 'vet', icon: Stethoscope, label: 'Vet Visit Prep', desc: 'Checklists & questions for the vet.', color: 'bg-red-100', text: 'text-red-600' },
                        { id: 'compatibility', icon: HeartHandshake, label: 'Pet Compatibility', desc: 'Check if pets will get along.', color: 'bg-indigo-100', text: 'text-indigo-600' },
                        { id: 'budget', icon: Wallet, label: 'Budget Planner', desc: 'Manage your pet expenses wisely.', color: 'bg-green-100', text: 'text-green-700' },
                        { id: 'safety', icon: ShieldAlert, label: 'Safety Checker', desc: 'Check if food/plants are toxic.', color: 'bg-red-100', text: 'text-red-700' },
                        { id: 'name-analyzer', icon: Zap, label: 'Name Vibe Check', desc: 'Analyze name numerology & vibes.', color: 'bg-purple-100', text: 'text-purple-700' },
                     ].map((tool) => (
                         <div key={tool.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 hover:border-gray-300 transition-all cursor-pointer group hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden" onClick={() => openToolModal(tool.id as any)}>
                             <div className={`absolute top-0 right-0 w-32 h-32 ${tool.color} rounded-bl-full opacity-20 transition group-hover:scale-110`}></div>
                             <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition shadow-sm`}>
                                 <tool.icon className={`w-8 h-8 ${tool.text}`}/>
                             </div>
                             <h3 className="text-2xl font-bold text-brand-brown mb-2">{tool.label}</h3>
                             <p className="text-gray-500 mb-6">{tool.desc}</p>
                             <span className={`font-bold flex items-center ${tool.text} group-hover:underline`}>Launch Tool <ArrowRight className="w-4 h-4 ml-1"/></span>
                         </div>
                     ))}
                </div>
            </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-brand-brown text-white/80 py-16 mt-20 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-7xl mx-auto px-4 relative z-10">
             <div className="grid md:grid-cols-4 gap-12 mb-12">
                 <div className="col-span-1 md:col-span-2">
                     <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-2">
                        <span className="text-brand-red">Petz</span><span className="text-stroke-orange">Pawradise</span>
                     </h2>
                     <p className="text-lg leading-relaxed opacity-80 max-w-md">
                         The ultimate lifestyle hub for Malaysian pawrents. We make pet parenting fun, easy, and magical with the power of AI and community.
                     </p>
                 </div>
                 <div>
                     <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Explore</h3>
                     <ul className="space-y-4">
                         <li><button onClick={() => setCurrentView('events')} className="hover:text-brand-yellow transition">Events</button></li>
                         <li><button onClick={() => setCurrentView('places')} className="hover:text-brand-yellow transition">Pet-Friendly Places</button></li>
                         <li><button onClick={() => setCurrentView('tools')} className="hover:text-brand-yellow transition">AI Tools</button></li>
                         <li><button onClick={() => setCurrentView('blog')} className="hover:text-brand-yellow transition">Blog</button></li>
                         <li><button onClick={() => setCurrentView('contact')} className="hover:text-brand-yellow transition">Contact Us</button></li>
                     </ul>
                 </div>
                 <div>
                     <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Connect</h3>
                     <div className="flex gap-4 mb-6">
                         <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-brand-orange transition"><Instagram size={20}/></a>
                         <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-brand-orange transition"><Facebook size={20}/></a>
                     </div>
                     <p className="text-sm opacity-60">hello@petzpawradise.my</p>
                 </div>
             </div>
             <div className="border-t border-white/10 pt-8 text-center text-sm opacity-50">
                 &copy; 2024 PetzPawradise. Made with love for furkids.
             </div>
         </div>
      </footer>
    </div>
  );
};

// Simple Icon component for Contact section
const Headset = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>
);

export default App;
