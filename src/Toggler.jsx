import React from 'react';
import { ColorConsumer } from './ColorContext';

const colors = ['white', 'orange'];

const Toggler = () => {
  return (
    <div>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: 'flex' }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  width: '1rem',
                  height: '1rem',
                  cursor: 'pointer',
                }}
                onClick={() => actions.setColor(color)}
              />
            ))}
          </div>
        )}
      </ColorConsumer>
    </div>
  );
};

export default Toggler;
