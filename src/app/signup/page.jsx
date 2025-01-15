'use client'
import { setProgress } from '@/redux/features/loadingBarSlice';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';
import { useEffect } from 'react'


const page = () => {
    const {status} = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    });
    useEffect(() => {
    document.body.style.background = 'linear-gradient(160deg,rgba(60, 8, 152, 0.47),#09204a63 60%)';

    return () => {
      document.body.style.background = '';
    };
    }, []);
    
    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const dispatch = useDispatch();

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setProgress(70));
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    email: formData.email,
                    password: formData.password,
                    imageUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.userName}`,
                })
            });
            const data = await res.json();
            if (data.success === true) {
                toast.success('Account created successfully');
                router.push('/login');

            } else {
                toast.error(data?.message);
            }
            console.log(data);
            
        } catch (error) {
            toast.error(error?.message);
        }finally{
            dispatch(setProgress(100));
        }
    };
    //<label className="" htmlFor='userName'>Username</label>
    //<label  className=" mr-9 lg:mr-11" htmlFor='email'>Email</label>
    //<label className="" htmlFor='password'>Password</label>
//<span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-cyan-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
    // redirect if user is authenticated
    if(status === 'loading'){
        return   <div className=' w-screen h-screen flex justify-center items-center'>
                      <span className="loader"></span>
                  </div>
    }
    if(status === 'authenticated'){
        redirect('/');
    }
    return (
        <div className=' w-11/12 mx-auto my-6'>
            <div className=" flex justify-center items-center bg-[#02081300]">
                <div className="!rounded-[40px] container flex justify-center flex-col items-center w-[90vw] bg-[#0208133d] lg:w-1/2">
                    <h1 className=" text-4xl text-[white] font-medium mb-8"><b>Sign up</b></h1>
                    <form onSubmit={handelSubmit} className="text-white correctwidtha flex flex-col text-base lg:text-xl gap-2 font-medium">
                        <div className=" flex gap-4 items-end">
                            
                            <input onChange={onchange} value={formData.userName} type="text" placeholder="Name" required id='userName' name='userName' className='!pl-[20px] bg-[#fff0] correctwidth appearance-none border-b border-white focus:outline-none text-base lg:text-lg' />
                        </div>
                        <div className=" flex gap-4 items-end">
                            
                            <input onChange={onchange} value={formData.email} name='email' type="email" placeholder="Email" required className='!pl-[20px] bg-[#fff0] correctwidth appearance-none border-b border-white focus:outline-none text-base lg:text-lg' />
                        </div>
                        <div className=" flex gap-4 items-end">
                            
                            <input onChange={onchange} value={formData.password} name='password' type="password" placeholder="Password" required className='!pl-[20px] bg-[#fff0] correctwidth appearance-none border-b border-white focus:outline-none text-base lg:text-lg' />
                        </div>
                        <div className=" w-full flex justify-center mt-[20px]">
                            <button type='submit' className="correctwidth font-semibold hover:border-[#00e6e6] relative inline-block px-4 py-2 font-medium group">
                                
                                <span className="absolute inset-0 w-full h-full group-hover:bg-"></span>
                                <span className="relative text-white group-hover:text-cyan-400">Sign Up</span>
                            </button>
                        </div>
                        <div className=' flex justify-center items-center'>
                        <hr className=' w-1/2 mx-2 border-white' /><p className=' text-xs text-white'>or</p><hr className=' w-1/2 mx-2 border-white' />
                        </div>
                        <div className=" w-full flex justify-center">
                            <button onClick={() => signIn('google')} type='button' className="correctwidth flex items-center gap-[.7px] hover:border-[#00e6e6] justify-center px-4 py-2 group font-medium border-2 border-white rounded-sm">
                                <FaGoogle className=" group-hover:text-[#00e6e6]"/>oogle
                            </button>
                        </div>
                        <p className=" w-full flex justify-center gap-2 text-[14px] mt-[10px]">
                            Already have an account? <Link href={'/login'} className=' text-cyan-400 font-semibold'> Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page
