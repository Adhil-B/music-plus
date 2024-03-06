"use client";
//
import { homePageData, homePageData2, homePageData3, getLang, getRecommendedSongs } from "@/services/dataAPI";
import React from "react";
import { useLayoutEffect, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import SongCard from "./SongCard";
import { useDispatch, useSelector } from "react-redux";
import SwiperLayout from "./Swiper";
import { setProgress } from "@/redux/features/loadingBarSlice";
import SongCardSkeleton from "./SongCardSkeleton";
import { GiMusicalNotes } from 'react-icons/gi'
import SongBar from "./SongBar";
import OnlineStatus from "./OnlineStatus";
import ListenAgain from "./ListenAgain";
import { setHomeCategories } from '@/redux/features/homeCategoriesSlice'

const Home = () => {

  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const [songR, setSongR] = useState([]);
  const [songR2, setSongR2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const dispatch = useDispatch();
  const { activeSong, isPlaying, } = useSelector((state) => state.player);
  const { languages } = useSelector((state) => state.languages);
  const {homeCategories} = useSelector((state) => state.homeCategories);
  const [selectedHomeCategories, setSelectedHomeCategories] = useState([...homeCategories]);
  
  useEffect(() => {
        const cat = localStorage?.getItem("homeCategories") ? JSON.parse(localStorage.getItem("homeCategories")) : [...homeCategories];
        setSelectedHomeCategories(cat);
    
  }, [homeCategories]);
  // salutation
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let salutation = '';
  if (currentHour >= 5 && currentHour < 12) {
    salutation = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    salutation = 'Good afternoon';
  } else {
    salutation = 'Good evening';
  }

  const [songHistory, setSongHistory] = useState([]);
  useLayoutEffect(() => {
    setSongHistory(localStorage?.getItem("songHistory") ? JSON.parse(localStorage.getItem("songHistory")).slice(0, 6) : []);
  }, []);

  useEffect(() => {
    const fetchDataa = async () => {
      const songHis = localStorage?.getItem("songHistory") ? JSON.parse(localStorage.getItem("songHistory")).slice(0, 6) : [];   
      const [res2,res3] = await Promise.all([homePageData2(),homePageData3(songHis)]);
      setData2(res2);
      setSongR2(res2 ? res2["recommendations"] : []);        
      setData3(res3);
      setSongR(res3 ? res3["recommendations"] : []);        
      setLoading2(false);
      
    };

    fetchDataa();
    
  }, []);
  
  useEffect(() => {
    const fetchData = async () => { 
      const lang = localStorage?.getItem("languages") ? JSON.parse(localStorage.getItem("languages")) : [...languages];
      dispatch(setProgress(70))
      const res = await homePageData(lang);
      setData(res);
      dispatch(setProgress(100))
      setLoading(false);    
    };
    fetchData();
    
  }, [languages]);
  
  

  return (
    <div>
      <OnlineStatus />
      <h1 className='sal text-[2.14rem] sm:text-4xl font-bold mx-2 m-9 text-white flex gap-2'>"{salutation}  <GiMusicalNotes />"</h1>
      { selectedHomeCategories.includes("listen") && (
      <ListenAgain />
      )}
      

{/* Quick Picks */}
      {
        songR?.length > 0 && selectedHomeCategories.includes("picks") && (
      <SwiperLayout title={"Quick Picks For You"}>
        {
          loading2 ? (
            <SongCardSkeleton />
          ) : (
            data3?.recommendations?.map(
              (song) =>
              (
                <SwiperSlide key={song?.id}>
                  <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
                </SwiperSlide>
              )
            )
          )
        }
      </SwiperLayout>
)}

      {/* Recommendations */}
      {
        songR2?.length > 0 && selectedHomeCategories.includes("recommendations") && (
      <SwiperLayout title={"Recommendations"}>
        {
          loading2 ? (
            <SongCardSkeleton />
          ) : (
            data2?.recommendations?.map(
              (song) =>
              (
                <SwiperSlide key={song?.id}>
                  <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
                </SwiperSlide>
              )
            )
          )
        }
      </SwiperLayout>
)}
  
      {/* New Releases */}
      {  selectedHomeCategories.includes("releases") && (
      <SwiperLayout title={"New Releases"}>
        {
          loading ? (
            <SongCardSkeleton />
          ) : (
            data?.albums?.map(
              (song) =>
              (
                <SwiperSlide key={song?.id}>
                  <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
                </SwiperSlide>
              )
            )
          )
        }
      </SwiperLayout>
)}
      
      {/* top charts */}
      {  selectedHomeCategories.includes("charts") && (
      <div className="my-4 lg:mt-14">
        <h2 className=" text-white mt-4 text-2xl lg:text-3xl font-semibold mb-4 ">Top Charts</h2>
        <div className="grid lg:grid-cols-2 gap-x-10 max-h-96 lg:max-h-full lg:overflow-y-auto overflow-y-scroll">
          {
            loading ? (
              <div className=" w-[90vw] overflow-x-hidden">
                <SongCardSkeleton />
              </div>
            ) : (
              data?.charts?.slice(0, 10)?.map(
                (playlist, index) =>
                (
                  <SongBar key={playlist?.id} playlist={playlist} i={index} />
                ))
            )
          }
        </div>
      </div>
)}

      {/* trending */}
      { selectedHomeCategories.includes("trending") && (
      <SwiperLayout title={"Trending"} >
        {
          loading ? (
            <SongCardSkeleton />
          ) : (
            <>
              {data?.trending?.songs?.map(
                (song) =>
                (
                  <SwiperSlide key={song?.id}>
                    <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
                  </SwiperSlide>
                )
              )}

              {data?.trending?.albums?.map(
                (song) =>
                (
                  <SwiperSlide key={song?.id}>
                    <SongCard song={song} activeSong={activeSong} isPlaying={isPlaying} />
                  </SwiperSlide>
                )
              )}
            </>
          )
        }
      </SwiperLayout>
  )}
      
      {/* featured playlists */}
      {  selectedHomeCategories.includes("featured") && (
      <SwiperLayout title={"Featured Playlists"}>
        {
          loading ? (
            <SongCardSkeleton />
          ) : (
            data?.playlists?.map(
              (song) =>
              (
                <SwiperSlide key={song?.id}>
                  <SongCard key={song?.id} song={song} activeSong={activeSong} isPlaying={isPlaying} />
                </SwiperSlide>
              )
            )
          )
        }
      </SwiperLayout>
)}
    </div>
  );
}; 

export default Home;
