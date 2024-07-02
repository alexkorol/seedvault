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
  { id: 11, image: 'https://via.placeholder.com/150', description: 'Sample description 11', tags: ['tag21', 'tag22'], sref: '#####11' },
  { id: 12, image: 'https://via.placeholder.com/150', description: 'Sample description 12', tags: ['tag23', 'tag24'], sref: '#####12' },
  { id: 13, image: 'https://via.placeholder.com/150', description: 'Sample description 13', tags: ['tag25', 'tag26'], sref: '#####13' },
  { id: 14, image: 'https://via.placeholder.com/150', description: 'Sample description 14', tags: ['tag27', 'tag28'], sref: '#####14' },
  { id: 15, image: 'https://via.placeholder.com/150', description: 'Sample description 15', tags: ['tag29', 'tag30'], sref: '#####15' },
  { id: 16, image: 'https://via.placeholder.com/150', description: 'Sample description 16', tags: ['tag31', 'tag32'], sref: '#####16' },
  { id: 17, image: 'https://via.placeholder.com/150', description: 'Sample description 17', tags: ['tag33', 'tag34'], sref: '#####17' },
  { id: 18, image: 'https://via.placeholder.com/150', description: 'Sample description 18', tags: ['tag35', 'tag36'], sref: '#####18' },
  { id: 19, image: 'https://via.placeholder.com/150', description: 'Sample description 19', tags: ['tag37', 'tag38'], sref: '#####19' },
  { id: 20, image: 'https://via.placeholder.com/150', description: 'Sample description 20', tags: ['tag39', 'tag40'], sref: '#####20' },
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
