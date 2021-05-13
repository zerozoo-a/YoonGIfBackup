import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import List from './List';

const SearchBarStyle = styled.div`
  display: flex;
  position: fixed;
  transform: translate(-50%, 0%);
  left: 50%;

  .inputSearch {
    width: 80vw;
    height: 5rem;
    font-size: 2.5rem;
  }
  .inputSubmit {
    width: 5rem;
    height: 5rem;
    margin-left: 1rem;
  }
`;
const LoadTrigger = styled.div`
  width: 100vh;
  height: 20vh;
`;
const Home = () => {
  const [isGifDataLoading, setIsGifDataLoading] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const focusHere = useRef(null);
  const loadMore = useRef(null);
  // main screen composition

  async function getFetch(userInput) {
    setIsGifDataLoading(false);
    const uriAdrAndKey =
      'https://api.giphy.com/v1/gifs/search?api_key=OhokD3sYb24zaFFpUiO90QSMR7nanYQs&';
    let uriQuery = 'q=query';
    let uriLimit = '&limit=1';
    let uriOffset = '&offset=0';
    let uriRatingAndLang = '&rating=g&lang=en';
    if (list.length === 0) {
      let afterQuery = uriQuery.replace('query', userInput);
      let uri =
        uriAdrAndKey + afterQuery + uriLimit + uriOffset + uriRatingAndLang;
      const getData = await fetch(uri);
      const makeJson = await getData.json();
      setList([...makeJson.data]);
      setIsGifDataLoading(true);
    } else {
      let afterQuery = uriQuery.replace('query', userInput);
      // let uriOffsetCounter = (page * 2 + 1).toString();
      let afterOffset = uriOffset.replace(/[0-9]/, (page * 2 + 1).toString());
      let uri =
        uriAdrAndKey + afterQuery + uriLimit + afterOffset + uriRatingAndLang;
      const getData = await fetch(uri);
      const makeJson = await getData.json();
      setList((prev) => [...prev, ...makeJson.data]);
      setIsGifDataLoading(true);
    }
  }
  const setFocus = () => {
    focusHere.current.focus();
  };
  useEffect(() => {
    (async () => {
      await getFetch(userInput);
      setList([]);
      setFocus();
    })();
  }, [submit]);

  useEffect(() => {
    if (page) {
      (async () => {
        await getFetch(userInput);
      })();
    }
  }, [page]);
  useEffect(() => {
    if (isGifDataLoading) {
      const options = {
        threshold: 0.4,
      };
      let io = new IntersectionObserver(([entries]) => {
        if (entries.isIntersecting) {
          console.log('io');
          setPage((prev) => prev + 1);
        } else {
        }
      }, options);
      io.observe(loadMore.current);
    }
  }, [isGifDataLoading]);

  return (
    <div>
      <form>
        <SearchBarStyle>
          <input
            className='inputSearch'
            ref={focusHere}
            placeholder='Search GIF images'
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div
            className='inputSubmit'
            onClick={(e) => {
              e.preventDefault();
              setSubmit(!submit);
              setFocus();
              setPage((prev) => prev + 1);
            }}
            type='submit'
            value='Submit'>
            <FontAwesomeIcon icon={faSearch} size='4x' />
          </div>
        </SearchBarStyle>
      </form>

      <>
        <List list={list} />
        <LoadTrigger ref={loadMore} />
      </>
    </div>
  );
};
export default React.memo(Home);
