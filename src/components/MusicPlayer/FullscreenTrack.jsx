
import Lyrics from './Lyrics'
import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setFullScreen } from '@/redux/features/playerSlice'
import { useSwipeable } from 'react-swipeable'

const FullscreenTrack = ({ fullScreen, activeSong, handlePrevSong, handleNextSong }) => {
  const dispatch = useDispatch();
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextSong(),
    onSwipedRight: () => handlePrevSong(),
    onSwipedDown: () => dispatch(setFullScreen(false)),
    preventDefaultTouchmoveEvent: true,
    preventScrollOnSwipe: true,
    trackMouse: true
  })


  return (
    <div className={`${fullScreen ? 'block' : 'hidden'} w-[100%] flex lg:flex-row lg:w-[100vw] mx-auto flex-col  lg:justify-between mt-10`}>
      <div className="flex flex-col items-center lg:w-[50%]">
        <div
          {...handlers}
         className=" h-80 w-80 lg:h-[60vh] lg:w-[60vh] sm:mt-5 mt-28 ">
          <img src={activeSong?.image?.[2].link} alt="cover art" className="h-[100%] object-contain rounded-lg" />
        </div>
        <div onClick={(e) => e.stopPropagation()} className=" w-full select-none cursor-pointer text-center my-5">
          <p className="truncate text-white font-bold text-2xl mx-[20px] mb-1">
            {activeSong?.name ? activeSong?.name.replace("&#039;", "'").replace("&amp;", "&").replaceAll('&quot;','"') : 'Song'}
          </p>
          <p className="truncate text-gray-300 mx-[20px]">
            {activeSong?.primaryArtists ? (
              activeSong?.primaryArtists?.split(",")?.map((artist, index) => (
                <React.Fragment key={index}>
                  <Link className=" hover:underline mx-1" href={`/artist/${activeSong?.primaryArtistsId?.split(",")[index]?.trim()}`} onClick={
                    () => {
                      dispatch(setFullScreen(false))
                    }
                  }>
                    {artist?.trim()}
                  </Link>
                  {index < activeSong.primaryArtists.split(",").length - 1 && ", "}
                </React.Fragment>
              ))
            ) : 'Artist'}
          </p>
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="h-[77vh] w-[50%] flex-col items-center lg:flex hidden">
        <Lyrics activeSong={activeSong} />
      </div>
    </div>
  )
}

export default FullscreenTrack
