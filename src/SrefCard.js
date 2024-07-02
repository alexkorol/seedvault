import React, { useState } from 'react';
import './App.css';

const SrefCard = ({ sref }) => {
  const [cardState, setCardState] = useState({ isFavorite: false, rating: 0, copied: false });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`--SREF ${sref.sref}`).then(() => {
      setCardState(prevState => ({ ...prevState, copied: true }));
      setTimeout(() => {
        setCardState(prevState => ({ ...prevState, copied: false }));
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const toggleFavorite = () => {
    setCardState(prevState => ({ ...prevState, isFavorite: !prevState.isFavorite }));
  };

  const setRating = (ratingValue) => {
    setCardState(prevState => ({ ...prevState, rating: ratingValue }));
  };

  return (
    <div className="sref-card" onClick={copyToClipboard}>
      <img src={sref.image} alt={sref.description} className="sref-image" />
      <h3>{sref.sref}</h3>
      <p>{sref.description}</p>
      <div className="tags">
        {sref.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="rating">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <span
              key={index}
              className={ratingValue <= cardState.rating ? 'star active' : 'star'}
              onClick={() => setRating(ratingValue)}
            >★</span>
          );
        })}
      </div>
      <button className={cardState.isFavorite ? 'favorite active' : 'favorite'} onClick={toggleFavorite}>
        ♥
      </button>
      {cardState.copied && <span className="copy-indicator">Copied!</span>}
    </div>
  );
};

export default SrefCard;
