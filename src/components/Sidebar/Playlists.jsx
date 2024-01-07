'use client'
import React, { use } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { BiSolidPlaylist } from 'react-icons/bi'
import PlaylistModal from './PlaylistModal'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { deletePlaylist, getUserPlaylists } from '@/services/playlistApi'
import { MdPlaylistPlay } from 'react-icons/md'
import {PiDotsThreeVerticalBold} from 'react-icons/pi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import Link from 'next/link'
import { setSettings } from '@/redux/features/settingsSlice'
import { IoIosAddCircleOutline } from "react-icons/io";

const Playlists = ({setShowNav}) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    
    useEffect(() => {
        const getPlaylists = async () => {
            const res = await getUserPlaylists();
            if(res?.success == true){
                setPlaylists(res?.data?.playlists)
            }
        }
        getPlaylists()
        dispatch(setSettings(show))
    }, [show])

    const handleDelete = async (id) => {
        const res = await deletePlaylist(id);
        if(res?.success == true){
            setPlaylists(playlists.filter((playlist) => playlist._id !== id))
        }
    }
    const create = (e) => {
       e.preventDefault();
       setShow(true);
       
    }
//BiSolidPlaylist
  return (
    <>
    <div className=' text-white max-w-[220px] '>
        <details open className='text-white detailanimatation'>
     
            <summary className=' flex cursor-pointer gap-3 items-baseline mx-2'>
            <FaChevronDown className='arrow '/>
            <div>
                <p className=' font-semibold text-lg mb-4 flex gap-2 items-center'>Playlists<IoIosAddCircleOutline size={25}  onClick={() => create} className={`${playlists?.length > 0 ? '' : 'hidden'} hover:text-[#00e6e6]`}/><BiSolidPlaylist size={25} className={`${playlists?.length > 0 ? 'hidden' : ''}`}/></p>
            </div>
                </summary>
                
         
                <div className='flex flex-col max-h-60 pr-[20px] overflow-y-scroll overflow-x-hidden'>
                    {
                        playlists?.map((playlist, index) => (
                            <div key={index} className='flex gap-3 hover:text-[#00e6e6] mb-[10px] border-[#ffffff12] backdrop-blur-[40px] border-[1px] rounded-[10px] bg-[#020813a1] p-[12px] justify-between items-center px-3 w-full mx-3 cursor-pointer '>
                                 <Link href={`/myPlaylists/${playlist._id}`}>
                                <div onClick={()=>setShowNav(false)} className='flex gap-2 items-center '>
                                <MdPlaylistPlay size={20}/>
                                <p className='text-xl font-semibold truncate w-32'>{playlist.name}</p>
                                </div>
                                </Link>
                                <div className='flex gap-2 items-center relative ml-[-10px]'>
                                <PiDotsThreeVerticalBold onClick={()=>setShowMenu(playlist?._id)} size={25} className=' text-gray-300'/>
                                {
                                    showMenu === playlist._id &&
                                    <div
                                    onClick={() => {setShowMenu(false); handleDelete(playlist._id)}}
                                     className='absolute top-0 right-0 bg-gray-900 z-50 hover:bg-gray-800 rounded-lg p-2'>
                                        <p className='text-xs font-semibold flex gap-1 items-center'>Delete <MdOutlineDeleteOutline size={15}/></p>
                                    </div>
                                }
                                </div>
                            </div>
                        ))
                    }
                <div className='flex justify-center items-center mt-3'>
                <button onClick={() => setShow(true)} className={`${playlists?.length > 0 ? 'hidden' : ''} text-xs group font-semibold mb-7 flex gap-2 border-[1.5px] border-[#ffffff12] rounded-lg px-2 items-center py-2`}><FaPlus className=' group-hover:text-[#00e6e6]'/>Create</button>
                </div>
                </div>
        </details>       

    </div>
       {/* overlay */}
       {
                showMenu && <div onClick={() => setShowMenu(false)} className='fixed top-0 left-0 w-full h-full z-30'></div>
         }
    </>
  )
}

export default Playlists
