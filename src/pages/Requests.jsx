import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Requests(){
  const { user, getOwnerRequests, getMyRequests, setRequestStatus } = useApp();
  const [incoming,setIncoming]=useState([]);
  const [mine,setMine]=useState([]);
  const [loading,setLoading]=useState(true);
  const [showCancelled,setShowCancelled]=useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(()=>{(async()=>{
    try{
      const [a,b]=await Promise.all([
        getOwnerRequests(),
        getMyRequests(),
      ]);
      setIncoming(a||[]); setMine(b||[]);
    } finally { setLoading(false); }
  })()},[getOwnerRequests, getMyRequests]);

  const handleConfirmClick = (action, requestId, actionType, requesterName, itemType, itemId) => {
    setConfirmAction({
      action,
      requestId,
      actionType,
      requesterName,
      itemType,
      itemId
    });
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    try {
      await confirmAction.action();
    } finally {
      setShowConfirmModal(false);
      setConfirmAction(null);
    }
  };

  const onSet = async(id, value)=>{
    await setRequestStatus(id, value);
    // refresh incoming list only
    const updated = await getOwnerRequests();
    setIncoming(updated||[]);
  };

  const onCancel = async(id)=>{
    await setRequestStatus(id, 'CANCELLED');
    const updatedMine = await getMyRequests();
    setMine(updatedMine||[]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg border border-indigo-200 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-3">
              <span className="text-3xl">📋</span>
            </div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Request Center</h1>
          </div>
          <p className="text-gray-600 text-lg">Manage incoming and outgoing requests</p>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg font-semibold">Loading requests...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* INCOMING REQUESTS */}
            <section className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📥</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Incoming Requests
                    </h3>
                    <p className="text-green-100 text-sm">Owner: {user?.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {incoming.length===0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">📭</span>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">No incoming requests</p>
                    <p className="text-gray-400 text-sm mt-1">Requests from others will appear here</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {incoming.map(r=> (
                      <li key={r.id} className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl">
                        {/* Item Type Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full border border-green-300 shadow-sm">
                          <span className="text-xs font-bold text-green-700">{r.itemType}</span>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          {/* Request Info */}
                          <div className="pr-24">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                <span className="text-xl">#{r.itemId}</span>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-gray-900">Item #{r.itemId}</div>
                                <div className="text-xs text-gray-500">{r.itemType}</div>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-gray-700">From: <span className="font-semibold text-gray-900">{r.requester?.name}</span></span>
                              </div>
                              {r.requester?.phone && (
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  <span className="text-gray-700">{r.requester.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700">Status:</span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                  r.status === 'ACCEPTED' ? 'bg-green-100 text-green-700 border border-green-300' :
                                  r.status === 'REJECTED' ? 'bg-red-100 text-red-700 border border-red-300' :
                                  'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                }`}>{r.status}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button 
                              className="group/btn flex-1 relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0" 
                              disabled={r.status==='ACCEPTED'} 
                              onClick={()=>handleConfirmClick(
                                () => onSet(r.id,'ACCEPTED'),
                                r.id,
                                'ACCEPT',
                                r.requester?.name,
                                r.itemType,
                                r.itemId
                              )}
                            >
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Accept
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </button>
                            <button 
                              className="group/btn flex-1 relative overflow-hidden bg-white border-2 border-red-400 text-red-600 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0" 
                              disabled={r.status==='REJECTED'} 
                              onClick={()=>handleConfirmClick(
                                () => onSet(r.id,'REJECTED'),
                                r.id,
                                'REJECT',
                                r.requester?.name,
                                r.itemType,
                                r.itemId
                              )}
                            >
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Reject
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 text-white transform scale-x-0 group-hover/btn:scale-x-100 transition-all duration-300 origin-left"></div>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* MY REQUESTS */}
            <section className="bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📤</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        My Requests
                      </h3>
                      <p className="text-purple-100 text-sm">Requests you've sent</p>
                    </div>
                  </div>
                  
                  {/* Toggle Switch */}
                  <label className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full cursor-pointer hover:bg-white/30 transition-all">
                    <span className="text-white text-sm font-medium">Show cancelled</span>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={showCancelled} 
                        onChange={e=>setShowCancelled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/50"></div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-6">
                {mine.length===0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">📭</span>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">No requests sent yet</p>
                    <p className="text-gray-400 text-sm mt-1">Your outgoing requests will appear here</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {mine
                      .filter(r=> showCancelled ? true : r.status !== 'CANCELLED')
                      .map(r=> (
                      <li key={r.id} className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl">
                        {/* Item Type Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full border border-purple-300 shadow-sm">
                          <span className="text-xs font-bold text-purple-700">{r.itemType}</span>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          {/* Request Info */}
                          <div className="pr-24">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                <span className="text-xl">#{r.itemId}</span>
                              </div>
                              <div>
                                <div className="text-lg font-bold text-gray-900">Item #{r.itemId}</div>
                                <div className="text-xs text-gray-500">{r.itemType}</div>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-gray-700">Owner: <span className="font-semibold text-gray-900">{r.owner?.name}</span></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700">Status:</span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                  r.status === 'ACCEPTED' ? 'bg-green-100 text-green-700 border border-green-300' :
                                  r.status === 'CANCELLED' ? 'bg-gray-100 text-gray-600 border border-gray-300' :
                                  r.status === 'REJECTED' ? 'bg-red-100 text-red-700 border border-red-300' :
                                  'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                }`}>{r.status}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Cancel Button */}
                          <div>
                            <button
                              className="group/btn w-full relative overflow-hidden bg-white border-2 border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                              disabled={r.status==='CANCELLED' || r.status==='ACCEPTED'}
                              onClick={()=>handleConfirmClick(
                                () => onCancel(r.id),
                                r.id,
                                'CANCEL',
                                r.owner?.name,
                                r.itemType,
                                r.itemId
                              )}
                            >
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel Request
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 text-white transform scale-x-0 group-hover/btn:scale-x-100 transition-all duration-300 origin-left"></div>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform animate-scale-in">
            <div className="text-center">
              {/* Icon */}
              <div className={`w-20 h-20 bg-gradient-to-br ${
                confirmAction.actionType === 'ACCEPT' ? 'from-green-500 to-emerald-600' :
                confirmAction.actionType === 'REJECT' ? 'from-red-500 to-red-600' :
                'from-gray-500 to-gray-600'
              } rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-4xl">
                  {confirmAction.actionType === 'ACCEPT' ? '✅' :
                   confirmAction.actionType === 'REJECT' ? '❌' : '🚫'}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {confirmAction.actionType === 'ACCEPT' ? 'Accept Request?' :
                 confirmAction.actionType === 'REJECT' ? 'Reject Request?' :
                 'Cancel Request?'}
              </h3>

              {/* Message */}
              <p className="text-gray-600 mb-6">
                {confirmAction.actionType === 'ACCEPT' && (
                  <>
                    Are you sure you want to <strong>accept</strong> the request from <strong>{confirmAction.requesterName}</strong> for <strong>{confirmAction.itemType} #{confirmAction.itemId}</strong>?
                  </>
                )}
                {confirmAction.actionType === 'REJECT' && (
                  <>
                    Are you sure you want to <strong>reject</strong> the request from <strong>{confirmAction.requesterName}</strong> for <strong>{confirmAction.itemType} #{confirmAction.itemId}</strong>?
                  </>
                )}
                {confirmAction.actionType === 'CANCEL' && (
                  <>
                    Are you sure you want to <strong>cancel</strong> your request to <strong>{confirmAction.requesterName}</strong> for <strong>{confirmAction.itemType} #{confirmAction.itemId}</strong>?
                  </>
                )}
              </p>

              {/* Note */}
              <div className={`bg-${
                confirmAction.actionType === 'ACCEPT' ? 'green' :
                confirmAction.actionType === 'REJECT' ? 'red' : 'gray'
              }-50 border border-${
                confirmAction.actionType === 'ACCEPT' ? 'green' :
                confirmAction.actionType === 'REJECT' ? 'red' : 'gray'
              }-200 rounded-2xl p-4 mb-6`}>
                <p className={`text-sm text-${
                  confirmAction.actionType === 'ACCEPT' ? 'green' :
                  confirmAction.actionType === 'REJECT' ? 'red' : 'gray'
                }-800`}>
                  <strong>Note:</strong> {confirmAction.actionType === 'ACCEPT' ? 'The requester will be notified and can proceed with the arrangement.' :
                   confirmAction.actionType === 'REJECT' ? 'The requester will be notified that their request was declined.' :
                   'The owner will be notified that you are no longer interested.'}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setConfirmAction(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirmAction}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r ${
                    confirmAction.actionType === 'ACCEPT' ? 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' :
                    confirmAction.actionType === 'REJECT' ? 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' :
                    'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
                  } text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg`}
                >
                  {confirmAction.actionType === 'ACCEPT' ? 'Yes, Accept' :
                   confirmAction.actionType === 'REJECT' ? 'Yes, Reject' :
                   'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
