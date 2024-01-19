'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, prevSong, setActiveSong, playPause, setFullScreen } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import FullscreenTrack from './FullscreenTrack';
import Lyrics from './Lyrics';
import Downloader from './Downloader';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { addFavourite, getFavourite, getRecommendedSongs } from '@/services/dataAPI';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FavouriteButton from './FavouriteButton';
import { usePalette } from 'react-palette';


const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying, fullScreen, autoAdd } = useSelector((state) => state.player);
  const { isTyping } = useSelector(state => state.loadingBar);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [favouriteSongs, setFavouriteSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSession();
  const router = useRouter();
  const { data } = usePalette(activeSong?.image?.[1]?.link);

  useEffect(() => {
    if (currentSongs?.length) dispatch(playPause(true));
  }, [currentIndex]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setLoading(true);
        const res = await getFavourite();
        // console.log("favourites",res);
        if (res) {
          setFavouriteSongs(res);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchFavourites();
    // change page title to song name
    if (activeSong?.name) {
      document.title = activeSong?.name;
    }
  }, [activeSong]);

  // off scroll when full screen
  useEffect(() => {
    document.documentElement.style.overflow = fullScreen ? 'hidden' : 'auto';

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [fullScreen]);

  // Hotkey for play pause
  const handleKeyPress = (event) => {
    // Check if the pressed key is the spacebar (keyCode 32 or key " ")
    if (!isTyping && (event.keyCode === 32 || event.key === " ")) {
      event.preventDefault();
      handlePlayPause();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handlePlayPause = (e) => {
    e?.stopPropagation();
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = async (e) => {
    e?.stopPropagation();
    dispatch(playPause(false));

    if (!shuffle) {
      if (currentIndex === (currentSongs.length - 1)){
        const songData = activeSong;
        const recommendedSongs = await getRecommendedSongs(songData?.primaryArtistsId?.split(",")[0], songData?.id, songData?.language);
      // remove duplicate songs in recommendedSongs array and currentSongs array
      const filteredRecommendedSongs = recommendedSongs?.filter((song) => !currentSongs?.find((s) => s?.id === song?.id));
      dispatch(setActiveSong({
        song: songData,
        data: currentSongs?.find((s) => s?.id === songData?.id) ? currentSongs : autoAdd ? [...currentSongs, songData, ...filteredRecommendedSongs] : [...currentSongs, songData],
        i: currentSongs?.find((s) => s?.id === songData?.id) ? currentSongs?.findIndex((s) => s?.id === songData?.id) : currentSongs?.length
      }));
      }
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = (e) => {
    e?.stopPropagation();
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handleAddToFavourite = async (favsong) => {
    if (status === 'unauthenticated') {
      dispatch(setFullScreen(false));
      router.push('/login');
    }

    if (favsong?.id && status === 'authenticated') {
      try {
        setLoading(true);
        // optimistic update
        if (favouriteSongs?.find(song => song === favsong?.id)) {
          setFavouriteSongs(favouriteSongs?.filter(song => song !== favsong?.id));
        }
        else {
          setFavouriteSongs([...favouriteSongs, favsong?.id]);
        }
        const res = await addFavourite(favsong);
        if (res?.success === true) {
          setFavouriteSongs(res?.data?.favourites);
        }
        setLoading(false);

      } catch (error) {
        setLoading(false);
        console.log("add to fav error", error);
      }

    }
  };



  return (
    <div className={`overflow-y-scroll relative items-center lg:items-stretch lg:overflow-visible hideScrollBar sm:px-12  flex flex-col transition-all duration-100 ${fullScreen ? 'h-[100vh] w-[100vw]' : 'w-full h-20 px-8 bg-black '}`}
      onClick={() => {
        if (activeSong?.id) { dispatch(setFullScreen(!fullScreen)); }
      }}
      style={{
        backgroundColor: data.darkVibrant ? `rgba(${parseInt(data?.darkVibrant?.slice(1, 3), 16)}, ${parseInt(data?.darkVibrant?.slice(3, 5), 16)}, ${parseInt(data?.darkVibrant?.slice(5, 7), 16)}, 0.3)` : 'rgba(0,0,0,0.2)',
      }}
    >
      <HiOutlineChevronDown onClick={
        (e) => {
          e.stopPropagation();
          dispatch(setFullScreen(!fullScreen));
        }
      } className={` absolute top-16 md:top-10 right-7 text-white text-3xl cursor-pointer ${fullScreen ? '' : 'hidden'}`} />
      <FullscreenTrack handleNextSong={handleNextSong} handlePrevSong={handlePrevSong} activeSong={activeSong} fullScreen={fullScreen} />
      <div className=' flex items-center justify-between pt-2 w-[100vw]'>
        <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} fullScreen={fullScreen} />
        <div className="flex-1 flex flex-col items-center justify-center w-[50%] h-[30vh] sm:h-auto">
          <Seekbar
            value={appTime}
            min="0"
            max={duration}
            fullScreen={fullScreen}
            onInput={(event) => setSeekTime(event.target.value)}
            setSeekTime={setSeekTime}
            appTime={appTime}
            style={"mb-[20px] block sm:!hidden"}
          />
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            activeSong={activeSong}
            fullScreen={fullScreen}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
            handleAddToFavourite={handleAddToFavourite}
            favouriteSongs={favouriteSongs}
            loading={loading}
          />
          <Seekbar
            value={appTime}
            min="0"
            max={duration}
            fullScreen={fullScreen}
            onInput={(event) => setSeekTime(event.target.value)}
            setSeekTime={setSeekTime}
            appTime={appTime}
            style={"hidden sm:flex"}
          />
          <div className={`${fullScreen ? '' : 'hidden'}  sm:hidden flex items-center justify-center gap-4 mt-[50px]`}>
            <FavouriteButton favouriteSongs={favouriteSongs} activeSong={activeSong} loading={loading} handleAddToFavourite={handleAddToFavourite} style={"mb-4"} divstyle={"left-[25px] ml-3 absolute sm:ml-[0px] sm:static"}/>

            <div className={`mb-3 sm:hidden flex items-center justify-center right-[25px] mr-3 absolute sm:mr-[0px] sm:static`}>
              <Downloader activeSong={activeSong} fullScreen={fullScreen} />
            </div>
          </div>
          <Player
            activeSong={activeSong}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            handlePlayPause={handlePlayPause}
            handleNextSong={handleNextSong}
            handlePrevSong={handlePrevSong}
            onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
            onLoadedData={(event) => setDuration(event.target.duration)}
            appTime={appTime}
            setSeekTime={setSeekTime}
          />
        </div>
        <VolumeBar activeSong={activeSong} data={data} fullScreen={fullScreen} value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
      </div>
      {
        fullScreen &&
        <div className=' lg:hidden'>
          <Lyrics activeSong={activeSong} currentSongs={currentSongs} />
        </div>
      }
    </div>
  );
};

export default MusicPlayer;
