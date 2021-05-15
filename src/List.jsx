import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const ListStyle = styled.div`
  padding: 0;
  margin: 0;
  ul {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 2rem;
    li {
      list-style: none;
    }
  }
  img {
    width: 30vw;
  }
  .loaded {
    visibility: 'hidden';
  }
`;

const ImageWithLoading = ({ src, placeholder }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setIsLoaded(true);
      setCurrentSrc(src);
    };
  }, [src]);
  // 조건이 props인 v에도 반응하는가?
  return (
    <div>
      <img
        src={currentSrc}
        style={{
          // backgroundColor: isLoaded ? 'none' : 'rgba(#292929)',
          width: isLoaded ? '50vw' : '30vw',
          height: isLoaded ? '50vh' : '30vw',
          backgroundColor: isLoaded ? 'none' : 'red',
          opacity: isLoaded ? 1 : 0.1,
          transition: 'opacity 2.10s ease-in-out',
        }}
      />
    </div>
  );
};

const List = ({ list, v, i }) => {
  return (
    <>
      <ListStyle>
        <div>
          <ul>
            <li key={v.title + i}>
              <ImageWithLoading
                src={v.images.downsized_medium.url}
                placeholder={v.images.downsized_still.url}
                i={i}
              />
            </li>
          </ul>
        </div>
      </ListStyle>
    </>
  );
};
export default React.memo(List);

// const List = ({ list }) => {
//   return (
//     <>
//   <ListStyle>
//     <div>
//       <ul>
//         {list.map((v, i) => (
//           <li key={v.title + i}>
//             <div>
//               <svg width='100' height='100' viewBox='0 0 100 100'>
//                 <rect
//                   width='100'
//                   height='100'
//                   rx='10'
//                   ry='10'
//                   fill='#ccc'
//                 />
//               </svg>
//               <img
//                 src={v.images.downsized_medium.url}
//                 alt={v.title}
//                 loading='lazy'
//               />
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//    </ListStyle>
//     </>
//   );
// };
// export default React.memo(List);
{
  /* // <>
  <ListStyle>
    <div>
      <ul>
        {list.map((v, i) => (
          <li key={v.title + i}>
            <div>
              <svg width='100' height='100' viewBox='0 0 100 100'>
                <rect
                  width='100'
                  height='100'
                  rx='10'
                  ry='10'
                  fill='#ccc'
                />
              </svg>
              <img
                src={v.images.downsized_medium.url}
                alt={v.title}
                loading='lazy'
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
//   </ListStyle>
// </> */
}
