import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './Home';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { ColorProvider, ColorConsumer } from './ColorContext';
import Toggler from './Toggler';
const GlobalStyle = createGlobalStyle`
body {
background-color:#292f33;
}

`;

const App = () => {
  // main screen composition
  return (
    <div>
      <Home />
    </div>
  );
};
export default App;
