import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import List from './List';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const LoadTrigger = styled.div`
  width: 100vh;
  height: 20vh;
  background-color: red;
`;
const LoadingStyle = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
  font-size: 4rem;
  justify-content: center;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
  #faSpinner {
    position: absolute;
    top: 70vh;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0);
  }
`;
const App = () => {
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
          io.disconnect();
        } else {
        }
      }, options);
      io.observe(loadMore.current);
    }
  }, [isGifDataLoading]);

  return (
    <div>
      <form>
        <input
          ref={focusHere}
          placeholder='Search GIF images'
          onChange={(e) => setUserInput(e.target.value)}
        />
        <input
          onClick={(e) => {
            e.preventDefault();
            setSubmit(!submit);
            setFocus();
            setPage((prev) => prev + 1);
          }}
          type='submit'
          value='Submit'
        />
      </form>

      <>
        <List list={list} />
        <LoadTrigger ref={loadMore} />
      </>
    </div>
  );
};
export default React.memo(App);
