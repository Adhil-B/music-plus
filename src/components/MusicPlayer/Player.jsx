'use client';
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat,handlePlayPause,handlePrevSong,handleNextSong, setSeekTime, appTime }) => {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  
  // media session metadata:
  const mediaMetaData = activeSong.name
    ? {
        title: activeSong?.name?.replaceAll("&#039;", "'")?.replaceAll("&amp;", "&")?.replaceAll('&quot;','"'),
        artist: activeSong?.primaryArtists,
        album: activeSong?.album.name?.replaceAll("&#039;", "'")?.replaceAll("&amp;", "&")?.replaceAll('&quot;','"'),
        artwork: [
          {
            src: activeSong.image[2]?.link,
            sizes: '500x500',
            type: 'image/jpg',
          },
        ],
      }
    : {};
    useEffect(() => {
      // Check if the Media Session API is available in the browser environment
      if ('mediaSession' in navigator) {
        // Set media metadata
        navigator.mediaSession.metadata = new window.MediaMetadata(mediaMetaData);
  
        // Define media session event handlers
        navigator.mediaSession.setActionHandler('play', onPlay);
        navigator.mediaSession.setActionHandler('pause', onPause);
        navigator.mediaSession.setActionHandler('previoustrack', onPreviousTrack);
        navigator.mediaSession.setActionHandler('nexttrack', onNextTrack);
        navigator.mediaSession.setActionHandler('seekbackward', () => { setSeekTime(appTime - 5)});
        navigator.mediaSession.setActionHandler('seekforward', () => { setSeekTime(appTime + 5)});
      }
    }, [mediaMetaData]);
  
    // media session handlers:
    const onPlay = () => {
      handlePlayPause();
    };
  
    const onPause = () => {
      handlePlayPause();
    };

    const onPreviousTrack = () => {
      handlePrevSong();      
    };

    const onNextTrack = () => {
      handleNextSong();      
    };

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  setInterval(function(){

 	if (!ref.current){return;}

	if (!navigator.mediaSession) {return;}

	if (ref.current.duration > 0 === false){return;}

	navigator.mediaSession.setPositionState({duration: parseInt(ref.current.duration), playbackRate: ref.current.playbackRate, position: parseInt(ref.current.currentTime) });

}, 300);
  
  return (
    <>
    <audio
      src={activeSong?.downloadUrl?.[parseInt(localStorage?.getItem("qualities") ? JSON.parse(localStorage.getItem("qualities")) : ["4"])]?.link}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
    </>
  );
};

export default Player;
