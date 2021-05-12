import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import List from './List';
import AddPage from './AddPage';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const App = () => {
  const uri =
    'https://api.giphy.com/v1/gifs/search?api_key=OhokD3sYb24zaFFpUiO90QSMR7nanYQs&q=query&limit=2&offset=0&rating=g&lang=en';
  // const uriAdrAndKey =
  //   'https://api.giphy.com/v1/gifs/search?api_key=OhokD3sYb24zaFFpUiO90QSMR7nanYQs&';
  // let uriQuery = 'q=query';
  // let uriLimit = '&limit=2';
  // let uriOffset = '&offset=0';
  // let uriRatingAndLang = '&rating=g&lang=en';

  // const [gifData, setGifData] = useState([]);
  const [isGifDataLoading, setIsGifDataLoading] = useState(false);
  const [input, setInput] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  // const [uriQuery, setUriQuery] = useState('q=query');
  // const [uriOffset, setUriOffset] = useState('&offset=0');
  const focusHere = useRef(null);
  // main screen composition
  const uriAdrAndKey =
    'https://api.giphy.com/v1/gifs/search?api_key=OhokD3sYb24zaFFpUiO90QSMR7nanYQs&';
  let uriQuery = 'q=query';
  let uriLimit = '&limit=2';
  let uriOffset = '&offset=0';
  let uriRatingAndLang = '&rating=g&lang=en';

  async function getFetch(input, submitPressed) {
    if (list.length === 0 || submitPressed) {
      let afterQuery = uriQuery.replace('query', input);
      let uri =
        uriAdrAndKey + afterQuery + uriLimit + uriOffset + uriRatingAndLang;
      const getData = await fetch(uri);
      const makeJson = await getData.json();
      setList([...makeJson.data]);
    } else {
      let afterQuery = uriQuery.replace('query', input);
      let uriOffsetCounter = (page * 2 + 1).toString();
      let afterOffset = uriOffset.replace(/[0-9]/, uriOffsetCounter);
      let uri =
        uriAdrAndKey + afterQuery + uriLimit + afterOffset + uriRatingAndLang;
      const getData = await fetch(uri);
      const makeJson = await getData.json();
      setList((prev) => [...prev, ...makeJson.data]);
    }
    setIsGifDataLoading(true);
  }

  const setFocus = () => {
    focusHere.current.focus();
  };
  useEffect(() => {
    console.log('useEffect1');
    (async () => {
      const submitPressed = true;
      await getFetch(input, submitPressed);
      setFocus();
    })();
  }, [submit]);

  useEffect(() => {
    if (page) {
      console.log('useEffect2');
      (async () => {
        await getFetch(input);
      })();
    }
  }, [page]);

  return (
    <div>
      <form>
        <input
          ref={focusHere}
          placeholder='Search GIF images'
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          onClick={(e) => {
            e.preventDefault();
            setSubmit(!submit);
            setFocus();
          }}
          type='submit'
          value='Submit'
        />
      </form>

      <List isGifDataLoading={isGifDataLoading} list={list} setList={setList} />
      <AddPage setPage={setPage} />
    </div>
  );
};
export default App;
