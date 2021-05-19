import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ListStyle = styled.div`
  /* margin-top: 10%; */
  img {
    width: 30vw;
    margin: 1vw;
  }
  .loaded {
    visibility: 'hidden';
  }
  @media (min-width: 769px) {
    img {
      width: 18vw;
      margin: 1vw;
    }
  }
  @media (max-width: 768px) {
    img {
      width: 22vw;
      margin: 1vw;
    }
  }
  @media (max-width: 425px) {
    img {
      width: 48vw;
      margin: 1vw;
    }
  }
  @media (max-width: 320px) {
    img {
      width: 90vw;
      margin: 1vw;
    }
  }
`;

const ImageWithLoading = ({ src, placeholder, setPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef(null);

  useEffect(() => {
    setIsLoaded(false);
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
        io.unobserve(entries.target);
      }
      // request 직후 바로 unobserve
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
      <ImageWithLoading
        src={v.images.downsized_medium.url}
        placeholder={v.images.downsized_medium.url}
        i={i}
        alt={v.title}
        page={page}
        setPage={setPage}
        key={v.title + i}
      />
    </ListStyle>
  );
};
export default React.memo(List);
