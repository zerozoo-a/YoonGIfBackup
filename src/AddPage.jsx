import React from 'react';

const AddPage = ({ page, setPage }) => {
  return (
    <>
      <div onClick={() => setPage((prev) => prev + 1)}></div>
    </>
  );
};

export default AddPage;
