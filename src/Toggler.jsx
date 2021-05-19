import React, { useContext, useState, useEffect } from 'react';
import ColorContext from './ColorContext';
import styled from 'styled-components';
import Star from './Star';
import Sun from './Sun';
const TogglerStyle = styled.div`
  position: fixed;
  top: -40px;
  left: 35px;
  z-index: 500;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transform: scale(0.25);
  transition: all 0.9 linear;
  @media (min-width: 1300px) {
    left: 105px;
  }
  @media (max-width: 425px) {
    transform: scale(0.2);
    left: 15px;
  }
  @media (max-width: 320px) {
    display: none;
  }
`;

const Toggler = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const { state, actions } = useContext(ColorContext);
  useEffect(() => {
    if (isToggleOn) {
      actions.setColor('rgb(241,247,247)');
    } else {
      actions.setColor('#292f33');
    }
  }, [isToggleOn]);

  return (
    <TogglerStyle
      onClick={() => {
        setIsToggleOn(!isToggleOn);
      }}>
      {isToggleOn ? (
        <Star
          id='star'
          width='124'
          height='124'
          fill='#292f33'
          rectWidth='120'
          rectHeight='120'
        />
      ) : (
        <Sun
          id='sun'
          width='124'
          height='124'
          fill='#DD541C'
          rectWidth='120'
          rectHeight='120'
        />
      )}
    </TogglerStyle>
  );
};

export default Toggler;
