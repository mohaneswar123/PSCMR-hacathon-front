/* eslint react-refresh/only-export-components: off */
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sg_user')) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) localStorage.setItem('sg_user', JSON.stringify(user));
    else localStorage.removeItem('sg_user');
  }, [user]);

  const login = async (email, password) => {
    setLoading(true); setError(null);
    try {
      const data = await api.login({ email, password });
      if (!data) throw new Error('Invalid credentials');
      setUser(data);
      return data;
    } catch (e) {
      setError(e.message || 'Login failed');
      throw e;
    } finally { setLoading(false); }
  };

  const register = async ({ name, email, password, phone }) => {
    setLoading(true); setError(null);
    try {
      const data = await api.register({ name, email, password, phone });
      setUser({ ...data, password: undefined });
      return data;
    } catch (e) {
      setError(e.message || 'Register failed');
      throw e;
    } finally { setLoading(false); }
  };

  const logout = () => setUser(null);

  // --- Entity helpers use current user id where needed ---
  const ownerId = user?.id;

  // Fields
  const addField = (payload) => api.addField(ownerId, payload);
  const getAllFields = () => api.getAllFields();

  // Vehicles
  const addVehicle = (payload) => api.addVehicle(ownerId, payload);
  const getAllVehicles = () => api.getAllVehicles();

  // Food Offers
  const addFoodOffer = (payload) => api.addFoodOffer(ownerId, payload);
  const getAllFoodOffers = () => api.getAllFoodOffers();

  // Tickets
  const addTicket = (payload) => api.addTicket(ownerId, payload);
  const getAllTickets = () => api.getAllTickets();

  // Bed Shares
  const addBedShare = (payload) => api.addBedShare(ownerId, payload);
  const getAllBedShares = () => api.getAllBedShares();

  // Requests
  const createRequest = (payload) => api.createRequest(payload);
  const getOwnerRequests = () => api.getOwnerRequests(ownerId);
  const getMyRequests = () => api.getRequesterRequests(ownerId);
  const setRequestStatus = (id, value) => api.updateRequestStatus(id, value);

  const value = {
    user, loading, error,
    login, register, logout,
    // Fields
    addField, getAllFields,
    // Vehicles
    addVehicle, getAllVehicles,
    // Food Offers
    addFoodOffer, getAllFoodOffers,
    // Tickets
    addTicket, getAllTickets,
    // Bed Shares
    addBedShare, getAllBedShares,
    // Requests
    createRequest, getOwnerRequests, getMyRequests, setRequestStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
