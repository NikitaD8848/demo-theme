import React from 'react';

function FeaturedBtn({ key, tagName, handleFeaturedBtnClick, isActive }: any) {
  return (
    <div key={key} className="me-3">
      <button
        className={`btn rounded-0 text-uppercase ${isActive ? 'bg-dark text-light' : 'bg-light text-dark'} `}
        onClick={handleFeaturedBtnClick}
      >
        {tagName}
      </button>
    </div>
  );
}

export default FeaturedBtn;
