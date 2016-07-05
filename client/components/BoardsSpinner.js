import React from 'react';

function BoardsSpinner() {
  return (
    <div className="b-boards-spinner">
      <div className="b-boards-spinner__wrap">
        <div className="b-boards-spinner__rect b-boards-spinner__rect_1" />
        <div className="b-boards-spinner__rect b-boards-spinner__rect_2" />
        <div className="b-boards-spinner__rect b-boards-spinner__rect_3" />
        <div className="b-boards-spinner__rect b-boards-spinner__rect_4" />
        <div className="b-boards-spinner__rect b-boards-spinner__rect_5" />
      </div>
    </div>
  );
}

export default BoardsSpinner;
