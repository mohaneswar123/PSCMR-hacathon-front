import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDateRange } from '../utils/format';

export default function VehiclesList(){
  const { user, getAllVehicles, createRequest } = useApp();
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [msg,setMsg]=useState('');

  useEffect(()=>{(async()=>{
    // eslint-disable-next-line no-empty
    try{ const data = await getAllVehicles(); setItems(data||[]);}catch{} finally{setLoading(false)}})()},[getAllVehicles])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full border border-blue-200 mb-6">
            <span className="text-3xl">🚗</span>
            <span className="text-blue-700 font-semibold text-sm">Vehicle Sharing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Available Vehicles
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rent cars, bikes, and more from trusted community members
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Success Message */}
        {msg && (
          <div className="max-w-2xl mx-auto mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <p className="text-blue-800 font-semibold">{msg}</p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading vehicles...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Vehicles Available</h3>
            <p className="text-gray-600">Check back later for new listings</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(v => (
              <div
                key={v.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Badge */}
                <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 z-10">
                  <span className="text-2xl">🚗</span>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Vehicle Name */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">{v.vehicleType}</h3>
                    <p className="text-lg font-semibold text-gray-600">{v.model}</p>
                  </div>

                  {/* Availability */}
                  {(v.availableFrom || v.availableTo) && (
                    <div className="mb-6 bg-blue-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        <p className="text-xs text-blue-600 font-semibold uppercase">Availability</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{formatDateRange(v.availableFrom, v.availableTo)}</p>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
                    <p className="text-sm font-medium opacity-90 mb-1">Rental Rate</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black">₹{v.pricePerHour}</span>
                      <span className="text-lg font-semibold opacity-90">/hour</span>
                    </div>
                  </div>

                  {/* Description */}
                  {v.description && (
                    <div className="mb-6">
                      <p className="text-gray-600 leading-relaxed line-clamp-3">{v.description}</p>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span className="text-gray-700 font-semibold">{v.phone}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    className="group/btn w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                    disabled={!user || user?.id === v.owner?.id}
                    onClick={async () => {
                      try {
                        await createRequest({
                          itemId: v.id,
                          itemType: 'VEHICLE',
                          requester: { id: user.id },
                          owner: { id: v.owner?.id },
                        });
                        setMsg('Request sent successfully! 🎉');
                        setTimeout(() => setMsg(''), 3000);
                      } catch {
                        setMsg('Failed to send request. Please try again.');
                        setTimeout(() => setMsg(''), 3000);
                      }
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {!user || user?.id === v.owner?.id ? 'Not Available' : "I'm Interested"}
                      {user && user?.id !== v.owner?.id && (
                        <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
