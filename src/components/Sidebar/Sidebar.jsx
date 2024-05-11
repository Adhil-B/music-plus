import React from 'react'
import  logoWhite from '../../assets/logoWhite.png'
import Languages from './Languages'
import HomeCategories from './HomeCategories'
import Qualities from './Qualities'
import Downloads from './Downloads'
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from 'react'
import Favourites from './Favourites'
import { FaGithub } from 'react-icons/fa'
import {MdOutlineMenu} from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import Profile from './Profile'
import { useDispatch } from 'react-redux'
import Playlists from './Playlists'
import { setProgress } from '@/redux/features/loadingBarSlice'
import { IoMdSettings } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import PlaylistModal from './PlaylistModal'
import { useSelector } from 'react-redux'
import { MdDownload } from "react-icons/md";
/*
import Languages from './Languages'
import Qualities from './Qualities'
import Downloads from './Downloads'
      <div className='cside mt-7 border-b border-gray-400 w-[95%]'>
        <Languages/>
      </div>
      <div className='cside mt-7 border-b border-gray-400 w-[95%]'>
        <Qualities/>
      </div>
      <div className='cside mt-7 border-b border-gray-400 w-[95%]'>
        <Downloads/>
      </div>
<Image onClick={()=>{dispatch(setProgress(100))}} src={logoWhite} alt="logo" 
      className=' lg:py-2  aspect-video w-[139px] h-[31px] lg:h-[62px] lg:w-[190px]'/>
*/
const Sidebar = ({showNav, setShowNav}) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [showset, setShowset] = useState(false);
  const {settings} = useSelector((state) => state.settings);
      
  const handleSet = () => {
    setShowset(true);
  }
  const handleClose = () => {
    setShowset(false);
  }
  useEffect(() => {
     setShow(settings);   
  }, [settings]);  
      
    useEffect(() => {
    document.documentElement.style.overflow = showset ? 'hidden' : 'auto';

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
    }, [showset]);
      
  return (
<div>
<PlaylistModal show={show} setShow={setShow}/>
        <div className={`${showset ? '': 'hidden'} content-center fixed top-[10%] left-[5%] sm:left-[20%] w-[90%] sm:w-[60%] h-[80%] z-[99] `}>
          <div className=' relative aside shadow-[0px_0px_0px_900px_#00000040] bg-[#020813a1] p-[40px] rounded-lg h-[auto] overflow-x-auto max-h-[110%]'>
            <div className='flex'>
            <FiSettings title='Settings' size={30} color={'white'} className={` mb-7 `} />
            <h1 class="text-2xl text-white">&nbsp;&nbsp;<b>Settings</b></h1><br/>
            <IoCloseSharp title='Close' size={30} color={'white'} onClick={handleClose} className='cursor-pointer mb-7 absolute block right-[5%]' />
            </div><hr/>
            <div className='cside mt-7 border-b border-gray-400'>
           <HomeCategories/>
           </div>
            <div className='cside mt-7 border-b border-gray-400'>
           <Languages/>
           </div>
            <div className='cside mt-7 border-b border-gray-400'>
            <Qualities/>
            </div>
            <div className='cside mt-7 border-b border-gray-400'>
            <Downloads/>
            </div>
            
          </div>
        </div>  
    <div className={`${showNav ? '':'translate-x-[-100%]' } transition-all duration-200 aside  h-screen lg:w-[300px] md:w-[250px] w-[250px] fixed top-0 left-0 z-40 bg-[#020813a1] flex flex-col justify-between`}>
    <div>
    <div className=' flex mt-[20px]'>
      <MdOutlineMenu onClick={()=>setShowNav(false)} className=' mx-4 text-2xl lg:text-3xl my-auto text-white cursor-pointer' />
      <div className=' flex justify-center items-center'>
      <Link href='/' className="bside">
      <b>Music+</b>
      </Link>
      </div>
      </div>
      <div className={`${showNav ? '':'hidden' } cside mt-4 pb-7 border-b border-gray-400 w-[95%]`}>
            <center>
        <Profile setShowNav={setShowNav}/>
            </center>
        </div>

     <Favourites setShowNav={setShowNav} />
     <div className='cside mt-7 border-b border-gray-400 w-[95%]'>
      <Playlists setShowNav={setShowNav} show={show} setShow={setShow}/>
      </div>

    <div className='cside mt-7 border-b border-gray-400 w-[95%]' onClick={handleSet}>
    <div className='pl-[15px] flex cursor-pointer items-center' onClick={()=>setShowNav(false)}>
    <IoMdSettings title='Settings' size={25} color={'white'} className={` mb-7 `} />
    <p className=' font-semibold text-lg text-white mx-3 mb-7'>Settings</p>
    
    </div>
    </div>
    <div className='install hidden cside mt-7 border-b border-gray-400 w-[95%]'>
    <div className='pl-[15px] flex cursor-pointer items-center'>
    <MdDownload title='Settings' size={25} color={'white'} className={` mb-7 `} />
    <p className=' font-semibold text-lg text-white mx-3 mb-7'>Install App</p>
    </div>
    </div>
          
    <div className=' mt-[10px] pl-[20px] text-gray-200 flex gap-3'>
      <Link href='/dmca'>
      <p className='hover:border border-gray-200 p-1 font-medium w-fit rounded cursor-pointer text-sm'>DMCA</p>
      </Link>
      <a href='' target='_blank' rel="noreferrer">
      <p className=' hover:border border-gray-200 p-1 font-medium w-fit rounded cursor-pointer text-sm flex items-center gap-1'></p>
      </a>
     </div>      

     </div>
     
    </div></div>
  )
}

export default Sidebar
