import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/format';

export default function FoodOffersList(){
  const { user, getAllFoodOffers, createRequest } = useApp();
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [msg,setMsg]=useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(()=>{(async()=>{
    // eslint-disable-next-line no-empty
    try{ const data = await getAllFoodOffers(); setItems(data||[]);}catch{} finally{setLoading(false)}})()},[getAllFoodOffers])
  
  const handleInterestClick = (item) => {
    setSelectedItem(item);
    setShowConfirmModal(true);
  };

  const handleConfirmRequest = async () => {
    try {
      await createRequest({
        itemId: selectedItem.id,
        itemType: 'FOOD_OFFER',
        requester: { id: user.id },
        owner: { id: selectedItem.owner?.id },
      });
      setMsg('Request sent successfully! 🎉');
      setTimeout(() => setMsg(''), 3000);
    } catch {
      setMsg('Failed to send request. Please try again.');
      setTimeout(() => setMsg(''), 3000);
    } finally {
      setShowConfirmModal(false);
      setSelectedItem(null);
    }
  };
  
  const getCategoryEmoji = (category) => {
    const map = {
      groceries: '🥬',
      electronics: '📱',
      cosmetics: '💄',
      bakery: '🍞',
      dairy: '🥛',
      other: '🏪'
    };
    return map[category?.toLowerCase()] || '🏪';
  };

  const getCategoryColor = (category) => {
    const map = {
      groceries: 'from-green-400 to-emerald-500',
      electronics: 'from-blue-400 to-cyan-500',
      cosmetics: 'from-pink-400 to-rose-500',
      bakery: 'from-yellow-400 to-orange-500',
      dairy: 'from-cyan-400 to-blue-500',
      other: 'from-purple-400 to-indigo-500'
    };
    return map[category?.toLowerCase()] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 px-6 py-3 rounded-full border border-orange-200 mb-6">
            <span className="text-3xl">🛒</span>
            <span className="text-orange-700 font-semibold text-sm">Food Offers</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
              Amazing Deals
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get incredible discounts on quality items nearing expiry. Save money, reduce waste!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Success Message */}
        {msg && (
          <div className="max-w-2xl mx-auto mb-8 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <p className="text-green-800 font-semibold">{msg}</p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading offers...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Offers Available</h3>
            <p className="text-gray-600">Check back later for new deals</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(offer => (
              <div
                key={offer.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-md">
                    <span className="text-xl">{getCategoryEmoji(offer.category)}</span>
                    <span className="text-sm font-bold text-gray-700 capitalize">{offer.category}</span>
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2.5 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <p className="text-xl font-black">{offer.discountPercentage}% OFF</p>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 pt-24">
                  {/* Item Name */}
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{offer.itemName}</h3>

                  {/* Shop Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-xl">🏪</span>
                      <span className="font-bold">{offer.shopName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-lg">📍</span>
                      <span className="text-sm font-medium">{offer.shopLocation}</span>
                    </div>
                  </div>

                  {/* Expiry Alert */}
                  {offer.expiryDate && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                        <div>
                          <p className="text-xs text-red-600 font-semibold uppercase">Expires On</p>
                          <p className="text-sm font-bold text-red-700">{formatDate(offer.expiryDate)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="mb-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium line-through opacity-75">₹{offer.originalPrice}</span>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <p className="text-xs font-bold">Save ₹{offer.originalPrice - offer.discountedPrice}</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black">₹{offer.discountedPrice}</span>
                      <span className="text-sm font-semibold opacity-90">only!</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6 flex items-center gap-3 bg-gray-50 rounded-xl p-4 group-hover:bg-white transition-colors duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(offer.category)} rounded-xl flex items-center justify-center shadow-md`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Available Quantity</p>
                      <p className="text-lg font-black text-gray-900">{offer.quantity} units</p>
                    </div>
                  </div>

                  {/* Description */}
                  {offer.description && (
                    <div className="mb-6">
                      <p className="text-gray-600 leading-relaxed line-clamp-2">{offer.description}</p>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span className="text-gray-700 font-semibold">{offer.phone}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    className="group/btn w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                    disabled={!user || user?.id === offer.owner?.id}
                    onClick={() => handleInterestClick(offer)}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {!user || user?.id === offer.owner?.id ? 'Not Available' : 'Grab This Deal'}
                      {user && user?.id !== offer.owner?.id && (
                        <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform animate-scale-in">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">{getCategoryEmoji(selectedItem.category)}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Confirm Interest</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to request this <span className="font-semibold text-gray-900">{selectedItem.itemName}</span> at <span className="text-green-600 font-bold">₹{selectedItem.discountedPrice}</span>?
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-orange-800">
                    <strong>Note:</strong> The shop owner will be notified and will contact you for pickup details.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowConfirmModal(false); setSelectedItem(null); }}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRequest}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
