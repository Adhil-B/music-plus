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
import { FaHistory } from "react-icons/fa";

const Searchbar = () => {
  const ref = React.useRef(null);
  const [suggestion, setSuggestion] = useState([]);
  const [searchH, setSearchH] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const {isTyping} = useSelector((state) => state.loadingBar);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  const fetchDataaae = async () => {
      setSearchH(localStorage?.getItem("searchhistory") ? localStorage.getItem("searchhistory").split(',') : []);
      console.log(searchH)
      const suggg = await suggest("hello");
    };
    fetchDataaae();
  }, []);
  
  const handleSubmit = (e) => {
    if (searchTerm === '') {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    dispatch(setIsTyping(false));
    setSearchH([searchTerm,...searchH])
    router.push(`/search/${searchTerm}`);
  };
  const handleFocus = () => {
    dispatch(setIsTyping(true));
  };
  
  
  useEffect(() => {
  const fetchDataaaee = async () => {
    if (searchH.length > 0){
    localStorage?.setItem("searchhistory" , searchH)
    console.log('changed-'+searchH)
    }
    };
    fetchDataaaee();
  }, [searchH]);
  
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
     <div onClick={() => dispatch(setIsTyping(false))} className={`${isTyping ? '':'hidden'} fixed left-0 bg-black sm:bg-transparent brightness-50 fixed blur-[900px] h-[100vh] t-[0px] ml-[-10px] w-[100vw] z-[30] bg-[hsla(0, 0%, 0%, 0.8)]`}></div>

    <form onSubmit={handleSubmit} autoComplete="off" className={`${isTyping ? 'shadow-[0px_0px_0px_5000px_#00000090] sm:shadow-[0px_0px_0px_0px_#00000090] bg-[#00000090]' : ''} z-[35] p-2 text-gray-400 relative focus-within:text-gray-600`}>
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

       <div className={`${isTyping ? '':'hidden'} ${suggestion.length < 1 && searchH.length < 1 ? 'hidden':''} !blur max-w-[320px] !pl-[0px] !mt-[5px] !rounded-[30px] !h-auto z-[39] fixed t-25vh asearch w-[87%] p-[10px] `}>
        <div className={`flex w-40 md:w-80 items-center mt-[10px] cursor-pointer group border-b-[2px] border-[#ffffff00] justify-between`}>
        <div className={`${suggestion.length < 1 ? 'hidden':''} grid items-center gap-5`}>

              
        {suggestion.map((suggested, index) => (
        <div
        key={index}
        onClick={() => {
        setSearchTerm(suggested);
        setSearchH([suggested,...searchH])
        dispatch(setIsTyping(false));
        router.push(`/search/${suggested}`);
        }}
        className="items-center text-gray-400 w-[80vw] sm:w-[60vw] sm:w-24 md:w-64 flex flex-row justify-start mb-[5px]">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4 text-gray-300 min-w-[21px] mr-[8px]" />
        <p className="text-gray-400 truncate text-base" >{suggested}</p> 
        </div>
        ))}          
        </div>


        <div className={`${searchH.length < 1 || suggestion.length > 0 ? 'hidden':''} grid items-center gap-5`}>   
        {searchH.slice(0, 5).map((search, index) => (
        <div
        key={index}
        onClick={() => {
        setSearchTerm(search);
        setSearchH([search,...searchH.filter(function(e) { return e !== search })])
        dispatch(setIsTyping(false));
        router.push(`/search/${search}`);
        }}
        className="items-center text-gray-400 w-[80vw] sm:w-[60vw] sm:w-24 md:w-64 flex flex-row justify-start mb-[5px]">
        <FaHistory aria-hidden="true" className="w-5 h-5 ml-4 text-gray-300 min-w-[21px] mr-[8px]" />
        <p className="text-gray-400 truncate text-base" >{search}</p> 
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
