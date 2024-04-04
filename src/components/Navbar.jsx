'use client'
import React from 'react'
import logo from '../assets/hayasaka.png'
import Image from 'next/image'
import Searchbar from './Searchbar'
import { setPdownloading } from "@/redux/features/playerSlice";
import { useEffect } from 'react';
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setProgress } from '@/redux/features/loadingBarSlice'
import { MdOutlineMenu } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { AiFillHome } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import Sidebar from './Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { setIsTyping } from '@/redux/features/loadingBarSlice';
//bg-[#020813]
//              <Image onClick={() => { dispatch(setProgress(100)) }}
//               src={logo} alt="logo" className=' lg:py-2  aspect-video w-[135px] h-[30.741px] lg:h-[58px] lg:w-[190px]' />
/*

*/
const Navbar = () => {
  const dispatch = useDispatch();
  const { pdownloading } = useSelector((state) => state.player);
  const { pdownloading2 } = useSelector((state) => state.player);
  const {isTyping} = useSelector((state) => state.loadingBar);
  const [showNav, setShowNav] = React.useState(false);
  const [pd, setPd] = React.useState([]);
  //const [pdd, setPdd] = React.useState(false);
  

useEffect(() => {
	let pending = []
	browserFileStorage.list().then((filenames) => {
    	browserFileStorage.loadAll().then((files) => {
		
    	for(let f in files) {
        let file = files[f]
	if (file.filename.includes('img-') && !(filenames.includes(file.filename.replace('img-','')+'.mp3'))){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', file.metadata.songUrl, true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
      	if (this.status == 200) {
        
        var blob = this.response;
        browserFileStorage.save(file.filename.replace('img-','')+'.mp3', blob, null, { artist: file.metadata.artist, duration: file.metadata.duration }).then((filee) => {
        console.log('Saved file!', filee)
	
	dispatch(setPdownloading(file));
	dispatch(setPdownloading2(file));
   	break
        }).catch((error) => {
        console.error(error)
        })
      	}
    	};
		
	xhr.send();

	}
    	}
		
	}).catch((error) => {})
        }).catch((error) => {})
	
	
	
}, [pdownloading2]);
	
  return (
    <>
      <div className='h-[70px] text-white flex justify-between relative'>
        <div className=' flex'>
          <MdOutlineMenu onClick={
            () => setShowNav(true)
          } className=' mx-4 text-2xl lg:text-3xl my-auto cursor-pointer' />
          <div className={`${isTyping ? 'hidden sm:flex' : 'flex'} flex justify-center items-center`}>
            <Link href='/' className="mhome flex flex-row gap-[0.3rem]">
              <AiFillHome aria-hidden="true" className="w-5 h-5 ml-4 text-gray-300" />
              Home
            </Link>&nbsp;
            <Link href='/favourite' className="mhome flex flex-row">
              <AiFillHeart aria-hidden="true" className="w-5 h-5 ml-4 text-gray-300" />
              
            </Link>
          </div>
        </div>
        <Searchbar />
      </div>

      <Sidebar showNav={showNav} setShowNav={setShowNav} />
      {/* overlay */}
      <div onClick={() => setShowNav(false)}
        className={`${showNav ? '' : 'hidden'} transition-all duration-200 fixed top-0 left-0 z-30 w-screen h-screen bg-black bg-opacity-50`}></div>
      <div onClick={
        () => setShowNav(false)
      } className={`${showNav ? '' : 'hidden'} md:hidden fixed top-7 right-10 z-50 text-3xl text-white`}>
        <IoClose />
      </div>
    </>
  )
}

export default Navbar
