

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme} shadow`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1">
          <i className="fab fa-whatsapp"></i> QuickChat
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <Link to="/saved-contacts" className="nav-link btn btn-outline-light mx-2 my-1 d-none d-lg-block">
              Saved Contacts
            </Link>
            <Link to="/history" className="nav-link btn btn-outline-light mx-2 my-1 d-none d-lg-block">
              History
            </Link>
            <div className="nav-item d-lg-none w-100 text-center">
              <Link to="/saved-contacts" className="nav-link btn btn-outline-light mx-2 my-1">
                Saved Contacts
              </Link>
              <Link to="/history" className="nav-link btn btn-outline-light mx-2 my-1">
                History
              </Link>
            </div>
            <button className="btn btn-outline-light mx-2 my-1" onClick={toggleTheme}>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

