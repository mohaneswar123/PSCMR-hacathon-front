import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AddBedShare(){
  const { addBedShare } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ bedCount:'', location:'', pricePerDay:'', phone:'', description:'' });
  const [msg, setMsg] = useState('');

  const update=(k,v)=>setForm(p=>({...p,[k]:v}))

  const onSubmit=async(e)=>{
    e.preventDefault(); setMsg('');
    try{
      await addBedShare({
        bedCount: Number(form.bedCount),
        location: form.location,
        pricePerDay: Number(form.pricePerDay),
        phone: form.phone,
        description: form.description,
      });
      setMsg('Bed share added');
      navigate('/bedshares');
    }catch{ setMsg('Failed to add bed share'); }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg border border-indigo-200 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-3">
              <span className="text-3xl">🛏️</span>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Share Your Space</h1>
              <p className="text-sm text-gray-600">Offer accommodation to travelers</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {msg && (
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-indigo-800 font-semibold">{msg}</p>
            </div>
          </div>
        )}

      <form className="bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden" onSubmit={onSubmit}>
        
        {/* Room Share Details Section */}
        <div className="p-8 border-b-2 border-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">🛏️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Room Share Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Number of Beds *
              </label>
              <input 
                required
                value={form.bedCount} 
                onChange={e=>update('bedCount',e.target.value)} 
                type="number" 
                min="1"
                placeholder="e.g., 2"
                className="w-full px-5 py-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Price per Day ($) *
              </label>
              <input 
                required
                value={form.pricePerDay} 
                onChange={e=>update('pricePerDay',e.target.value)} 
                type="number" 
                step="0.01"
                min="0"
                placeholder="e.g., 25.00"
                className="w-full px-5 py-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Location *
            </label>
            <input 
              required
              value={form.location} 
              onChange={e=>update('location',e.target.value)} 
              placeholder="Address or area name"
              className="w-full px-5 py-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="p-8 border-b-2 border-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">📞</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
          </div>
          
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Phone Number *
            </label>
            <input 
              required
              type="tel"
              value={form.phone} 
              onChange={e=>update('phone',e.target.value)} 
              placeholder="Your contact number"
              className="w-full px-5 py-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Additional Details</h3>
          </div>
          
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Description (Optional)
            </label>
            <textarea 
              value={form.description} 
              onChange={e=>update('description',e.target.value)} 
              rows={4} 
              placeholder="Add details like amenities, house rules, nearby facilities, etc..."
              className="w-full px-5 py-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400 resize-none"
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="p-8 pt-0">
          <button className="group/btn w-full relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
              <span>💾</span>
              <span>Save Room Share Listing</span>
              <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
