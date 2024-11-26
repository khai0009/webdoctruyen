import React from 'react';

function Detail({ Tentruyen, Gioithieu, ID }) {
  return (
    <div>
      <h2>{Tentruyen}</h2>
      <p>{Gioithieu}</p>
      <p>ID: {ID}</p>
    </div>
  );
}

export default Detail;