import React, { useState, useEffect } from 'react';
import './App.css';
import ThemeToggle from './ThemeToggle';
import SrefCard from './SrefCard';

const sampleSrefs = [
  { id: 1, image: 'https://via.placeholder.com/150', description: 'Sample description 1', tags: ['tag1', 'tag2'], sref: '#####1' },
  { id: 2, image: 'https://via.placeholder.com/150', description: 'Sample description 2', tags: ['tag3', 'tag4'], sref: '#####2' },
  { id: 3, image: 'https://via.placeholder.com/150', description: 'Sample description 3', tags: ['tag5', 'tag6'], sref: '#####3' },
  { id: 4, image: 'https://via.placeholder.com/150', description: 'Sample description 4', tags: ['tag7', 'tag8'], sref: '#####4' },
  { id: 5, image: 'https://via.placeholder.com/150', description: 'Sample description 5', tags: ['tag9', 'tag10'], sref: '#####5' },
  { id: 6, image: 'https://via.placeholder.com/150', description: 'Sample description 6', tags: ['tag11', 'tag12'], sref: '#####6' },
  { id: 7, image: 'https://via.placeholder.com/150', description: 'Sample description 7', tags: ['tag13', 'tag14'], sref: '#####7' },
  { id: 8, image: 'https://via.placeholder.com/150', description: 'Sample description 8', tags: ['tag15', 'tag16'], sref: '#####8' },
  { id: 9, image: 'https://via.placeholder.com/150', description: 'Sample description 9', tags: ['tag17', 'tag18'], sref: '#####9' },
  { id: 10, image: 'https://via.placeholder.com/150', description: 'Sample description 10', tags: ['tag19', 'tag20'], sref: '#####10' },
  // Add more sample SREFs as needed
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [visibleCards, setVisibleCards] = useState([]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.sref-card');
      const newVisibleCards = [];

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          newVisibleCards.push(index);
        }
      });

      setVisibleCards(newVisibleCards);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`App ${theme}`}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="sref-container">
        {sampleSrefs.map((sref, index) => (
          <div key={sref.id} className={`sref-card ${visibleCards.includes(index) ? 'visible' : ''}`}>
            <img src={sref.image} alt={sref.description} className="sref-image" />
            <p>{sref.description}</p>
            <div className="tags">
              {sref.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
