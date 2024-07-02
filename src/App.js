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
          <div key={sref.id} className="sref-card">
            <img src={sref.image} alt={sref.description} className="sref-image" />
            <p>{sref.description}</p>
            <div className="tags">
              {sref.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
