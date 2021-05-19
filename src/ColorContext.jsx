import React, { createContext, useState } from 'react';

const ColorContext = createContext({
  state: { color: 'red', subColor: 'blue' },
  actions: {
    setColor: () => {},
    setSubColor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('#292f33');
  const [subColor, setSubColor] = useState('');

  const value = {
    state: { color, subColor },
    actions: { setColor, setSubColor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};
const ColorConsumer = ColorContext.Consumer;
export { ColorProvider, ColorConsumer };
export default ColorContext;
