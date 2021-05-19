import React, { useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './Home';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ColorContext, { ColorProvider } from './ColorContext';
import Toggler from './Toggler';
const GlobalStyle = createGlobalStyle`
body {
  margin:0;
  padding:0;
}

// `;

const App = () => {
  const { state } = useContext(ColorContext);
  // main screen composition
  return (
    <ColorProvider>
      <GlobalStyle />
      <Toggler />
      <Home />
    </ColorProvider>
  );
};
export default App;
