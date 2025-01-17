import React from 'react'
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong, setFullScreen } from "@/redux/features/playerSlice";
import { BiHeadphone } from "react-icons/bi";
import { useSelector } from "react-redux";



const ListenAgainCard = ({song, index, SongData, img}) => {
  const { activeSong } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const handlePlayClick = (song,index) => {
      dispatch(setActiveSong({ song, data: SongData, i: index }));
      dispatch(setFullScreen(true));
      dispatch(playPause(true));
      };
  return (
    <div>
         <div
            onClick={() => {
                handlePlayClick(song,index);
            }}
             className={`flex w-40 md:w-80 items-center mt-5 cursor-pointer group border-b-[2px] border-[#ffffff00] justify-between ${activeSong?.id === song?.id && " text-[#00e6e6]"}`}>
                <div className="flex items-center gap-5">
              <div className="relative mb-2 sm:mb-0">
                <img src={song?.image?.[1]?.link} alt={song?.name} width={50} height={50} className="max-w-none aspect-square object-cover"
                />
                {
                  activeSong?.id === song?.id ? (
                    <BiHeadphone size={27} className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00e6e6]" />
                  ) : (
                    <BsPlayFill
                    size={25}
                    className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                  />
                  )
                }
               
              </div>
              <div className="w-[60vw] sm:w-24 md:w-64">
                <p className="text-sm lg:text-[1rem] font-semibold truncate">{
                    song?.name?.replace("&#039;", "'")?.replace("&amp;", "&")?.replaceAll('&quot;','"')
                }</p>
                <p className="text-gray-400 truncate text-xs">{song?.primaryArtists}</p>
              </div>
              </div>
            </div>
    </div>
  )
}

export default ListenAgainCard
