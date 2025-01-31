import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#c46647', padding: '20px' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: 'white', fontWeight: 'bold' }}>ShopNest</Link>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" style={{ color: 'white' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart" style={{ color: 'white' }}>My Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" style={{ color: 'white' }}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={{ color: 'white' }}>Sign up</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <form className="d-flex me-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search products..."
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-light" type="button" onClick={handleSearch}>Search</button>
                        </form>
                        <Link to="/profile" className="nav-link" style={{ color: 'white' }}>
                            <FontAwesomeIcon icon={faUser} size="lg" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
