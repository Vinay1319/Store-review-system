import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = useSelector(state => state?.auth?.user?.role);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Store<span>Review</span>
        </Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {userRole === 'admin' && (
            <>
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/users">Users</Link></li>
              <li><Link to="/admin/stores">Stores</Link></li>
              <li><Link to="/admin/ratings">Ratings</Link></li>
              <li><Link to="/admin/create-user">Create User</Link></li>
              <li><Link to="/admin/create-store">Create Store</Link></li>
            </>
          )}

          {userRole === 'store_owner' && (
            <li><Link to="/store_owner/dashboard">Dashboard</Link></li>
          )}

          {userRole === 'normal' && (
            <li><Link to="/normal/dashboard">Home</Link></li>
          )}

          {userRole?.length > 0 && (
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
