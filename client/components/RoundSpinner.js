import React from 'react';
import one from 'onecolor';

function RoundSpinner({ size, thickness, color }) {
  const border = `${thickness} solid ${one(color).alpha(.2).cssa()}`;
  return (
    <div
      className="b-round-spinner"
      style={{
        borderTop: border,
        borderRight: border,
        borderBottom: border,
        borderLeft: `${thickness} solid ${color}`,
        width: size,
        height: size,
      }}
    >
      <div
        className="b-round-spinner__inside"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}

export default RoundSpinner;
