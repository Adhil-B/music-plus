'use client'
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setIsTyping } from '@/redux/features/loadingBarSlice';
import { useSelector } from 'react-redux';
import { suggest } from '@/services/dataAPI';
import { useLayoutEffect, useEffect } from "react";
import { Link } from 'next/link';

const Searchbar = () => {
  const ref = React.useRef(null);
  const [suggestion, setSuggestion] = useState([]);
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
  
  
  useEffect(() => {
  //}
  const fetchDataaa = async () => {
      if (searchTerm.length > 2){
      const sugg = await suggest(searchTerm);
      setSuggestion(sugg);
      }else{
      setSuggestion([]);  
      }
    };

    fetchDataaa();
  //fetchFavori();
  }, [searchTerm]);
  const handleSuggClick = (suggested) => {
      setSearchTerm(suggested);
      router.push(`/search/${suggested}`);
      };

    useEffect(() => {
    document.documentElement.style.overflow = isTyping ? 'hidden' : 'auto';

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
    }, [isTyping]);
  
  return (
    <div>
     <div onClick={() => dispatch(setIsTyping(false))} className={`${isTyping ? '':'hidden'} bg-black brightness-50 fixed blur-[900px] h-[100vh] t-[0px] ml-[-10px] w-[100vw] z-[30] bg-[hsla(0, 0%, 0%, 0.8)]`}></div>

    <form onSubmit={handleSubmit} autoComplete="off" className={`${isTyping ? 'shadow-[0px_0px_0px_900px_#00000090] bg-[#00000090]' : ''} z-[35] p-2 text-gray-400 relative focus-within:text-gray-600`}>
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="asearch z-[91] flex flex-row justify-start items-center">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4 text-gray-300" />
        
        
        <input
        onFocus={handleFocus}
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

       <div className={`${isTyping ? '':'hidden'} ${suggestion.length < 1 ? 'hidden':''} !pl-[0px] !mt-[5px] !rounded-[30px] !h-auto z-[39] fixed t-25vh asearch w-[87%] p-[10px] `}>
        <div className={`flex w-40 md:w-80 items-center mt-[10px] cursor-pointer group border-b-[2px] border-[#ffffff00] justify-between`}>
        <div className="grid items-center gap-5">

              
        {suggestion.map((suggested, index) => (
  
        <div
        key={index}
        onClick={() => {
        console.log('testing');
        setSearchTerm(suggested);
        dispatch(setIsTyping(false));
        router.push(`/search/${suggested}`);

        }}
        className="flex items-center text-gray-400 w-full cursor-pointer mb-2">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4 text-gray-300 min-w-[21px] mr-[8px]" />
        <p className="text-gray-400 truncate text-base" >

{suggested}

</p> 
        </div>
        ))}
                
        </div>
        </div>


       
    </div>
    </form>
            
    </div>
  );
};

export default Searchbar;
