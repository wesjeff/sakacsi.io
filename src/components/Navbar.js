import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [location, setLocation] = useState('Locating...');
  const [time, setTime] = useState('');
  const [timezone, setTimezone] = useState('America/New_York');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const currentPath = useLocation().pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About Me', icon: '👨‍💻' },
    { path: '/resume', label: 'Resume', icon: '📄' },
    { path: '/projects', label: 'Projects', icon: '🚀' },
    { path: '/contact', label: 'Contact', icon: '📧' }
  ];

  useEffect(() => {
    const fetchLocationData = async () => {
      if (!isOnline) {
        setLocation('Offline mode');
        return;
      }

      try {
        const response = await fetch(`https://ipinfo.io/json?token=${process.env.REACT_APP_IPINFO_TOKEN}`);
        
        if (!response.ok) throw new Error('Location service unavailable');
        
        const data = await response.json();
        setLocation(`${data.city}, ${data.region}`);
        setTimezone(data.timezone || 'America/New_York');
      } catch (error) {
        console.warn('Location fetch failed:', error.message);
        setLocation('Location unavailable');
      }
    };

    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    fetchLocationData();

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [isOnline]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const localTime = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
      
      const hours = localTime.getHours();
      const minutes = localTime.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');

      setTime(`${displayHours}:${displayMinutes} ${period}`);
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    return () => clearInterval(clockInterval);
  }, [timezone]);

  const isActivePath = (path) => {
    return currentPath === path || (path !== '/' && currentPath.startsWith(path));
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="location-time">
          <div className="location-info">
            <span className="status-indicator" data-online={isOnline}></span>
            <p className="location">{location}</p>
          </div>
          <p className="time">{time}</p>
        </div>
        
        <ul className="nav-links">
          {navItems.map(({ path, label, icon }) => (
            <li key={path}>
              <Link 
                to={path} 
                className={`nav-link ${isActivePath(path) ? 'active' : ''}`}
                title={label}
              >
                <span className="nav-icon">{icon}</span>
                <span className="nav-text">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;