import React from 'react';

const Track = ({ isPlaying, isActive, activeSong, fullScreen }) => (
  <div className={`lg:flex-1 sm:w-auto flex items-center justify-start ${fullScreen ? 'hidden w-[60%]':'w-[55%] sm:w-[60%] '}`}>
    <div className={`${isPlaying && isActive ? 'animate-[spin_15s_linear_infinite]' : ''} hidden sm:block ml-4 h-16 w-16`}>
      <img src={activeSong?.image?.[2].link || 'https://musicplus-web.vercel.app/Music.png'} alt="cover art" className="h-[100%] object-cover rounded-full"/>
    </div>
    <div className={`${fullScreen ? 'ml-4 w-[190px]' : 'w-[90%] sm:w-[190px] ml-[10px] sm:ml-4'} select-none cursor-pointer`}>
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.name ? activeSong?.name.replace("&#039;", "'").replace("&amp;", "&").replaceAll('&quot;','"') : 'Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.primaryArtists ? activeSong?.primaryArtists : 'Artist'}
      </p>
    </div>
  </div>
);

export default Track;
