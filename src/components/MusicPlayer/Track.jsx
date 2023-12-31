import React from 'react';

const Track = ({ isPlaying, isActive, activeSong, fullScreen }) => (
  <div className={`flex-1 flex items-center justify-start ${fullScreen ? 'hidden':''}`}>
    <div className={`${isPlaying && isActive ? 'animate-[spin_15s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.image?.[2].link || 'https://musicplus-web.vercel.app/Music.png'} alt="cover art" className="h-[100%] object-cover rounded-full"/>
    </div>
    <div className={`w-[190px] select-none cursor-pointer`}>
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
