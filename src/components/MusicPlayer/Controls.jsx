'use client';
import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { TbRepeat, TbRepeatOnce, TbArrowsShuffle } from 'react-icons/tb';
import { FaCirclePause } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import Downloader from './Downloader';
import FavouriteButton from './FavouriteButton';


const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong, activeSong, fullScreen, handleAddToFavourite, favouriteSongs, loading, swipe }) => {
  return (
    <div className={`flex items-center justify-around md:w-80 text-lg lg:w-80 2xl:w-80 gap-4 ${fullScreen ? 'sm:gap-0' : ''}`}>
      <FavouriteButton favouriteSongs={favouriteSongs} activeSong={activeSong} loading={loading} handleAddToFavourite={handleAddToFavourite} divstyle={" sm:block hidden"} />
      {
        !repeat ? (
          <TbRepeat title='Repeat' size={25} color={'white'} onClick={(e) => { e.stopPropagation(); setRepeat((prev) => !prev) }} className={`${!fullScreen ? 'hidden md:block' : ' m-3'} cursor-pointer absolute left-[25px] sm:static`} />) : (
          <TbRepeatOnce title='Repeat Once' size={25} color={repeat ? '#00e6e6' : 'white'} onClick={(e) => { e.stopPropagation(); setRepeat((prev) => !prev) }} className={`${!fullScreen ? 'hidden md:block' : ' m-3'} cursor-pointer absolute left-[25px] sm:static`} />
        )

      }

      {<MdSkipPrevious title='Previous' size={fullScreen ? 40 : 35} color={currentSongs?.length ? '#ffff' : '#b3b3b3'} className="cursor-pointer" onClick={handlePrevSong} />}
      {isPlaying ? (
      
      
       fullScreen ? (
        <>
        <FaCirclePause size={fullScreen ? 55 : 45} color={'white'} onClick={handlePlayPause} className={`${swipe} cursor-pointer block sm:hidden`} />
        <BsFillPauseFill size={45} color={'#00e6e6'} onClick={handlePlayPause} className="cursor-pointer hidden sm:block " />
        </>
        ) : (
        <BsFillPauseFill size={45} color={'#00e6e6'} onClick={handlePlayPause} className="cursor-pointer" />
        )
      
      
      ) : (
      
      
        fullScreen ? (
        <>
        <FaCirclePlay size={fullScreen ? 55 : 45} color={'white'} onClick={handlePlayPause} className={`${swipe} cursor-pointer block sm:hidden`} />
        <BsFillPlayFill size={45} color={'#00e6e6'} onClick={handlePlayPause} className="cursor-pointer hidden sm:block" />
        </>
        ) : (
        <BsFillPlayFill size={45} color={'#00e6e6'} onClick={handlePlayPause} className="cursor-pointer" />
        )
      
      
      )}
      {<MdSkipNext title='Next' size={fullScreen ? 40 : 35} color={currentSongs?.length ? '#ffff' : '#b3b3b3'} className="cursor-pointer" onClick={handleNextSong} />}
      <TbArrowsShuffle title='Shuffle' size={25} color={shuffle ? '#00e6e6' : 'white'} onClick={(e) => { e.stopPropagation(); setShuffle((prev) => !prev) }} className={`${!fullScreen ? 'hidden md:block' : 'm-3'} cursor-pointer absolute right-[25px] sm:static`} />
      {activeSong?.downloadUrl?.[4]?.link &&
        <div className=' hidden sm:block mt-1 '>
          <Downloader activeSong={activeSong} fullScreen={fullScreen} />
        </div>
      }
    </div>
  )
};

export default Controls;
