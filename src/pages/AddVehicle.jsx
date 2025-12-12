import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AddVehicle(){
  const { addVehicle } = useApp();
  const navigate = useNavigate();
  const [form,setForm]=useState({vehicleType:'',model:'',availableFrom:'',availableTo:'',pricePerHour:'',phone:'',description:''});
  const [msg,setMsg]=useState('');
  const up=(k,v)=>setForm(p=>({...p,[k]:v}))
  const onSubmit=async(e)=>{
    e.preventDefault(); setMsg('');
    try{
      await addVehicle({
        vehicleType: form.vehicleType,
        model: form.model,
        availableFrom: form.availableFrom,
        availableTo: form.availableTo,
        pricePerHour: Number(form.pricePerHour),
        phone: form.phone,
        description: form.description,
      });
      setMsg('Vehicle added');
      navigate('/vehicles');
    }catch{ setMsg('Failed to add vehicle'); }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg border border-blue-200 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center transform rotate-3">
              <span className="text-3xl">🚗</span>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Share Your Vehicle</h1>
              <p className="text-sm text-gray-600">Rent out when idle, earn extra income</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {msg && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-blue-800 font-semibold">{msg}</p>
            </div>
          </div>
        )}

      <form className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden" onSubmit={onSubmit}>
        
        {/* Vehicle Information Section */}
        <div className="p-8 border-b-2 border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">🚗</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Vehicle Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Vehicle Type *
              </label>
              <input className="w-full px-5 py-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400" 
                required
                value={form.vehicleType} 
                onChange={e=>up('vehicleType',e.target.value)} 
                placeholder="Car, Bike, Scooter, etc."
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Model/Brand *
              </label>
              <input className="w-full px-5 py-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400" 
                required
                value={form.model} 
                onChange={e=>up('model',e.target.value)} 
                placeholder="e.g., Honda City, Yamaha R15"
              />
            </div>
          </div>
        </div>

        {/* Availability Period Section */}
        <div className="p-8 border-b-2 border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Availability Period</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Available From *
              </label>
              <input className="w-full px-5 py-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900" 
                required
                type="datetime-local" 
                value={form.availableFrom} 
                onChange={e=>up('availableFrom',e.target.value)} 
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Available To *
              </label>
              <input className="w-full px-5 py-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900" 
                required
                type="datetime-local" 
                value={form.availableTo} 
                onChange={e=>up('availableTo',e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Pricing & Contact Section */}
        <div className="p-8 border-b-2 border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Pricing & Contact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Price per Hour ($) *
              </label>
              <input className="w-full px-5 py-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400" 
                required
                type="number" 
                step="0.01"
                min="0"
                value={form.pricePerHour} 
                onChange={e=>up('pricePerHour',e.target.value)} 
                placeholder="e.g., 15.00"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Contact Phone *
              </label>
              <input className="w-full px-5 py-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400" 
                required
                type="tel"
                value={form.phone} 
                onChange={e=>up('phone',e.target.value)} 
                placeholder="Your contact number"
              />
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Additional Details</h3>
          </div>
          
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Description (Optional)
            </label>
            <textarea className="w-full px-5 py-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400 resize-none" 
              rows={4} 
              value={form.description} 
              onChange={e=>up('description',e.target.value)} 
              placeholder="Add details like fuel type, seating capacity, condition, documents required, etc..."
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="p-8 pt-0">
          <button className="group/btn w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
              <span>💾</span>
              <span>Save Vehicle Listing</span>
              <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}
