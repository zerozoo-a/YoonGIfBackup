import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import List from './List';

const SearchBarStyle = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 13vh;
  transform: translate(-50%, 0%);
  top: 0;
  left: 50%;
  background-color: black;

  & :focus {
    outline: none;
  }
  #logoImg {
    position: fixed;
    top: -0.9vh;
    left: 2vw;
    img {
      width: 6vw;
      height: 7vw;
    }
  }
  .inputSearch {
    width: 60vw;
    height: 5vh;
    font-size: 2vw;
    transform: translate(-50%, 0%);
    margin-left: 50%;
    margin-top: 2.2vh;
    padding: 0;
    border: 10px solid hotPink;
  }
  .inputSubmit {
    visibility: hidden;
  }
  .searchIcon {
    position: absolute;
    width: 5vh;
    height: 5vh;
    margin-left: 76vw;
    top: 6.1vh;
    padding: 0.5vw;
    color: #f5f5f1;
    background-color: hotPink;
    transform: translate(-50%, -50%);
    cursor: pointer;
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
  @media screen and (max-width: 1020px) {
    .searchIcon {
      position: absolute;
      width: 5vh;
      height: 5vh;
      margin-left: 70%;
      top: 6vh;
      padding: 0.5vw;
      color: #f5f5f1;
      background-color: hotPink;
      transform: translate(-50%, -50%);
      border: none;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 855px) {
    #logoImg {
      position: fixed;
      top: -1.5vh;
      left: 2vw;
      img {
        width: 10vw;
        height: 11vw;
      }
    }
    .searchIcon {
      position: absolute;
      width: 5vh;
      height: 5vh;
      margin-left: 67.5%;
      top: 6vh;
      padding: 1vw;
      color: #f5f5f1;
      background-color: hotPink;
      transform: translate(-50%, -50%);
      border-right: 0.3rem solid hotpink;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 650px) {
    #logoImg {
      position: fixed;
      top: 0.9vh;
      left: 2vw;
      img {
        width: 10vw;
        height: 11vw;
      }
    }
    .searchIcon {
      position: absolute;
      width: 5vh;
      height: 5vh;
      margin-left: 66%;
      top: 6vh;
      padding: 0.5vw;
      color: #f5f5f1;
      background-color: hotPink;
      /* background-color: blue; */
      transform: translate(-50%, -50%);
      border: none;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 539px) {
    height: 16vh;
    #logoImg {
      position: fixed;
      top: 0.9vh;
      left: 2vw;
      img {
        width: 17vw;
        height: 18vw;
      }
    }
    .searchIcon {
      position: absolute;
      width: 5vh;
      height: 5vh;
      margin-left: 65%;
      top: 6vh;
      padding: 0.5vw;
      color: #f5f5f1;
      background-color: hotPink;
      /* background-color: blue; */
      transform: translate(-50%, -50%);
      border: none;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 450px) {
    height: 16vh;
    #logoImg {
      position: fixed;
      top: 0.9vh;
      left: 2vw;
      img {
        width: 18vw;
        height: 19vw;
      }
    }
    .inputSearch {
      width: 80vw;
      height: 3vh;
      font-size: 3vw;
      transform: translate(-50%, 0%);
      margin-top: 2.2vh;
      padding: 0;
      border: 10px solid hotPink;
    }
    .searchIcon {
      position: absolute;
      width: 3vh;
      height: 3vh;
      margin-left: 65%;
      top: 5vh;
      padding: 0.5vw;
      color: #f5f5f1;
      background-color: hotPink;
      /* background-color: blue; */
      transform: translate(-50%, -50%);
      border: none;
      cursor: pointer;
    }

    .ratingStyle {
      position: fixed;
      transform: translate(-50%, 0%);
      left: 50%;
      top: 9.5vh;
      font-size: 1rem;
      border: 3px solid rgb(223, 87, 155);
    }
  }
`;
const FlexBody = styled.div`
  display: flex;
  overflow: scroll;
  width: 100vw;
  height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20vh;
  img {
    padding: 1rem;
  }

  @media screen and (max-width: 650px) {
    box-shadow: 1;
    img {
      padding: 2rem;
    }
  }
  @media screen and (max-width: 449px) {
    flex-direction: row;
    img {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }
`;
const Home = () => {
  const [isGifDataLoading, setIsGifDataLoading] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedUriRating, setSelectedUriRating] = useState(null);
  const focusHere = useRef(null);
  // main screen composition

  async function getFetch(__userInput, __selectedUriRating) {
    setIsGifDataLoading(false);
    const uriAdrAndKey =
      'https://api.giphy.com/v1/gifs/search?api_key=OhokD3sYb24zaFFpUiO90QSMR7nanYQs&';
    let uriQuery = 'q=query';
    let uriLimit = '&limit=2';
    let uriOffset = '&offset=0';
    let uriRatingAndLang = '&rating=g&lang=en';
    let changedUriRatingAndLang = null;

    if (__selectedUriRating) {
      changedUriRatingAndLang = uriRatingAndLang.replace(
        '=g',
        __selectedUriRating
      );
    }

    if (list.length === 0) {
      //   if (__selectedUriRating) uriRatingAndLang = changedUriRatingAndLang;
      if (changedUriRatingAndLang) uriRatingAndLang = changedUriRatingAndLang;

      let afterQuery = uriQuery.replace('query', __userInput);
      let uri =
        uriAdrAndKey + afterQuery + uriLimit + uriOffset + uriRatingAndLang;
      const getData = await fetch(uri);
      const makeJson = await getData.json();
      setList([...makeJson.data]);
      setIsGifDataLoading(true);
      //   ioFnc(isGifDataLoading);
    } else {
      if (changedUriRatingAndLang) uriRatingAndLang = changedUriRatingAndLang;
      let afterQuery = uriQuery.replace('query', __userInput);
      let afterOffset = uriOffset.replace(/[0-9]/, (page * 2 + 1).toString());
      let uri =
        uriAdrAndKey + afterQuery + uriLimit + afterOffset + uriRatingAndLang;
      const getData = await fetch(uri);
      const makeJson = await getData.json();
      setList((prev) => [...prev, ...makeJson.data]);
      setIsGifDataLoading(true);
      //   ioFnc(isGifDataLoading);
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
  return (
    <div>
      <form>
        <SearchBarStyle>
          <div id='logoImg'>
            <a href='javascript:location.reload(true);'>
              <img src='https://media.vlpt.us/images/zerozoo-front/post/80293c3e-e847-4448-82dc-aa7afd56e8d6/logo_200x200.png' />
            </a>
          </div>
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
            }}
            value='submit'
            type='submit'
          />
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
      <div>
        <FlexBody>
          {list.map((v, i) => (
            <List
              list={list}
              isGifDataLoading={isGifDataLoading}
              v={v}
              i={i}
              page={page}
              setPage={setPage}
            />
          ))}
        </FlexBody>
      </div>
    </div>
  );
};
export default React.memo(Home);
