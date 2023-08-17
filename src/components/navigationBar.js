import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssComponents/navigationBar.css';

function NavigationBar() {
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm}`);
    }
  };
  return (
    <>
      <nav className='navbar'>
        <div className='logo'>
          <Link to='/'>Amazon Music</Link>
        </div>
        <ul className='nav-links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/subscription'>Subscriptions</Link>
          </li>
          <li>
            <Link to='/favorites'>Favorites</Link>
          </li>
        </ul>
        <div className='search-bar'>
          <form onSubmit={handleSearch}>
            <input
              type='text'
              placeholder='Search for songs, artists, albums'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type='submit'>Search</button>
          </form>
        </div>
        <div className={`user-icon ${userDropdownOpen ? 'active' : ''}`}>
          <button onClick={toggleUserDropdown}>User Name</button>
          {userDropdownOpen && (
            <div className='dropdown'>
              <Link to='/login' onClick={toggleUserDropdown}>
                Login
              </Link>
              {/* Conditional rendering for logged-in user */}
              {/* <Link to="/logout">Logout</Link> */}
              {/* <Link to="/subscriptions">Subscriptions</Link> */}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
