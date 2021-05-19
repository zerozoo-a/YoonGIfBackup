import * as React from 'react';

function Sun({ width, height, rectWidth, rectHeight, fill }) {
  return (
    <svg
      width={width}
      height={height}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <rect width={rectWidth} height={rectHeight} rx='20' fill={fill} />
      <ellipse cx='30' cy='92' rx='13' ry='8' fill='#FBFBFB' />
      <ellipse cx='75' cy='98.5' rx='25' ry='15.5' fill='#EEE' />
      <circle cx='62' cy='62' r='38' fill='#F6DD67' />
      <ellipse cx='100' cy='92' rx='19' ry='17' fill='#EBEBEB' />
      <ellipse cx='97' cy='99' rx='22' ry='15' fill='#FBFBFB' />
    </svg>
  );
}

export default Sun;
