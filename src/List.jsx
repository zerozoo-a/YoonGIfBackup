import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const ListStyle = styled.div`
  padding: 0;
  margin: 0;
  ul {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 2rem;
    li {
      list-style: none;
      margin: 5rem;
    }
  }
  img {
    width: 30vw;
  }
`;
const List = ({ list }) => {
  return (
    <>
      <ListStyle>
        <div>
          <ul>
            {list.map((v, i) => (
              <li key={v.title + i}>
                <div>
                  <img
                    src={v.images.downsized_medium.url}
                    alt={v.title}
                    loading='lazy'
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ListStyle>
    </>
  );
};
export default React.memo(List);
