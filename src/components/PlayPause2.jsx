import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause2 = ({ isPlaying, activeSong, song, handlePause, handlePlay, loading }) => (
  loading ? (
    <div className="custom-loader group-hover:block hidden absolute top-[24%] left-[26%] text-gray-200"></div>
  ) :
  isPlaying && activeSong?.name === song.name ? (
  <FaPauseCircle
    size={25}
    className=" group-hover:block hidden absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
    onClick={handlePause}
  />
) : (
  <FaPlayCircle
    size={25}
    className=" group-hover:block hidden absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
    onClick={handlePlay}
  />
));

export default PlayPause2;
