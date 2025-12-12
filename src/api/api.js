import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users
export const api = {
  // Auth
  register: (user) => http.post('/api/users/register', user).then(r => r.data),
  login: (payload) => http.post('/api/users/login', payload).then(r => r.data),
  getUser: (id) => http.get(`/api/users/${id}`).then(r => r.data),

  // Fields (spelled Feild in backend)
  addField: (ownerId, data) => http.post(`/api/feild/add/${ownerId}`, data).then(r => r.data),
  getField: (id) => http.get(`/api/feild/get/${id}`).then(r => r.data),
  getAllFields: () => http.get('/api/feild/all').then(r => r.data),
  getFieldsByOwner: (ownerId) => http.get(`/api/feild/owner/${ownerId}`).then(r => r.data),
  updateField: (id, data) => http.put(`/api/feild/update/${id}`, data).then(r => r.data),
  deleteField: (id) => http.delete(`/api/feild/delete/${id}`).then(r => r.data),

  // Vehicles
  addVehicle: (ownerId, data) => http.post(`/api/vehicles`, data, { params: { ownerId } }).then(r => r.data),
  getAllVehicles: () => http.get('/api/vehicles').then(r => r.data),
  getVehicle: (id) => http.get(`/api/vehicles/${id}`).then(r => r.data),
  getVehiclesByOwner: (ownerId) => http.get(`/api/vehicles/owner/${ownerId}`).then(r => r.data),
  updateVehicle: (id, data) => http.put(`/api/vehicles/${id}`, data).then(r => r.data),
  deleteVehicle: (id) => http.delete(`/api/vehicles/${id}`).then(r => r.data),

  // Food Offers
  addFoodOffer: (ownerId, data) => http.post(`/api/foodoffers`, data, { params: { ownerId } }).then(r => r.data),
  getAllFoodOffers: () => http.get('/api/foodoffers').then(r => r.data),
  getFoodOffer: (id) => http.get(`/api/foodoffers/${id}`).then(r => r.data),
  getFoodOffersByOwner: (ownerId) => http.get(`/api/foodoffers/owner/${ownerId}`).then(r => r.data),
  updateFoodOffer: (id, data) => http.put(`/api/foodoffers/${id}`, data).then(r => r.data),
  deleteFoodOffer: (id) => http.delete(`/api/foodoffers/${id}`).then(r => r.data),

  // Tickets
  addTicket: (ownerId, data) => http.post(`/api/tickets`, data, { params: { ownerId } }).then(r => r.data),
  getAllTickets: () => http.get('/api/tickets').then(r => r.data),
  getTicket: (id) => http.get(`/api/tickets/${id}`).then(r => r.data),
  getTicketsByOwner: (ownerId) => http.get(`/api/tickets/owner/${ownerId}`).then(r => r.data),
  updateTicket: (id, data) => http.put(`/api/tickets/${id}`, data).then(r => r.data),
  deleteTicket: (id) => http.delete(`/api/tickets/${id}`).then(r => r.data),

  // Bed Shares
  addBedShare: (ownerId, data) => http.post(`/api/bedshare/add/${ownerId}`, data).then(r => r.data),
  getAllBedShares: () => http.get('/api/bedshare/all').then(r => r.data),
  getBedShare: (id) => http.get(`/api/bedshare/get/${id}`).then(r => r.data),
  getBedSharesByOwner: (ownerId) => http.get(`/api/bedshare/owner/${ownerId}`).then(r => r.data),
  updateBedShare: (id, data) => http.put(`/api/bedshare/update/${id}`, data).then(r => r.data),
  deleteBedShare: (id) => http.delete(`/api/bedshare/delete/${id}`).then(r => r.data),

  // Requests (no /api prefix in backend)
  createRequest: (req) => http.post('/requests', req).then(r => r.data),
  getOwnerRequests: (ownerId) => http.get(`/requests/owner/${ownerId}`).then(r => r.data),
  getRequesterRequests: (requesterId) => http.get(`/requests/requester/${requesterId}`).then(r => r.data),
  getItemRequests: (itemId, itemType) => http.get(`/requests/item/${itemId}/${itemType}`).then(r => r.data),
  updateRequestStatus: (id, value) => http.put(`/requests/${id}/status`, null, { params: { value } }).then(r => r.data),
};

export default api;