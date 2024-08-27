'use client'
import SwiperLayout from '@/components/Homepage/Swiper';
import SongCard from '@/components/Homepage/SongCard';
import { getRecommendedSongs, getSearchedData, getSearchedArtist, getSongData } from '@/services/dataAPI';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import { BsPlayFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong, setFullScreen } from '@/redux/features/playerSlice';
import Image from 'next/image';
import Link from 'next/link';
import SongListSkeleton from '@/components/SongListSkeleton';
import { setProgress } from '@/redux/features/loadingBarSlice';
import PlayPause2 from '@/components/PlayPause2';
/**/

const page = ({params}) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState(params.query);
    const [searchedData, setSearchedData] = useState(null);
    const [searchedArtist, setSearchedArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const {currentSongs, autoAdd, activeSong, isPlaying} = useSelector(state => state.player);
   

    useEffect(() => {
        const fetchData = async () => {
           dispatch(setProgress(70))
            const [response,response2] = await Promise.all([getSearchedData(query),getSearchedArtist(query)]);
            setSearchedData(response);
            setSearchedArtist(response2);
            setLoading(false);
            dispatch(setProgress(100))
        }
        fetchData();
    }, [query]);

    /*const handlePlayClick = async (song) => {
        if (song?.type === "song") {
            setLoading(true);
          const Data = await getSongData(song?.id);
          const songData = await Data?.[0]
            
          const recommendedSongs = await getRecommendedSongs(songData?.primaryArtistsId?.split(",")[0], songData?.id, songData?.language);
      // remove duplicate songs in recommendedSongs array and currentSongs array
          const filteredRecommendedSongs = recommendedSongs?.filter((song) => !currentSongs?.find((s) => s?.id === song?.id));
      dispatch(setActiveSong({
        song: songData,
        data: currentSongs?.find((s) => s?.id === songData?.id) ? currentSongs : autoAdd ? [...currentSongs, songData, ...filteredRecommendedSongs] : [...currentSongs, songData],
        i: currentSongs?.find((s) => s?.id === songData?.id) ? currentSongs?.findIndex((s) => s?.id === songData?.id) : currentSongs?.length
      }));
         /* dispatch(setActiveSong({ song: songData,
             data: currentSongs?.find((s) => s?.id === songData?.id) ? currentSongs : [...currentSongs, songData],
             i: currentSongs?.find((s) => s?.id === songData?.id) ? currentSongs?.findIndex((s) => s?.id === songData?.id) : currentSongs?.length
             }));*/
         /* dispatch(setFullScreen(true));
          dispatch(playPause(true));
            setLoading(false);
        }
      };*/

    const handlePlayClick = async (song) => {
    if (song?.type === "song") {
        setLoading(true);
      const Data = await getSongData(song?.id);
      const songData = await Data?.[0];
      dispatch(
        setActiveSong({
          song: songData,
          data: currentSongs?.find((s) => s?.id === songData?.id)
            ? currentSongs
            : [...currentSongs, songData],
          i: currentSongs?.find((s) => s?.id === songData?.id)
            ? currentSongs?.findIndex((s) => s?.id === songData?.id)
            : currentSongs?.length,
        })
      );
      dispatch(setFullScreen(true));
      dispatch(playPause(true));
        setLoading(false);
    }
  };
    
  return (
    <div>
        <div className="w-11/12 m-auto mt-16">
        <div className="mt-10 text-gray-200">
            <h1 className="text-3xl font-bold">Search results for "{query.replaceAll("%20"," ") }"</h1>
            <div className="mt-10 text-gray-200">
        <h2 className="text-2xl lg:text-4xl font-semibold">Songs</h2>
        {
            searchedData && searchedData?.songs?.results?.length > 0 ? (
                <div className="mt-5 aside bg-[#02081363] pt-[3px] pr-[15px] pb-[8px] pl-[20px] rounded-lg">
                    {
                        searchedData?.songs?.results?.map((song, index) => (
                            <div key={index}
            onClick={() => {
                handlePlayClick(song);
            }}
             className={`flex items-center  mt-5 cursor-pointer group ${searchedData?.songs?.results?.length == (index + 1) ? '' : 'border-b-[2px]'} border-[#9ca3af61] justify-between`}>
                <div className="flex items-center gap-5">
              <div className=" relative">
                <img src={song?.image?.[2]?.url ? song?.image?.[2]?.url : song?.image?.[2]?.link} alt={song?.title} width={50} height={50} className="mb-3 h-[50px] object-cover"
                />
           <PlayPause2
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              loading={loading}
            />
                                  
              </div>
              <div className="w-[50vw] lg:w-80">
                <p className="text-sm lg:text-lg font-semibold truncate">{
                    song?.title?.replace("&#039;", "'")?.replace("&amp;", "&")?.replaceAll('&quot;','"')
                }</p>
              </div>
              </div>
              <div className="hidden lg:block max-w-56">
                {song?.primaryArtists && (
                    <p className="text-gray-400 truncate">By: {song?.primaryArtists}</p>
                )}
                </div>
            </div>
                        ))
                    }
                    </div>
            ): (
               <SongListSkeleton />
            )
        }
      </div>

        <div className={`mt-10 text-gray-200 ${searchedData && searchedData?.albums?.results?.length > 0 ? '' : 'hidden'}`}>
        <SwiperLayout title={"Albums"}>
        { searchedData && searchedData?.albums?.results?.length > 0 &&
        searchedData?.albums?.results?.map(
            (song) =>
                (
                <SwiperSlide key={song?.id}>
                  <SongCard song={song} />
                </SwiperSlide>
              )
          )}
          </SwiperLayout>
        </div>
         
        <div className={`mt-10 text-gray-200 ${searchedArtist && searchedArtist?.results?.length > 0 ? '' : 'hidden'}`}>
        <SwiperLayout title={"Artists"}>
       { searchedArtist && searchedArtist?.results?.length > 0 &&
        searchedArtist?.results?.map(
            (artist) =>
                (
                <SwiperSlide key={artist?.id} className={artist?.name.includes(';') || artist?.name.includes(',') || artist?.name.includes('&') ? '!hidden' : ''}>
                  <Link href={`/artist/${artist?.id}`}>
                  <div className=' flex flex-col justify-center items-center'>
                    <Image src={artist?.image?.[2]?.url} alt={artist?.name} width={200} height={200} className="rounded-full" />
                    <p className="lg:text-base lg:w-44 w-24 text-center text-xs font-semibold mt-3 truncate">{artist?.name?.replace("&amp;","&")}</p>
                    <div>
                      {artist?.role && (
                        <p className="text-gray-400 truncate text-[8px] lg:text-xs">
                          {artist?.role}   
                    </p>
                      )}
                    </div>
                  </div>
                  </Link>
                </SwiperSlide>
              )
          )}
          </SwiperLayout>
        </div>
            
        <div className={`mt-10 text-gray-200 ${searchedData && searchedData?.playlists?.results?.length > 0 ? "" : 'hidden'}`}>
        <SwiperLayout title={"Playlists"}>
        { searchedData && searchedData?.playlists?.results?.length > 0 &&
        searchedData?.playlists?.results?.map(
            (song) =>
                (
                <SwiperSlide key={song?.id}>
                  <SongCard song={song} />
                </SwiperSlide>
              )
          )}
          </SwiperLayout>
        </div>
      </div>
        </div>
    </div>
  )
}

export default page
