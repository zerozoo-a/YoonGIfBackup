import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ListStyle = styled.div`
  padding: 0;
  margin: 0;
  /* display: flex;
  width: 62wv;
  height: 40vh;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none; */
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
  );
};

const List = ({ v, i, page, setPage }) => {
  return (
    <ListStyle>
      <div key={v.title + i}>
        <ImageWithLoading
          src={v.images.downsized_medium.url}
          placeholder={v.images.downsized_medium.url}
          i={i}
          alt={v.title}
          page={page}
          setPage={setPage}
        />
      </div>
    </ListStyle>
  );
};
export default React.memo(List);
