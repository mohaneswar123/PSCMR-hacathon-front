import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDateTime } from '../utils/format';

export default function TicketsList(){
  const { user, getAllTickets, createRequest } = useApp();
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [msg,setMsg]=useState('');

  useEffect(()=>{(async()=>{
    try{ const data = await getAllTickets(); setItems(data||[]);}catch{} finally{setLoading(false)}})()},[])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-50 px-6 py-3 rounded-full border border-purple-200 mb-6">
            <span className="text-3xl">🎟️</span>
            <span className="text-purple-700 font-semibold text-sm">Event Tickets</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Available Tickets
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Buy or sell event tickets safely within your community
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Success Message */}
        {msg && (
          <div className="max-w-2xl mx-auto mb-8 bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <p className="text-purple-800 font-semibold">{msg}</p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading tickets...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎟️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Tickets Available</h3>
            <p className="text-gray-600">Check back later for new listings</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(t => (
              <div
                key={t.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Badge */}
                <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 z-10">
                  <span className="text-2xl">🎟️</span>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Event Name */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{t.eventName}</h3>
                  </div>

                  {/* Event Date */}
                  {t.eventDate && (
                    <div className="mb-6 bg-purple-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        <p className="text-xs text-purple-600 font-semibold uppercase">Event Date</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{formatDateTime(t.eventDate)}</p>
                    </div>
                  )}

                  {/* Ticket Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 group-hover:bg-white transition-colors duration-300">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Available Tickets</p>
                        <p className="text-sm font-bold text-gray-900">{t.quantity} tickets</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
                      <p className="text-sm font-medium opacity-90 mb-1">Price Per Ticket</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black">₹{t.pricePerTicket}</span>
                        <span className="text-lg font-semibold opacity-90">/ticket</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {t.description && (
                    <div className="mb-6">
                      <p className="text-gray-600 leading-relaxed line-clamp-3">{t.description}</p>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span className="text-gray-700 font-semibold">{t.phone}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    className="group/btn w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                    disabled={!user || user?.id === t.owner?.id}
                    onClick={async () => {
                      try {
                        await createRequest({
                          itemId: t.id,
                          itemType: 'TICKET',
                          requester: { id: user.id },
                          owner: { id: t.owner?.id },
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
                      {!user || user?.id === t.owner?.id ? 'Not Available' : "I'm Interested"}
                      {user && user?.id !== t.owner?.id && (
                        <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
