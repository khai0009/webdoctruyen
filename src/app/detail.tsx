import React from 'react';


interface DetailProps { Tentruyen: string; Gioithieu: string; ID: number; }
const Detail: React.FC<DetailProps> = ({ Tentruyen, Gioithieu, ID }) =>
  { return ( 
  <div> <h2>{Tentruyen}</h2> 
  <p>{Gioithieu}</p> 
  <p>ID: {ID}</p> </div> ); 

};

export default Detail;