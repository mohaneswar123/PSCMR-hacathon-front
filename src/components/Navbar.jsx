import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="nav">
      <div className="nav__brand"><Link to="/">ShareGo</Link></div>
      <nav className="nav__links">
        <Link to="/foodoffers">Food Offers</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/tickets">Tickets</Link>
        <Link to="/fields">Fields</Link>
        <Link to="/bedshares">Bed Shares</Link>
      </nav>
      <div className="nav__auth">
        <Link to="/dashboard" className="btn btn--ghost">Dashboard</Link>
        {user ? (
          <>
            <Link to="/requests" className="btn btn--ghost">Requests</Link>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn btn--ghost">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
