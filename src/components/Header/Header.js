import React from 'react';

export default ({inputRef, onNameChange, isOnline}) => {

  return (
    <div className="header">
      <div>
        {isOnline ? <span>***ONLINE***</span> : <span>***WARNING!! OFFLINE***    </span>}
        <span>YOUR NAME:</span>
        <input
          type="text"
          onChange={() => {
            onNameChange();
          }}
          ref={inputRef}
        />
      </div>
    </div>
  );
};
