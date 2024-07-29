import React, { useState } from 'react';
import HomePage from './Homepage';
import Chat from './Chat';
import logo from './logo.svg'
import './App.css';

function App() {
    const [userName, setUserName] = useState(null);

    const handleStartChat = (name) => {
        setUserName(name);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Cognite Chat boilerplate</h1>
            </header>
            {userName ? (
                <Chat userName={userName} />
            ) : (
                <HomePage onStartChat={handleStartChat} />
            )}
        </div>
    );
}

export default App;
