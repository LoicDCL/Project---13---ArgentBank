import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.png';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const firstName = localStorage.getItem('firstName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    navigate('/sign-in');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </Link>
            <button className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;