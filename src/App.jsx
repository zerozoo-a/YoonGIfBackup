import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './Home';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const GlobalStyle = createGlobalStyle`
body {
background-color:#292f33;
}

`;

const App = () => {
  // main screen composition
  return (
    <div>
      <GlobalStyle />
      <Home />
    </div>
  );
};
export default App;
