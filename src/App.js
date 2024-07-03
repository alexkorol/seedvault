import React, { useState, useEffect } from 'react';
import './App.css';
import ThemeToggle from './ThemeToggle';
import srefsData from './data/srefs.json';
import TagBubble from './TagBubble';

function App() {
  const [theme, setTheme] = useState('dark');
  const [visibleCards, setVisibleCards] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [copyMessage, setCopyMessage] = useState(null);

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

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleCopySref = (sref) => {
    navigator.clipboard.writeText(` --sref ${sref}`);
    setCopyMessage(`Copied " --sref ${sref}" to clipboard!`);
    setTimeout(() => setCopyMessage(null), 2000);
  };

  useEffect(() => {
    if (copyMessage) {
      const copyIndicator = document.querySelector('.copy-indicator');
      if (copyIndicator) {
        copyIndicator.classList.add('fade-in');
        setTimeout(() => {
          copyIndicator.classList.remove('fade-in');
        }, 2000);
      }
    }
  }, [copyMessage]);

  return (
    <div className={`App ${theme}`}>
      <div className={`top-bar ${theme}`}>
        {copyMessage && <div className="copy-indicator">{copyMessage}</div>}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      {selectedTag && <TagBubble tag={selectedTag} onClose={() => setSelectedTag(null)} className={copyMessage ? 'move-right' : ''} />}
      <div className="sref-container">
        {srefsData.filter(sref => !selectedTag || sref.tags.includes(selectedTag)).map((sref, index) => (
          <div className={`sref-card ${visibleCards.includes(index) ? 'visible' : ''}`} key={sref.id} onClick={() => handleCopySref(sref.sref)}>
            <img src={`${process.env.PUBLIC_URL}/images/srefs/${sref.sref}.jpg`} alt={sref.description} className="sref-image" />
            <p>{sref.description}</p>
            <div className="tags">
              {sref.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="tag" onClick={(e) => { e.stopPropagation(); handleTagClick(tag); }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
