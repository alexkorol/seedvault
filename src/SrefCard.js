import React, { useState } from 'react';
import './App.css';

const SrefCard = ({ sref }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`--sref ${sref.sref}`);
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
              className={ratingValue <= rating ? 'star active' : 'star'}
              onClick={() => setRating(ratingValue)}
            >★</span>
          );
        })}
      </div>
      <button className={isFavorite ? 'favorite active' : 'favorite'} onClick={() => setIsFavorite(!isFavorite)}>
        ♥
      </button>
    </div>
  );
};

export default SrefCard;
