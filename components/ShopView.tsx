
import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles, ShoppingCart, Heart, X, Info, Plus, Minus, Trash2, CheckCircle, ChevronRight, Tag } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_PARTNERS } from '../constants';
import { Product } from '../types';
import Button from './Button';

// Local interface for Cart Item
interface CartItem {
  uniqueId: string; // Combined ID (productId + variant)
  productId: string;
  name: string;
  variantSize: string;
  price: number;
  image: string;
  quantity: number;
}

const ShopView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiFilter, setAiFilter] = useState<string | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  
  // --- CART STATE ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load from local storage if available
    const saved = localStorage.getItem('petz_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({}); // productId -> variantIndex
  const [showToast, setShowToast] = useState<string | null>(null); // Stores name of added item

  // Persist cart
  useEffect(() => {
    localStorage.setItem('petz_cart', JSON.stringify(cart));
  }, [cart]);

  // --- CART ACTIONS ---
  
  const getSelectedVariantIndex = (productId: string) => selectedVariants[productId] || 0;

  const addToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    const variantIndex = getSelectedVariantIndex(product.id);
    const variant = product.variants[variantIndex];
    const uniqueId = `${product.id}-${variant.size}`;

    setCart(prev => {
      const existing = prev.find(item => item.uniqueId === uniqueId);
      if (existing) {
        return prev.map(item => item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        uniqueId,
        productId: product.id,
        name: product.name,
        variantSize: variant.size,
        price: variant.price,
        image: product.image,
        quantity: 1
      }];
    });

    // Trigger Toast
    setShowToast(`${product.name} (${variant.size})`);
    setTimeout(() => setShowToast(null), 3000);
  };

  const updateQuantity = (uniqueId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.uniqueId === uniqueId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (uniqueId: string) => {
    setCart(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- FILTER LOGIC ---

  const handleAiMatch = (need: string) => {
    setAiFilter(need);
    setSearchQuery(''); 
  };

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      let matchesAi = true;
      if (aiFilter) {
        const lowerFilter = aiFilter.toLowerCase();
        if (lowerFilter.includes('chew')) matchesAi = product.category === 'Chews';
        else if (lowerFilter.includes('joint')) matchesAi = product.benefits.some(b => b.includes('Joint'));
        else if (lowerFilter.includes('sensitive')) matchesAi = product.tags.includes('Hypoallergenic');
        else if (lowerFilter.includes('skin')) matchesAi = product.tags.includes('Skin') || product.tags.includes('Seafood');
        else if (lowerFilter.includes('train')) matchesAi = product.tags.includes('Training');
      }

      return matchesCategory && matchesSearch && matchesAi;
    });
  }, [activeCategory, searchQuery, aiFilter]);

  return (
    <div className="min-h-screen bg-brand-cream animate-in fade-in duration-700 relative">
      
      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed top-24 right-4 z-[60] bg-brand-brown text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300">
          <div className="bg-green-500 rounded-full p-1"><CheckCircle size={16} className="text-white"/></div>
          <div>
            <p className="font-bold text-sm">Added to Basket!</p>
            <p className="text-xs text-white/70">{showToast}</p>
          </div>
        </div>
      )}

      {/* CART DRAWER OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 bg-brand-cream border-b border-brand-orange/10 flex items-center justify-between">
              <h2 className="text-2xl font-black text-brand-brown flex items-center gap-2">
                <ShoppingBag className="text-brand-orange"/> My Basket
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white rounded-full transition text-gray-500">
                <X size={24}/>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                  <ShoppingCart size={64} className="opacity-20"/>
                  <p className="font-bold text-lg">Your basket is empty</p>
                  <p className="text-sm max-w-[200px]">Looks like you haven't found the purr-fect treats yet.</p>
                  <Button variant="outline" onClick={() => setIsCartOpen(false)}>Start Shopping</Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.uniqueId} className="flex gap-4 bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-brand-brown leading-tight">{item.name}</h4>
                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md inline-block mt-1">{item.variantSize}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="font-black text-brand-orange">RM {(item.price * item.quantity).toFixed(2)}</div>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.uniqueId, -1)} className="p-1 hover:bg-white rounded-md shadow-sm transition"><Minus size={12}/></button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.uniqueId, 1)} className="p-1 hover:bg-white rounded-md shadow-sm transition"><Plus size={12}/></button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.uniqueId)} className="text-gray-300 hover:text-red-500 self-start"><Trash2 size={16}/></button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-gray-500 font-bold">Subtotal</span>
                 <span className="text-2xl font-black text-brand-brown">RM {cartTotal.toFixed(2)}</span>
               </div>
               <p className="text-xs text-gray-400 mb-6 text-center">Shipping calculated at checkout</p>
               <Button 
                 className="w-full py-4 text-lg flex justify-center items-center gap-2 shadow-xl" 
                 disabled={cart.length === 0}
                 onClick={() => alert("Proceeding to checkout gateway...")}
               >
                 Checkout Now <ChevronRight size={20}/>
               </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section: The Pantry */}
      <div className="relative bg-brand-brown text-brand-cream overflow-hidden pt-32 pb-20 px-4 rounded-b-[3rem] shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
              {/* Updated Headline */}
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white leading-tight">
                  <span className="text-brand-red inline-block mr-2 drop-shadow-lg">Petz</span>
                  <span className="text-stroke-orange text-white inline-block mr-4 drop-shadow-lg">Pawradise</span>
                  <span className="text-white inline-block">Shop</span>
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto font-light mb-10">
                  Single-ingredient dehydrated treats, natural chews, and superfood supplements. 
                  <br/> <span className="font-bold text-brand-yellow">100% Real Food. No Nasties.</span>
              </p>

              {/* AI Smart Filter Bar */}
              <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-xl flex flex-col md:flex-row items-center gap-2 transform translate-y-8">
                  <div className="flex-1 w-full relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setAiFilter(null); }}
                        placeholder="Search treats, chews..." 
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-none outline-none font-bold text-brand-brown placeholder-gray-300"
                      />
                  </div>
                  <div className="hidden md:block w-px h-8 bg-gray-200"></div>
                  <div className="w-full md:w-auto flex gap-2 overflow-x-auto pb-2 md:pb-0 px-2 md:px-0 scrollbar-hide">
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-400 whitespace-nowrap uppercase tracking-wider mr-1">
                          <Sparkles size={12} className="text-brand-yellow"/> Quick Find:
                      </span>
                      <button onClick={() => handleAiMatch('Dental Chews')} className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs font-bold transition ${aiFilter === 'Dental Chews' ? 'bg-brand-brown text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🦷 Dental</button>
                      <button onClick={() => handleAiMatch('Joint Support')} className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs font-bold transition ${aiFilter === 'Joint Support' ? 'bg-brand-brown text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🦴 Joints</button>
                      <button onClick={() => handleAiMatch('Sensitive Tummy')} className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs font-bold transition ${aiFilter === 'Sensitive Tummy' ? 'bg-brand-brown text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🌿 Sensitive</button>
                  </div>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
          {/* Category Tabs & Cart Trigger */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <div className="flex flex-wrap justify-center gap-2">
                  {['All', 'Treats', 'Chews', 'Supplements'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setAiFilter(null); }}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                            activeCategory === cat 
                            ? 'bg-brand-orange text-white shadow-lg scale-105' 
                            : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                        }`}
                      >
                          {cat}
                      </button>
                  ))}
              </div>
              
              {/* Cart Trigger */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="bg-white p-3 rounded-xl shadow-md flex items-center gap-3 border border-gray-100 group hover:border-brand-orange transition relative overflow-visible"
              >
                  <div className="relative">
                      <ShoppingCart className="text-brand-brown group-hover:text-brand-orange transition" />
                      {cartCount > 0 && (
                          <span className="absolute -top-3 -right-3 bg-brand-red text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce shadow-sm border-2 border-white">
                              {cartCount}
                          </span>
                      )}
                  </div>
                  <span className="font-bold text-brand-brown text-sm hidden md:block">My Basket</span>
                  <span className="font-bold text-brand-orange text-sm bg-orange-50 px-2 py-0.5 rounded-md ml-1">RM {cartTotal.toFixed(2)}</span>
              </button>
          </div>

          {/* Active Filter Display */}
          {aiFilter && (
              <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up">
                  <span className="text-gray-500 text-sm font-medium">Showing results for:</span>
                  <span className="bg-brand-yellow/20 text-brand-brown px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">
                      <Sparkles size={14} /> {aiFilter}
                      <button onClick={() => setAiFilter(null)} className="hover:bg-black/10 rounded-full p-0.5"><X size={12}/></button>
                  </span>
              </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
              {filteredProducts.map((product) => {
                  const currentVariantIndex = getSelectedVariantIndex(product.id);
                  const currentVariant = product.variants[currentVariantIndex];
                  
                  return (
                    <div 
                        key={product.id} 
                        className={`bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl group relative flex flex-col ${expandedProductId === product.id ? 'ring-4 ring-brand-orange/30 z-10 scale-[1.02]' : 'hover:-translate-y-2'}`}
                    >
                        {/* Image Area */}
                        <div className="h-64 relative overflow-hidden bg-gray-50 cursor-pointer" onClick={() => setExpandedProductId(expandedProductId === product.id ? null : product.id)}>
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                            
                            {/* Floating Tags */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.tags.includes('Hypoallergenic') && (
                                    <span className="bg-white/90 backdrop-blur text-green-600 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">Sensitive Safe</span>
                                )}
                                {product.category === 'Chews' && (
                                    <span className="bg-white/90 backdrop-blur text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">Long Lasting</span>
                                )}
                            </div>

                            <button className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full text-gray-500 hover:text-red-500 transition backdrop-blur-sm">
                                <Heart size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-black text-brand-brown text-xl leading-tight cursor-pointer hover:text-brand-orange transition" onClick={() => setExpandedProductId(expandedProductId === product.id ? null : product.id)}>
                                    {product.name}
                                </h3>
                            </div>
                            
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-gray-400 text-xs font-bold">price</span>
                                <span className="text-brand-orange font-black text-xl">RM {currentVariant.price.toFixed(2)}</span>
                            </div>

                            {/* Size Selection (Always Visible) */}
                            <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 mb-4">
                                <div className="flex gap-2">
                                    {product.variants.map((v, idx) => (
                                        <button 
                                            key={idx} 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedVariants(prev => ({...prev, [product.id]: idx}));
                                            }}
                                            className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-bold transition text-center border ${
                                                currentVariantIndex === idx 
                                                ? 'bg-white border-brand-orange text-brand-orange shadow-sm' 
                                                : 'bg-transparent border-transparent text-gray-500 hover:bg-white hover:shadow-sm'
                                            }`}
                                        >
                                            {v.size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedProductId === product.id && (
                                <div className="animate-in fade-in slide-in-from-top-2 mb-4 text-sm">
                                    <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                                    
                                    <div className="mb-4">
                                        <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2 flex items-center gap-1"><Tag size={12}/> Benefits</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {product.benefits.map((benefit, idx) => (
                                                <span key={idx} className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-bold border border-green-100">
                                                    {benefit}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-auto flex gap-2">
                                <button 
                                    onClick={() => setExpandedProductId(expandedProductId === product.id ? null : product.id)}
                                    className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-brand-brown transition"
                                    title="View Details"
                                >
                                    <Info size={20} />
                                </button>
                                <Button 
                                    onClick={(e) => addToCart(e, product)} 
                                    className="flex-1 py-3 shadow-lg shadow-orange-100 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                                >
                                    <ShoppingCart size={18} /> Add
                                </Button>
                            </div>
                        </div>
                    </div>
                  );
              })}
          </div>

          {/* Partners Section in Shop */}
          <div className="border-t border-gray-100 pt-12">
                <div className="text-center mb-8">
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Our Community</span>
                    <h3 className="text-2xl font-black text-brand-brown mt-3">Trusted Partners</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {MOCK_PARTNERS.filter(p => p.type === 'Brand' || p.type === 'Venue').map(partner => (
                        <div key={partner.id} className="w-24 md:w-32 text-center group">
                            <div className="w-full h-20 bg-white rounded-xl flex items-center justify-center shadow-sm mb-2 group-hover:shadow-md transition p-2 border border-gray-100">
                                <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain"/>
                            </div>
                            <span className="text-xs font-bold text-gray-400 group-hover:text-brand-orange transition">{partner.name}</span>
                        </div>
                    ))}
                </div>
          </div>
      </div>
    </div>
  );
};

export default ShopView;
