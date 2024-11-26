import React, { useState } from 'react';

interface ButtonProps {
  onClick: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({onClick}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

  };


};

export default ButtonComponent;