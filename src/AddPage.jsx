import React from 'react';

const AddPage = ({ page, setPage }) => {
  return (
    <>
      <div onClick={() => setPage((prev) => prev + 1)}>hahahaha!</div>
    </>
  );
};

export default AddPage;
