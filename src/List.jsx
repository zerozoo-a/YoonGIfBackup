import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const List = ({ isGifDataLoading, list, setList }) => {
  return (
    <>
      {isGifDataLoading ? (
        <div>
          <ul>
            {list.data.map((v, i, ary) => (
              <li ref={ary.length === i ? lastRef : null} key={v.title + i}>
                <div>
                  <img src={v.images.downsized.url} alt={v.title} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};
export default List;
