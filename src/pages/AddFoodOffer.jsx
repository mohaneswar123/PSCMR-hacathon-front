import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AddFoodOffer(){
  const { addFoodOffer } = useApp();
  const navigate = useNavigate();
  const [form,setForm]=useState({
    itemName:'',
    category:'',
    shopName:'',
    shopLocation:'',
    expiryDate:'',
    originalPrice:'',
    discountPercentage:'',
    quantity:'',
    phone:'',
    description:''
  });
  const [msg,setMsg]=useState('');
  const up=(k,v)=>setForm(p=>({...p,[k]:v}))
  
  const calculateDiscountedPrice = () => {
    const original = Number(form.originalPrice) || 0;
    const discount = Number(form.discountPercentage) || 0;
    return (original - (original * discount / 100)).toFixed(2);
  };

  const onSubmit=async(e)=>{
    e.preventDefault(); setMsg('');
    try{
      const discountedPrice = calculateDiscountedPrice();
      await addFoodOffer({
        itemName: form.itemName,
        category: form.category,
        shopName: form.shopName,
        shopLocation: form.shopLocation,
        expiryDate: form.expiryDate,
        originalPrice: Number(form.originalPrice),
        discountPercentage: Number(form.discountPercentage),
        discountedPrice: Number(discountedPrice),
        quantity: Number(form.quantity),
        phone: form.phone,
        description: form.description,
      });
      setMsg('Food offer added');
      navigate('/foodoffers');
    }catch{ setMsg('Failed to add food offer'); }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg border border-orange-200 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center transform rotate-3">
              <span className="text-3xl">🍽️</span>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Share Food Offers</h1>
              <p className="text-sm text-gray-600">Reduce waste with discounted items</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {msg && (
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-orange-800 font-semibold">{msg}</p>
            </div>
          </div>
        )}

      <form className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden" onSubmit={onSubmit}>
        
        {/* Item Details Section */}
        <div className="p-8 border-b-2 border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">📦</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Item Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Item Name *
              </label>
              <input 
                required 
                value={form.itemName} 
                onChange={e=>up('itemName',e.target.value)} 
                placeholder="e.g., Fresh Apples, LED TV, Face Cream"
                className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Category *
              </label>
              <select required value={form.category} onChange={e=>up('category',e.target.value)} className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900">
                <option value="">Select category</option>
                <option value="groceries">🥬 Groceries</option>
                <option value="electronics">📱 Electronics</option>
                <option value="cosmetics">💄 Cosmetics</option>
                <option value="bakery">🍞 Bakery</option>
                <option value="dairy">🥛 Dairy</option>
                <option value="other">🏪 Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shop Information Section */}
        <div className="p-8 border-b-2 border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">🏪</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Shop Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Shop Name *
              </label>
              <input 
                required 
                value={form.shopName} 
                onChange={e=>up('shopName',e.target.value)} 
                placeholder="Your shop name"
                className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Shop Location *
              </label>
              <input 
                required 
                value={form.shopLocation} 
                onChange={e=>up('shopLocation',e.target.value)} 
                placeholder="Shop address or area"
                className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Contact Phone *
            </label>
            <input 
              required 
              type="tel"
              value={form.phone} 
              onChange={e=>up('phone',e.target.value)} 
              placeholder="Shop contact number"
              className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Pricing & Availability Section */}
        <div className="p-8 border-b-2 border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Pricing & Availability</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Original Price (₹) *
              </label>
              <input 
                required 
                type="number" 
                step="0.01" 
                min="0"
                value={form.originalPrice} 
                onChange={e=>up('originalPrice',e.target.value)} 
                placeholder="10.00"
                className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Discount (%) *
              </label>
              <input 
                required 
                type="number" 
                step="0.01" 
                min="0"
                max="100"
                value={form.discountPercentage} 
                onChange={e=>up('discountPercentage',e.target.value)} 
                placeholder="50"
                className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {form.originalPrice && form.discountPercentage && (
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 mb-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-700">Final Price:</span>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">₹{calculateDiscountedPrice()}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-green-700 font-semibold">You save: ₹{(Number(form.originalPrice) - Number(calculateDiscountedPrice())).toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Expiry Date *
              </label>
              <input 
                required 
                type="date" 
                value={form.expiryDate} 
                onChange={e=>up('expiryDate',e.target.value)} 
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Quantity Available *
              </label>
              <input 
                required 
                type="number" 
                min="1"
                value={form.quantity} 
                onChange={e=>up('quantity',e.target.value)} 
                placeholder="Available units"
                className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
          </div>
          
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Description (Optional)
            </label>
            <textarea 
              rows={4} 
              value={form.description} 
              onChange={e=>up('description',e.target.value)} 
              placeholder="Add details about the item, packaging, pickup instructions, etc..."
              className="w-full px-5 py-3.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400 resize-none"
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="p-8 pt-0">
          <button className="group/btn w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
              <span>💾</span>
              <span>Save Food Offer Listing</span>
              <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}
