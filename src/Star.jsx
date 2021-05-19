import * as React from 'react';

function Star(props) {
  return (
    <svg
      width={props.width}
      height={props.height}
      fill='current'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <rect
        width={props.rectWidth}
        height={props.rectHeight}
        rx='20'
        fill={props.fill}
      />
      <path
        id='star'
        d='M56.694 31.746c1.386-4.827 8.227-4.827 9.612 0l3.889 13.551a5 5 0 004.98 3.618l14.088-.49c5.02-.173 7.134 6.333 2.97 9.142l-11.685 7.886a5 5 0 00-1.902 5.854l4.819 13.248c1.716 4.72-3.818 8.741-7.777 5.65l-11.11-8.677a5 5 0 00-6.155 0l-11.111 8.677c-3.959 3.091-9.493-.93-7.777-5.65l4.819-13.248a5 5 0 00-1.902-5.854l-11.685-7.886c-4.164-2.81-2.05-9.315 2.97-9.141l14.089.489a5 5 0 004.98-3.618l3.888-13.55z'
        fill='#F6DD67'
      />
    </svg>
  );
}

export default Star;
