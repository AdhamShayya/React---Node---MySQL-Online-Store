import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext.js";
import { FaHeart, FaMicrophone, FaShoppingCart, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import images from '../images/logo2.JPG';
import "../App.css";

function Navbar() {
    const { authState, setAuthState } = useContext(AuthContext);
    let navigate = useNavigate();
   const [isListening, setIsListening] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const storedValue = localStorage.getItem('darkMode');
        return storedValue === 'true';
    });

    const [searchTerm, setSearchTerm] = useState('');

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
            username: "",
            id: 0,
            status: false,
        });
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}`);
        }
    };

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        document.body.classList.toggle('light-mode', darkMode);
    }, [darkMode]);


    const handleVoiceSearch = () => {
        const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition
        recognition.continuous = false; // Stops listening when user stops speaking
        recognition.interimResults = false; // Final results only
        recognition.lang = 'en-US'; // Language

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            let transcript = event.results[0][0].transcript.trim(); // Trim whitespace
            transcript = transcript.replace(/\.$/, ''); // Remove trailing period
            setSearchTerm(transcript);
            setIsListening(false);
            navigate(`/search?query=${transcript}`);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };
    return (
        <div className={`navbar ${darkMode ? 'light-mode' : 'dark-mode'}`}>
            <a href="/" className="logo">
                <img src={images} alt="Logo" className="logoImage" />
            </a>
            <div className="searchBar">
                <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="searchButton" onClick={handleSearch}><FaSearch /></button>
                <button className="microphoneButton" onClick={handleVoiceSearch} disabled={isListening}>
                    <FaMicrophone />
                </button>
            </div>
            <div className="user">
                {!authState.status ? (
                    <div className='user'>
                        <Link to="/login" className="signup"> Login</Link>
                        <Link to="/registration" className="signup"> Registration</Link>
                    </div>
                ) : (
                    <div className='user'>
                        <h1>{authState.username} </h1>                  
                        <button onClick={logout}> Logout</button>
                    </div>
                )}
            </div>
            <div className="favorites">
                <a onClick={() => (!authState.status) ? navigate("/login") : navigate(`/fav/${authState.id}`)} className="favorites">
                    <FaHeart />
                </a>
            </div>
            <div className="navbarCart">
                <a onClick={() => (!authState.status) ? navigate("/login") : navigate(`/cart/${authState.id}`)} className="navbarCart">
                    <FaShoppingCart />
                </a>
            </div>
            <button className="toggleModeButton" onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
            </button>
        </div>
    );
}

export default Navbar;
