import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddField from './pages/AddField.jsx';
import AddVehicle from './pages/AddVehicle.jsx';
import AddFoodOffer from './pages/AddFoodOffer.jsx';
import AddTicket from './pages/AddTicket.jsx';
import AddBedShare from './pages/AddBedShare.jsx';
import FieldsList from './pages/FieldsList.jsx';
import VehiclesList from './pages/VehiclesList.jsx';
import FoodOffersList from './pages/FoodOffersList.jsx';
import TicketsList from './pages/TicketsList.jsx';
import BedSharesList from './pages/BedSharesList.jsx';
import Requests from './pages/Requests.jsx';
import './App.css';

export default function App(){
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" replace />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route path="/dashboard" element={<Dashboard />} />

				{/* Add forms (auth required) */}
				<Route path="/add/field" element={<ProtectedRoute><AddField /></ProtectedRoute>} />
				<Route path="/add/vehicle" element={<ProtectedRoute><AddVehicle /></ProtectedRoute>} />
				<Route path="/add/foodoffer" element={<ProtectedRoute><AddFoodOffer /></ProtectedRoute>} />
				<Route path="/add/ticket" element={<ProtectedRoute><AddTicket /></ProtectedRoute>} />
				<Route path="/add/bedshare" element={<ProtectedRoute><AddBedShare /></ProtectedRoute>} />

				{/* Lists (auth required) */}
				<Route path="/fields" element={<ProtectedRoute><FieldsList /></ProtectedRoute>} />
				<Route path="/vehicles" element={<ProtectedRoute><VehiclesList /></ProtectedRoute>} />
				<Route path="/foodoffers" element={<ProtectedRoute><FoodOffersList /></ProtectedRoute>} />
				<Route path="/tickets" element={<ProtectedRoute><TicketsList /></ProtectedRoute>} />
				<Route path="/bedshares" element={<ProtectedRoute><BedSharesList /></ProtectedRoute>} />
				<Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />

				<Route path="*" element={<Navigate to="/foodoffers" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
