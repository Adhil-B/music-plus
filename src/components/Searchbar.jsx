'use client'
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setIsTyping } from '@/redux/features/loadingBarSlice';
import { useSelector } from 'react-redux'

const Searchbar = () => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const {isTyping} = useSelector((state) => state.loadingBar);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    if (searchTerm === '') {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
  };
  const handleFocus = () => {
    dispatch(setIsTyping(true));
  };
  const handleBlur = () => {
    dispatch(setIsTyping(false));
  };
/*<Autocomplete
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="search-field"
        id="search-field"
        className="bsearch flex-1 bg-transparent focus:border-b border-white lg:w-64 placeholder-gray-300 outline-none text-base text-white p-4"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) =>
        }/>
        */
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={`${isTyping ? 'md:shadow-[0px_0px_0px_900px_#00000090] md:bg-[#00000090]' : ''} z-90 p-2 text-gray-400 relative focus-within:text-gray-600`}>
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="asearch flex flex-row justify-start items-center">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4 text-gray-300" />
        
        
        <input
        onFocus={handleFocus}
        onBlur={handleBlur}
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="bsearch flex-1 bg-transparent focus:border-b border-white lg:w-64 placeholder-gray-300 outline-none text-base text-white p-4"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        
      </div>
      <div className={`${isTyping ? '':'hidden'}`}>
         <div
            onClick={() => {
                handlePlayClick(song,index);
            }}
             className={`flex w-40 md:w-80 items-center mt-5 cursor-pointer group border-b-[2px] border-[#ffffff00] justify-between ${activeSong?.id === song?.id && " text-[#00e6e6]"}`}>
                <div className="flex items-center gap-5">

              <div className="w-[60vw] sm:w-24 md:w-64">
                <p className="text-sm lg:text-[1rem] font-semibold truncate">{
                    hello
                }</p>
                <p className="text-gray-400 truncate text-xs">cool</p>
              </div>
              </div>
            </div>
    </div>
    </form>
    
  );
};

export default Searchbar;
