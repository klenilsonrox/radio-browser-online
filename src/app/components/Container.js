import React from 'react';

const Container = ({children}) => {
  return (
    <div className="bg-[#2F2F33] w-full max-w-[1034px] py-4 px-4 text-white">
      {children}
    </div>
  );
};

export default Container;