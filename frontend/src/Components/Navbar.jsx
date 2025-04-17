import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoMdNotificationsOutline,
  IoMdNotifications,
  IoMdMenu,
  IoMdClose,
  IoMdMoon,
  IoMdSunny
} from "react-icons/io";
import { FaSearch, FaRegEnvelope, FaEnvelope, FaUserCircle, FaCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import "../styles/navbar.scss";
import LogoutConfirmation from "./LogoutConfirmation";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ onMenuClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const avatar = "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff";

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
    setIsDropdownOpen(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token");
      setShowLogoutConfirmation(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-profile-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <>
      <header className="navbar" role="banner">
        {/* Brand and Menu Toggle */}
        <div className="navbar-brand">
          <button
            className="menu-toggle"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (onMenuClick) onMenuClick(); // optional external handler
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>
          <Link to="/dashboard" className="logo">
            <span className="logo-text">HRMS</span>
          </Link>
        </div>

        {/* Search */}
        <div className="search-container">
          <label htmlFor="search-input" className="visually-hidden">
            Search
          </label>
          <input
            id="search-input"
            type="search"
            placeholder="Search employees, projects, or tasks..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" aria-label="Search">
            <FaSearch />
          </button>
        </div>

        {/* Navbar Actions */}
        <div className="navbar-end">
          {/* Theme Toggle */}
          <div className="navbar-item">
            <button
              className="icon-button theme-toggle-button"
              aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <IoMdMoon /> : <IoMdSunny />}
            </button>
          </div>
          
          {/* Notifications */}
          <div className="navbar-item">
            <button
              className="icon-button notification-button"
              aria-label={`Notifications ${hasNotifications ? '(has unread)' : ''}`}
              onClick={() => setHasNotifications(!hasNotifications)}
            >
              {hasNotifications ? (
                <IoMdNotifications />
              ) : (
                <IoMdNotificationsOutline />
              )}
              {hasNotifications && <span className="badge" aria-hidden="true"></span>}
            </button>
          </div>

          {/* Messages */}
          <div className="navbar-item">
            <button
              className="icon-button message-button"
              aria-label={`Messages ${hasUnreadMessages ? '(has unread)' : ''}`}
              onClick={() => setHasUnreadMessages(!hasUnreadMessages)}
            >
              {hasUnreadMessages ? <FaEnvelope /> : <FaRegEnvelope />}
              {hasUnreadMessages && <span className="badge" aria-hidden="true"></span>}
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="navbar-item user-profile-dropdown">
            <div
              className="user-profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              role="button"
              tabIndex="0"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <img
                src={avatar}
                alt="User Avatar"
                className="avatar-image"
                width={40}
                height={40}
                loading="lazy"
              />
              <div className="user-info">
                <h4 className="user-name">Admin</h4>
                <span className="user-status">Online</span>
              </div>
            </div>

            <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              <Link to="/profile" className="dropdown-item">
                <FaUserCircle />
                <span>Profile</span>
              </Link>
              <Link to="/settings" className="dropdown-item">
                <FaCog />
                <span>Settings</span>
              </Link>
              <button className="dropdown-item logout-button" onClick={handleLogoutClick}>
                <MdLogout />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "is-active" : ""}`}>
          <Link to="/dashboard" className="mobile-menu-item">Dashboard</Link>
          <Link to="/employees" className="mobile-menu-item">Employees</Link>
          <Link to="/projects" className="mobile-menu-item">Projects</Link>
          <Link to="/tasks" className="mobile-menu-item">Tasks</Link>
          <Link to="/settings" className="mobile-menu-item">Settings</Link>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmation 
        isOpen={showLogoutConfirmation}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}