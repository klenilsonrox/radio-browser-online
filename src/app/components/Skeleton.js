import React from 'react';

const Skeleton = () => {
    return (
      <ul className="mt-6 flex flex-col gap-3">
        {[...Array(10)].map((_, index) => (
          <li
            key={index}
            className="bg-[#4D4D56] mx-2 h-[48px] rounded-[10px] flex items-center text-transparent px-4 animate-pulse"
          >
            <div className="bg-[#62626C] w-full h-[33px] rounded-[10px]"></div>
          </li>
        ))}
      </ul>
    );
  };

export default Skeleton;