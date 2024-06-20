import React from 'react';
import { MdComputer } from 'react-icons/md';

const Thinking = () => {
  return (
    <div className="message">
      <div className="message__wrapper flex">
        <div className="message__pic flex items-center justify-center h-8 w-8 bg-slate-200 mx-2 rounded-full text-xl">
          <MdComputer />
        </div>
        <div className="text-left message__createdAt text-sm font-thin italic text-slate-600 dark:text-slate-300">
          <div className="message__thinking animate-pulse duration-1000 h-12 w-12 dark:text-white text-black text-xl">thinking...</div>
        </div>
      </div>
    </div>
  );
};

export default Thinking;
