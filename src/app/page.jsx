'use client'
import Homepage from '@/components/Homepage/Home'
import { useEffect, useLayoutEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import Languages from '@/components/Sidebar/Languages'

export default function Home() {
  const [showtip, setShowtip] = useState(false);
  const [toturialComplete, setToturialComplete] = useState(false);
  
  useLayoutEffect(() => {
    setToturialComplete(JSON.parse(localStorage.getItem('toturialComplete')));

    setTimeout(() => {
      if (!toturialComplete) {
        setShowtip(true);
      }
    }, 5000);
  }, [])
  useEffect(() => {

  }, [toturialComplete])

  const handleClick = () => {
    setShowtip(false);
    setToturialComplete(true);
    localStorage.setItem('toturialComplete', true);
  }
  /*
  {showtip && !toturialComplete &&
        <div className='absolute top-4 left-16 z-50'>
          <div className=' relative bg-[#3a3b3b] p-4 rounded-lg'>
            <p className=' text-lg text-gray-300'>
              Create your own <span className='text-[#00e6e6]'>Playlists</span> <br />and
              add songs to <span className='text-[#00e6e6]'>Favourite</span>
            </p>
            <div className=' flex items-center mt-2 justify-end'>
              <button onClick={handleClick} className=' bg-[#00e6e6] text-black px-3 py-2 rounded-lg'>Ok</button>
            </div>
            <div className=' absolute top-2 -left-2 bg-[#3a3b3b] rotate-[50deg] w-6 h-6'></div>
          </div>
        </div>}
  */
  return (
    <div>
      {showtip && !toturialComplete &&
        <div className={`content-center fixed top-[10%] left-[5%] sm:left-[20%] w-[90%] sm:w-[60%] h-[80%] z-[99] `}>
          <div className=' relative aside shadow-[0px_0px_0px_900px_#00000040] bg-[#020813a1] p-[40px] rounded-lg h-[auto] overflow-x-auto max-h-[110%]'>
            <div className='flex'>
            <FiSettings title='Settings' size={30} color={'white'} className={` mb-7 `} />
            <h1 class="text-2xl text-white">&nbsp;&nbsp;<b>Settings</b></h1><br/>
            <IoCloseSharp title='Close' size={30} color={'white'} onClick={handleClose} className='cursor-pointer mb-7 absolute block right-[5%]' />
            </div><hr/>
            <div className='cside mt-7 border-b border-gray-400'>
           <Languages/>
           </div>
            
          </div>
        </div>  }

      <div className=' mx-auto relative flex flex-col w-11/12 text-white '>
        <Homepage />
      </div>
    </div>
  )
}
