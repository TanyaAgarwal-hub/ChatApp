import React, { useState } from 'react';
import './styles/Homepage.css';

const HomePage = ({ onStartChat }) => {
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onStartChat(name);
        }
    };

    return (
        <div className="homepage-container">
            <br></br>
            <form onSubmit={handleSubmit}>
                <input
                    className='homepage_input'
                    type="text"
                    placeholder="Enter your friend's name"
                    value={name}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className='homepage_submit'>Start Chat</button>
            </form>
        </div>
    );
};

export default HomePage;