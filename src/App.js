import React, { useState, useEffect } from 'react';
import './App.css';
import ThemeToggle from './ThemeToggle';
import srefsData from './data/srefs.json';

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
        {srefsData.map((sref, index) => (
          <div className={`sref-card ${visibleCards.includes(index) ? 'visible' : ''}`} key={sref.id}>
            <img src={`${process.env.PUBLIC_URL}/images/srefs/${sref.sref}.jpg`} alt={sref.description} className="sref-image" />
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
