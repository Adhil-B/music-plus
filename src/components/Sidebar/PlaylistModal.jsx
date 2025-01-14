import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { createPlaylist } from '@/services/playlistApi';
import { useDispatch } from 'react-redux';
import { setIsTyping } from '@/redux/features/loadingBarSlice';
import { setSettings } from '@/redux/features/settingsSlice'

const PlaylistModal = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setName(e.target.value)
    }
    
    const handelCreate = async () => {
        console.log(name)
        if(name === ''){
            toast.error('Playlist name is required')
        }
        else{
            setLoading(true)
            const res = await createPlaylist(name);
            if(res.success == true){
                toast.success(res.message)
                setName('')
                setShow(false)
            }
            else{
                toast.error(res.message)
            }
            setLoading(false)
        }
    }

    // handle focus
    const handleFocus = () => {
        dispatch(setIsTyping(true));
      };
      const handleBlur = () => {
        dispatch(setIsTyping(false));
      };

  useEffect(() => {
      dispatch(setSettings(show));   
  }, [show]);
    
    return (show &&
        <div>
            <div onClick={() => setShow(false)} className='fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-50 flex justify-center items-center text-white'>
                <div onClick={(e) => e.stopPropagation() } className='bg-[#020813a1] border-[1px] border-[#ffffff1c] bg-opacity-80 backdrop-blur-[10px] rounded-lg w-[90%] sm:w-[auto]'>
                    <div className='flex justify-between items-center px-[20px] pb-[10px] pt-[20px]'>
                        <h1 className='text-lg font-semibold'>Create Playlist</h1>
                        <button onClick={() => setShow(false)} className='text-white text-lg font-semibold'>X</button>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className=" flex gap-4 items-end mb-3">
                            <label className="hidden mr-9 lg:mr-11" htmlFor='name'>Name</label>
                            <input onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} value={name} name='name' type="text" placeholder="Playlist Name" required className='w-[90%] my-[5px] py-[10px] pl-[15px] border-[#ffffff12] border-[1px] rounded-[10px] bg-[#020813a1] mx-[20px] appearance-none bg-[#f5deb300] bg-opacity-100 backdrop-blur-sm focus:outline-none text-base lg:text-lg' />
                        </div>
                            <button onClick={handelCreate} className='group-hover:text-[#00e6e6] text-sm group font-semibold mb-7 flex gap-2 border-[1.5px] rounded-lg px-[15px] items-center py-[10px] border-[1px] border-[#ffffff12]'>
                                {
                                    loading ? <div className='custom-loader w-[20px] h-[20px]'></div> : <FaPlus className=' w-[20] h-[20px] group-hover:text-[#00e6e6]' />
                                }
                                Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistModal
