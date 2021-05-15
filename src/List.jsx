import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ListStyle = styled.div`
  padding: 0;
  margin: 0;
  ul {
    display: flex;
    width: 31wh;
    height: 40vh;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 2rem;

    li {
      list-style: none;
    }
  }
  img {
    width: 30vw;
  }
  .loaded {
    visibility: 'hidden';
  }
`;

const ImageWithLoading = ({ src, placeholder, page, setPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef(null);

  const ioFnc = () => {
    const options = {
      threshold: 0.2,
    };
    let io = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting) {
        setPage((prev) => prev + 1);
      } else {
        io.unobserve(entries.target);
      }
    }, options);
    // io.observe(imgRef.current);
  };

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.loading = 'lazy';
    imageToLoad.onload = () => {
      setIsLoaded(true);
      setCurrentSrc(src);
    };
    // Intersection Observer
    const options = {
      threshold: 1,
    };
    let io = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting) {
        setPage((prev) => prev + 1);
      } else {
        // io.unobserve(entries.target);
      }
    }, options);
    io.observe(imgRef.current);
    if (isLoaded) {
      io.unobserve(imgRef.current);
    }

    // End Intersection Observer
  }, [src]);
  // useEffect는 변화하는 무언가를 두번째 인자로 받아 실행조건을 설정할 수 있다.
  return (
    <>
      <img
        src={currentSrc}
        style={{
          backgroundColor: isLoaded ? '' : 'rgb(0,0,0)',
          width: isLoaded ? '' : '30vw',
          height: isLoaded ? '' : '30vh',
          opacity: isLoaded ? 1 : 0.1,
          transition: 'opacity 0.12s ease-in-out',
        }}
        loading='lazy'
        ref={imgRef}
      />
    </>
  );
};
// const options = {
//   threshold: 0.2,
// };
// let io = new IntersectionObserver(([entries], observer) => {
//   if (entries.isIntersecting) {
//     setPage((prev) => prev + 1);
//   } else if (isGifDataLoading) {
//     io.unobserve(entries.target);
//   }
// }, options);
// io.observe(loadMore.current);

const List = ({ v, i, page, setPage }) => {
  return (
    <>
      <ListStyle>
        <ul>
          <li key={v.title + i}>
            <ImageWithLoading
              src={v.images.downsized_medium.url}
              placeholder={v.images.downsized_medium.url}
              i={i}
              alt={v.title}
              page={page}
              setPage={setPage}
            />
          </li>
        </ul>
      </ListStyle>
    </>
  );
};
export default React.memo(List);
