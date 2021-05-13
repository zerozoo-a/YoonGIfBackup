import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  .awaitLoad {
    width: 30vw;
    height: 40vw;
    background-color: 'red';
  }
  .loaded {
  }
`;
const List = ({ list }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const spinner = useRef(null);

  useCallback(() => {
    console.log('hello');
  }, [isImageLoaded]);
  const onLoad = (event) => {
    event.target.classList.remove('awaitLoad');
    event.target.classList.add('loaded');
  };
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
                    className='awaitLoad'
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
