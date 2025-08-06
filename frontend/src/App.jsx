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
        <h1>Cost Estimator</h1>
      </header>
      <main>
        <Dropdown 
          label="Select a Product:" 
          onValueChange={handleDropdownChange} 
        />
        <button type="submit">Calculate</button>
      </main>
      
    </div>
  );
}

export default App;