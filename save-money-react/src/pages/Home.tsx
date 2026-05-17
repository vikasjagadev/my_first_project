import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Zap, Sparkles, Tag, Loader2, Check, X, Plus, Minus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import { useCartStore } from "../store/cartStore";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Groceries",
  "Mobiles",
  "Laptops",
  "Home Appliances",
  "Beauty",
  "Sports"
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayedCount, setDisplayedCount] = useState(24);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const { 
    items: cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getTotalItems, 
    getTotalPrice, 
    isOpen,
    toggleCart,
    setIsOpen
  } = useCartStore();
  
  const totalCartItems = getTotalItems();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    setDisplayedCount(24);
  }, [activeCategory]);

  const filteredProducts = activeCategory === "All" 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);
    
  const visibleProducts = filteredProducts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredProducts.length;

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white no-underline">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">SAVE<span className="text-primary">MONEY</span></span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Search through 10,000+ smart deals..."
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary w-5 h-5" />
              <span className="font-semibold text-primary">2,450 Coins</span>
            </div>
            <button 
              onClick={toggleCart}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors group border-none bg-transparent cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 group-hover:text-primary transition-colors text-white" />
              {totalCartItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalCartItems}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[11px] font-bold flex items-center justify-center rounded-full shadow-lg"
                >
                  {totalCartItems}
                </motion.span>
              )}
            </button>
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-emerald-300 rounded-full cursor-pointer border-2 border-primary/20"></div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            10,000+ Products Added
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8"
          >
            Why Pay <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">More?</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            The world's first AI-driven e-commerce platform that actively searches for price drops, applies coupons, and rewards you for every purchase.
          </motion.p>
        </div>
      </section>

      <section className="py-12 bg-card border-t border-white/5 min-h-[600px]">
        <div className="container mx-auto px-6">
          <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center gap-3 w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all border-none cursor-pointer ${
                    activeCategory === category 
                      ? "bg-primary text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-105" 
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3 m-0">
                <Zap className="text-primary w-8 h-8" />
                {activeCategory === "All" ? "Flash Sales" : `${activeCategory} Deals`}
              </h2>
              <p className="text-gray-400 mt-2 m-0">Showing {visibleProducts.length} of {filteredProducts.length} products</p>
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {visibleProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="bg-background rounded-2xl border border-white/5 overflow-hidden group relative flex flex-col"
                >
                  <div className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                  </div>
                  
                  <div className="h-56 relative overflow-hidden bg-white/5 shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-primary font-semibold tracking-wider uppercase mb-1">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-1 group-hover:text-primary transition-colors m-0">{product.name}</h3>
                    
                    <div className="flex items-end gap-3 mb-4 mt-auto">
                      <span className="text-2xl font-black text-white">₹{product.discountedPrice.toLocaleString('en-IN')}</span>
                      <span className="text-gray-500 line-through text-sm mb-1">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full">
                        <Tag className="w-3.5 h-3.5 text-primary" />
                        +{product.rewards} Coins
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 border-none cursor-pointer ${
                          addedProductId === product.id 
                            ? "bg-green-500 text-white" 
                            : "bg-white/10 hover:bg-primary text-white"
                        }`}
                      >
                        {addedProductId === product.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <ShoppingCart className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {hasMore && (
            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => setDisplayedCount(prev => prev + 24)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 text-white cursor-pointer"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                Load More Products
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-background/50">
                <h2 className="text-2xl font-bold flex items-center gap-3 m-0">
                  <ShoppingCart className="text-primary w-6 h-6" />
                  Your Cart
                </h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors border-none bg-transparent cursor-pointer"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Your cart is empty.</p>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="mt-6 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition-colors border-none cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-background p-3 rounded-2xl border border-white/5">
                      <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold line-clamp-1 text-sm m-0">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-400 transition-colors border-none bg-transparent cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-primary font-bold mt-1">₹{item.discountedPrice.toLocaleString('en-IN')}</div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                            <Tag className="w-3 h-3 text-primary" />
                            +{item.rewards * item.quantity}
                          </div>
                          <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border-none bg-transparent text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border-none bg-transparent text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-background/80 backdrop-blur-md">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Estimated Shipping</span>
                      <span className="text-primary font-medium">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl pt-3 border-t border-white/10">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] border-none cursor-pointer transition-all"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
