import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const App = () => {
  const [gifData, setGifData] = useState([]);
  const [isGifDataLoading, setIsGifDataLoading] = useState(false);
  const [setInput, setSetInput] = useState(null);
  const [submit, setSubmit] = useState(false);
  const gifSearch =
    'https://api.giphy.com/v1/gifs/search?api_key=OhokD3sYb24zaFFpUiO90QSMR7nanYQs&q=query&limit=25&offset=0&rating=g&lang=en';

  //   console.log(gifSearch.replace('HERE', ''));

  async function getFetch(uri, setInput) {
    uri = uri.replace('query', setInput);
    const getData = await fetch(uri);
    const makeJson = await getData.json();
    setGifData(makeJson);
    setIsGifDataLoading(true);
  }
  useEffect(() => {
    console.log('rendered!');

    getFetch(gifSearch, setInput);
  }, [submit]);

  return (
    <>
      {isGifDataLoading ? (
        <div>
          <form>
            <input onChange={(e) => setSetInput(e.target.value)} />
            <input
              onClick={(e) => {
                e.preventDefault();
                console.log('prevented?');
                setSubmit(!submit);
              }}
              type='submit'
              value='Submit'
            />
          </form>

          <ul>
            {gifData.data.map((v, i) => (
              <li key={v.title + i}>
                <div>
                  <img src={v.images.downsized.url} alt={v.title} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};
export default App;
