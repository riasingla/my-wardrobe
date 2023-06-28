import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      console.log('isLoggedIn:', isLoggedIn);
    } else {
      setIsLoggedIn(false);
      console.log('isLoggedIn:', isLoggedIn);
    }
  }); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          Virtual Wardrobe
        </Link>
      </div>
      <nav className="nav">
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/Items" className="nav-link">
                  Items
                </Link>
              </li>
              <li>
                <Link to="/Outfits" className="nav-link">
                  Outfits
                </Link>
              </li>
              <li>
                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/Login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
