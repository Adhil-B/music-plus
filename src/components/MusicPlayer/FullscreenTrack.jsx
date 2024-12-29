
import Lyrics from './Lyrics'
import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setFullScreen } from '@/redux/features/playerSlice'
import { useSwipeable } from 'react-swipeable'

const FullscreenTrack = ({ fullScreen, activeSong, handlePrevSong, handleNextSong, scrollableDivRef, currentSongs, scrollPosition }) => {
  const dispatch = useDispatch();
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextSong(),
    onSwipedRight: () => handlePrevSong(),
    onSwipedDown: () => { if (scrollPosition.scrollTop < 1) {dispatch(setFullScreen(false))} },
    preventDefaultTouchmoveEvent: true,
    preventScrollOnSwipe: true,
    trackMouse: true
  })
  const handlers1 = useSwipeable({
    onSwipedDown: () => { if (scrollPosition.scrollTop < 1) {dispatch(setFullScreen(false))} },
    preventDefaultTouchmoveEvent: true,
    preventScrollOnSwipe: true,
    trackMouse: true
  })



  return (
    <div {...handlers} className={`${fullScreen ? 'block' : 'hidden'} w-[100%] flex lg:flex-row lg:w-[100vw] mx-auto flex-col  lg:justify-between sm:mt-10`}>
      <div className="flex flex-col items-center lg:w-[50%] h-[55vh] sm:h-auto mt-[15vh] sm:mt-auto" >
        <div
          {...handlers}
         className=" h-80 w-80 lg:h-[60vh] lg:w-[60vh] sm:mt-5  ">
          <img src={activeSong?.image?.[2].link} alt="cover art" className="h-[100%] object-cover rounded-lg" />
        </div>
        <div onClick={(e) => e.stopPropagation()} className=" w-full select-none cursor-pointer text-center my-5">
          <p className="truncate text-white font-bold text-2xl mx-[25px] mb-1 px-3">
            {activeSong?.name ? activeSong?.name.replace("&#039;", "'").replace("&amp;", "&").replaceAll('&quot;','"') : 'Song'}
          </p>
          <p className="truncate text-gray-300 mx-[25px] px-3">
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
        <Lyrics activeSong={activeSong} scrollableDivRef={scrollableDivRef} currentSongs={currentSongs}/>
      </div>
    </div>
  )
}

export default FullscreenTrack
