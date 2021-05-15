import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import List from './List';

const SearchBarStyle = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 10vh;
  transform: translate(-50%, 0%);
  top: 0;
  left: 50%;
  background-color: black;

  & :focus {
    outline: none;
  }
  .inputSearch {
    width: 60vw;
    height: 5vh;
    font-size: 2vw;
    transform: translate(-50%, 0%);
    margin-left: 50%;
    margin-top: 2.2vh;
    padding: 0;
  }
  .inputSubmit {
    display: none;
  }
  .searchIcon {
    position: fixed;
    width: 5vh;
    height: 5vh;
    left: 63vw;
    top: 5vh;
    padding: 0.3vw;
    color: #f5f5f1;
    background-color: rgb(223, 87, 155);
    transform: translate(-50%, -50%);
    margin-left: 10.1%;
    border: none;
  }
  .ratingStyle {
    position: fixed;
    left: 80vw;
    top: 2.5vh;
    border: 3px solid rgb(223, 87, 155);
  }
  .gifLoading {
    display: flex;
    flex-direction: row;
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
  const [selectedUriRating, setSelectedUriRating] = useState(null);
  const focusHere = useRef(null);
  const loadMore = useRef(null);
  // main screen composition

  async function getFetch(userInput, selectedUriRating) {
    setIsGifDataLoading(false);
    const uriAdrAndKey =
      'https://api.giphy.com/v1/gifs/search?api_key=OhokD3sYb24zaFFpUiO90QSMR7nanYQs&';
    let uriQuery = 'q=query';
    let uriLimit = '&limit=1';
    let uriOffset = '&offset=0';
    let uriRatingAndLang = '&rating=g&lang=en';
    let changedUriRatingAndLang = null;

    if (selectedUriRating) {
      changedUriRatingAndLang = uriRatingAndLang.replace(
        '=g',
        selectedUriRating
      );
    }

    if (list.length === 0) {
      if (selectedUriRating) uriRatingAndLang = changedUriRatingAndLang;
      let afterQuery = uriQuery.replace('query', userInput);
      let uri =
        uriAdrAndKey + afterQuery + uriLimit + uriOffset + uriRatingAndLang;
      const getData = await fetch(uri);
      const makeJson = await getData.json();
      setList([...makeJson.data]);
      setIsGifDataLoading(true);
    } else {
      if (selectedUriRating) uriRatingAndLang = changedUriRatingAndLang;
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
      try {
        setList([]);
        await getFetch(userInput, selectedUriRating);
        setFocus();
      } catch (error) {
        console.log(error, 'useEffect submit');
      }
    })();
  }, [submit]);

  useEffect(() => {
    if (page) {
      (async () => {
        try {
          await getFetch(userInput, selectedUriRating);
        } catch (error) {
          console.log(error, 'useEffect page');
        }
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
          setPage((prev) => prev + 1);
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
          <input
            className='inputSubmit'
            onClick={(e) => {
              e.preventDefault();
              setSubmit(!submit);
              setFocus();
              //   setPage((prev) => prev + 1);
            }}
            value='submit'
            type='submit'></input>
          <FontAwesomeIcon
            onClick={(e) => {
              e.preventDefault();
              setSubmit(!submit);
              setFocus();
              setPage((prev) => prev + 1);
            }}
            className='searchIcon'
            icon={faSearch}
          />
          <div className='ratingStyle'>
            <select
              onChange={(e) => {
                setSelectedUriRating(e.target.value);
              }}
              name='rating'
              id='ratingSelect'>
              <option value=''>Choose a rating</option>
              <option value='=g'>g</option>
              <option value='=pg'>pg</option>
              <option value='=pg-13'>pg-13</option>
              <option value='=r'>r</option>
            </select>
          </div>
        </SearchBarStyle>
      </form>
      <>
        <div>
          {list.map((v, i) => (
            <div>
              <List
                list={list}
                isGifDataLoading={isGifDataLoading}
                v={v}
                i={i}
              />
            </div>
          ))}
        </div>
        <LoadTrigger ref={loadMore} />
      </>
    </div>
  );
};
export default React.memo(Home);
