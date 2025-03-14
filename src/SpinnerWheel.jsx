import React, { useState } from 'react';
import './Spinner.css';

const Spinner = () => {
  const [names, setNames] = useState(['Alice', 'Bob', 'Curtis']);
  const [newName, setNewName] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [spinning, setSpinning] = useState(false);

  // Function to handle adding a new name to the list
  const handleAddName = () => {
    if (newName && !names.includes(newName)) {
      setNames([...names, newName]);
      setNewName('');
    }
  };

  // Function to handle removing a name from the list
  const handleRemoveName = (nameToRemove) => {
    setNames(names.filter(name => name !== nameToRemove));
  };

  // Function to handle "Enter" key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddName();  // Call handleAddName if Enter is pressed
    }
  };

  // Start spinning and randomly pick a name
  const startSpin = () => {
    setSpinning(true);
    setSelectedName('');
    
    // Randomize the name
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setSelectedName(names[randomIndex]);
      setSpinning(false);
    }, 3000);  // Spin for 3 seconds
  };

  return (
    <div className="spinner-container">
      <div className={`spinner ${spinning ? 'spinning' : ''}`} onClick={startSpin}>
        <div className="spinner-circle"></div>
        {spinning && <div className="spinner-overlay">Spinning...</div>}
      </div>
      <div className="name-display">{selectedName ? selectedName : 'Click to spin!'}</div>

      <div className="input-container">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKeyPress}  // Add the onKeyDown event handler
          placeholder="Enter name"
        />
        <button onClick={handleAddName} id='addName'>Add Name</button>
      </div>

      <div className="name-list">
        <h3>Current Names</h3>
        {names.length > 0 ? (
          <ul>
            {names.map((name) => (
              <li key={name}>
                {name}
                <button onClick={() => handleRemoveName(name)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No names available.</p>
        )}
      </div>
    </div>
  );
};

export default Spinner;
