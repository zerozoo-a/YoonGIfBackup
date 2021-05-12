import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import List from './List';
import AddPage from './AddPage';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const App = () => {
  const uri =
    'https://api.giphy.com/v1/gifs/search?api_key=OhokD3sYb24zaFFpUiO90QSMR7nanYQs&q=query&limit=25&offset=0&rating=g&lang=en';
  // const [gifData, setGifData] = useState([]);
  const [isGifDataLoading, setIsGifDataLoading] = useState(false);
  const [setInput, setSetInput] = useState(null);
  const [submit, setSubmit] = useState(false);
  const focusHere = useRef(null);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  // main screen composition

  async function getFetch(url, setInput) {
    url = url.replace('query', setInput);
    const getData = await fetch(url);
    const makeJson = await getData.json();
    setList(makeJson);
    setIsGifDataLoading(true);
  }

  const setFocus = () => {
    focusHere.current.focus();
  };
  useEffect(() => {
    (async () => {
      await getFetch(uri, setInput);
      setFocus();
    })();
  }, [submit]);

  useEffect(() => {
    (async () => {
      await getFetch(uri, setInput);
    })();
  }, [page]);

  return (
    <div>
      <form>
        <input
          ref={focusHere}
          placeholder='Search GIF images'
          onChange={(e) => setSetInput(e.target.value)}
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
      <AddPage page={page} setPage={setPage} />
    </div>
  );
};
export default App;
