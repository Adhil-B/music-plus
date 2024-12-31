'use client';
import { getRecommendedSongs, getlyricsData } from '@/services/dataAPI'
import { useState } from 'react'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import SongsList from '../SongsList';
import { useDispatch } from 'react-redux';
import {setAutoAdd } from '@/redux/features/playerSlice';


const Lyrics = ({ activeSong, scrollableDivRef, currentSongs }) => {
    const dispatch = useDispatch();
    const { autoAdd } = useSelector(state => state.player);
    const [lyrics, setLyrics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('queue');
 
  const [num, setNum] = useState(0);
  const targetRef = useRef(null);
   // Reference to the scrollable div

  useEffect(() => {
    const handleScrollToTarget = () => {
      if (targetRef.current && scrollableDivRef.current && num !== 0) {
        scrollableDivRef.current.scrollTo({
          top: targetRef.current.offsetTop,
          behavior: 'smooth',
        });
      }
    };

    // Assuming you want to scroll on initial render
    handleScrollToTarget();
  }, [num]);

    useEffect(() => {
        if (activeTab === 'lyrics'){
        const fetchData = async () => {
            setLoading(true);
            const res = await getlyricsData(activeSong?.id);
            setLyrics(res);
            setLoading(false);
        };
        if (activeSong?.id)
        fetchData();
        }
    }, [activeSong?.id, activeTab]);

    const handleAutoAdd = (checked) => {
        console.log(autoAdd);
        if(checked){
        dispatch(setAutoAdd(true));
        localStorage.setItem('autoAdd', true);
        }
        else{
            dispatch(setAutoAdd(false));
            localStorage.setItem('autoAdd', false);
        }
    }

    return (
        <div onClick={(e) => { e.stopPropagation(); }} >
            <div className='flex justify-center items-center w-full mt-[-9.5vh] mb-[3vh] sm:mt-[15px] sm:mb-auto'>
                <button onClick={() => { setNum(num+1); setActiveTab('queue') }} className={`${activeTab === 'queue' ? 'border-[#00e6e6] border-b-2' : ''} text-white text-xl m-3 sm:mt-0 font-medium `}>Queue</button>
                <button onClick={() => { setNum(num+1); setActiveTab('lyrics') }} className={`${activeTab === 'lyrics' ? 'border-[#00e6e6] border-b-2' : ''} text-white text-xl m-3 sm:mt-0  font-medium`}>Lyrics</button>
            </div>
            <div ref={targetRef} className="target-div">
                {activeTab === 'lyrics' ? (
                    lyrics?.status === 'SUCCESS' ? (
                        <div className="aside bg-[#02081363] w-[90vw] p-[20px] mb-[15px] sm:mb-[0px]   rounded-lg text-white text-sm sm:text-base sm:p-[20px 30px] mt-5 md:w-[35vw] md:h-[66.4vh] overflow-y-scroll hideScrollBar">
                            {lyrics?.data?.lyrics}
                        </div>
                    ) : (
                        <div className="text-white text-lg p-4 sm:p-0 mt-5 md:w-[100%] md:h-[66.4vh] overflow-y-scroll hideScrollBar text-center">
                            No Lyrics Found
                        </div>
                    )) : (
                    <div>
                        <div className='mb-4 flex justify-between gap-7 mt-3' onClick={(e)=>e.stopPropagation()}>
                            <p className=' text-white font-medium'>
                                Auto add similar songs to queue
                            </p>

                            <label htmlFor='autoAddButton' className="relative inline-flex items-center mb-1 cursor-pointer mr-4">
                                <input onChange={
                                    (e) => {
                                        handleAutoAdd(e.target.checked)
                                    }
                                } type="checkbox" checked={autoAdd} className="sr-only peer" name='autoAddButton' id='autoAddButton' placeholder='autoAddButton' title={autoAdd ? 'on':'off'}>
                                </input>
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none ring-2  ring-gray-500 ch rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#00e6e6]"></div>
                            </label>

                        </div>
                        {
                            currentSongs?.length > 0 ? (
                                <div className="rounded-lg text-white p- mt- md:w-[100%] md:h-[66.4vh] overflow-y-scroll hideScrollBar ">
                                    <SongsList SongData={currentSongs} loading={false} hidePlays={true} activeSong={activeSong} />
                                </div>
                            ) : (
                                <div className="text-white text-lg p-4 sm:p-0 mt-5 md:w-[100%] md:h-[66.4vh] overflow-y-scroll hideScrollBar text-center">
                                    No Songs
                                </div>
                            )}
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Lyrics
