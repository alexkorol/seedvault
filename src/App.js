import React, { useState } from 'react';
import './App.css';
import ThemeToggle from './ThemeToggle';
import SrefCard from './SrefCard';

const sampleSrefs = [
  { id: 1, image: 'https://via.placeholder.com/150', description: 'Sample description 1', tags: ['tag1', 'tag2'], sref: '#####1' },
  { id: 2, image: 'https://via.placeholder.com/150', description: 'Sample description 2', tags: ['tag3', 'tag4'], sref: '#####2' },
  // Add more sample SREFs as needed
];

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`App ${theme}`}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="sref-container">
        {sampleSrefs.map(sref => (
          <SrefCard key={sref.id} sref={sref} />
        ))}
      </div>
    </div>
  );
}

export default App;
