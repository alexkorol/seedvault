import React from 'react';

const TagBubble = ({ tag, onClose }) => {
  return (
    <div className="tag-bubble" onClick={onClose}>
      {tag} <span className="close-icon">x</span>
    </div>
  );
};

export default TagBubble;
