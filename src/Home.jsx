import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import List from './List';
import ColorContext from './ColorContext';

const HomeStyle = styled.div`
  margin: 0px;
  padding: 0;
`;
const SearchBarStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 3rem;
  margin: 0;
  padding: 0;
  top: 0;
  background-color: black;
  & :focus {
    outline: none;
  }
  #logoImg {
    position: fixed;
    top: 0.5rem;
    left: 2vw;
    img {
      width: 56%;
      height: 56%;
    }
  }
  .inputContainer {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    justify-content: center;
    align-items: center;
    .inputSearch {
      width: 40vw;
      height: 25px;
      font-size: 1rem;
      /* transform: translate(-50%, 0%); */
      /* margin-left: 50%; */
      margin-top: 10px;
      padding: 0;
    }
    .inputSubmit {
      position: absolute;
      visibility: hidden;
      right: 9999rem;
    }
    .searchIcon {
      color: white;
      cursor: pointer;
      transform: scale(1.5);
      margin-top: 10px;
      margin-left: -1rem;
      padding: 0.09rem;
      background-color: rgb(223, 87, 155);
    }
  }
  .ratingStyle {
    position: fixed;
    left: 83%;
    top: 0;
    margin-top: 10px;
    border: 0.5vw solid rgb(223, 87, 155);
  }
  .gifLoading {
    display: flex;
    flex-direction: row;
  }
`;
const FlexBodyContainer = styled.div`
  background-color: ${(props) => props.color};

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 0;
`;
const Home = () => {
  const [isGifDataLoading, setIsGifDataLoading] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedUriRating, setSelectedUriRating] = useState(null);
  const focusHere = useRef(null);
  const { state, actions } = useContext(ColorContext);
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
    <HomeStyle>
      <form>
        <SearchBarStyle>
          <div id='logoImg'>
            <a href='javascript:location.reload(true);'>
              <img src='https://user-images.githubusercontent.com/80259925/118811098-90217500-b8e7-11eb-9c83-5404cf54d62f.png' />
            </a>
          </div>

          <div className='inputContainer'>
            <input
              className='inputSearch'
              ref={focusHere}
              placeholder='Search GIF images 🥳'
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
          </div>

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
      <FlexBodyContainer
        id='listContainer'
        style={{
          backgroundColor: state.color,
        }}>
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
      </FlexBodyContainer>
    </HomeStyle>
  );
};
export default React.memo(Home);
