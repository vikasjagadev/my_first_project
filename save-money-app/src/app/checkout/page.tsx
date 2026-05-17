"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, DollarSign, Truck, Zap, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { items, getTotalPrice, getTotalRewards } = useCartStore();
  const router = useRouter();

  const totalPrice = getTotalPrice();
  const totalRewards = getTotalRewards();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8">Add some items to your cart before proceeding to checkout.</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-primary px-8 py-3 rounded-full font-bold hover:bg-primary-hover transition-colors"
        >
          Go Back Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Simple Header */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Shop</span>
          </Link>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-primary w-5 h-5" />
            <span className="font-medium text-sm">Secure Checkout</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 mt-12 max-w-6xl">
        <h1 className="text-4xl font-bold mb-10 flex items-center gap-3">
          <Zap className="text-primary w-8 h-8" /> Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Order Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Order Summary</h2>
            <div className="space-y-4 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <div className="text-sm text-gray-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-bold text-lg">
                    ₹{(item.discountedPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-primary">Free</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Taxes</span>
                <span>Calculated at next step</span>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-between font-bold text-2xl">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="mt-4 bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
                <span className="text-primary font-medium">Coins to be earned:</span>
                <span className="text-primary font-bold">+{totalRewards} Coins</span>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Methods */}
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Payment Method</h2>
            
            <div className="space-y-4">
              <label 
                className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')}
                  className="w-5 h-5 accent-primary"
                />
                <div className="flex-1">
                  <div className="font-bold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-400" /> Credit / Debit Card
                  </div>
                </div>
              </label>

              <label 
                className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="upi" 
                  checked={paymentMethod === 'upi'} 
                  onChange={() => setPaymentMethod('upi')}
                  className="w-5 h-5 accent-primary"
                />
                <div className="flex-1">
                  <div className="font-bold flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-gray-400" /> UPI (Google Pay, PhonePe, Paytm)
                  </div>
                </div>
              </label>

              <label 
                className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'paypal' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="paypal" 
                  checked={paymentMethod === 'paypal'} 
                  onChange={() => setPaymentMethod('paypal')}
                  className="w-5 h-5 accent-primary"
                />
                <div className="flex-1">
                  <div className="font-bold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-400" /> PayPal
                  </div>
                </div>
              </label>

              <label 
                className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')}
                  className="w-5 h-5 accent-primary"
                />
                <div className="flex-1">
                  <div className="font-bold flex items-center gap-2">
                    <Truck className="w-5 h-5 text-gray-400" /> Cash on Delivery
                  </div>
                </div>
              </label>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert(`Payment processing for ${paymentMethod} initiated! (This is a prototype)`)}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl mt-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-3"
            >
              <ShieldCheck className="w-6 h-6" />
              Pay ₹{totalPrice.toLocaleString('en-IN')} Securely
            </motion.button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
