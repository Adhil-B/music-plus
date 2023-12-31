'use client'
import React from 'react'
import logo from '../assets/hayasaka.png'
import Image from 'next/image'
import Searchbar from './Searchbar'
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
  const {isTyping} = useSelector((state) => state.loadingBar);
  const [showNav, setShowNav] = React.useState(false);
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
