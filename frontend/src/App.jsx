import React, { useState } from 'react';
import Dropdown from './Dropdown';
import './App.css';

function App() {
  const [selectedProductId, setSelectedProductId] = useState('');
  const handleDropdownChange = (value) => {
    console.log("Selected value in App:", value);
    setSelectedProductId(value);
  };

  return (
    <div className="app-container">
      
      <header>
        <h2
          className="title"
          style={{
            fontSize: '4rem',
            textAlign: 'center',
            margin: '0 auto',
            fontWeight: 1000,
            letterSpacing: '2px',
            color: '#7dcfff',
            textShadow: '0 2px 12px #365b96ff'
          }}
        >
          Cloud Cost Estimator
        </h2>
      </header>
      <main>
        <Dropdown 
          label="Select a Product:" 
          onValueChange={handleDropdownChange} 
        />
      </main>
      
    </div>
  );
}

export default App;