'use client';
import SongsList from '@/components/SongsList';
import { getFavourite, getSongData } from '@/services/dataAPI';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { MdOutlineDownloading } from "react-icons/md";

const page = () => {
  const [favouriteSongs, setFavouriteSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState([]);
  const [start, setStart] = useState(false);
  const { status } = useSession();

useEffect(() => {
try{
browserFileStorage.init('downloads').then((status) => {
if(status.initial) {}
	
browserFileStorage.list().then((filenames) => {
        //setAllfilenames(filenames)
}).catch((error) => {})
	
}).catch((error) => {
	if(error.alreadyInit) {
		
	browserFileStorage.list().then((filenames) => {
        //setAllfilenames(filenames)
	localStorage?.setItem("downloaded" , filenames)
        }).catch((error) => {})
		
	}
});
}catch(err) {}
//setDone([false,done[1],done[2]]);
}, []);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const res = await getFavourite();
      if (res?.length > 0) {
        const favorites = await getSongData(res);
        setFavouriteSongs(favorites?.reverse());
      }
      setLoading(false);
    }
    fetchFavorites();
  }, []);

  // redirect if user is authenticated
  if (status === 'loading') {
    return <div className=' w-screen h-screen flex justify-center items-center'>
      <span className="loader"></span>
    </div>
  }
  if (status === 'unauthenticated') {
    redirect('/login');
  }
  return (
    <div className='mx-auto relative flex flex-col w-11/12 text-white min-h-screen '>
      <h1 className='text-6xl font-semibold mt-10'>Favourites</h1>
      <h2 className='text-3xl font-semibold mt-10 flex items-center gap-[0.5rem]'>Songs <MdOutlineDownloading size={'1.75rem'} className={`cursor-pointer ${start ? '' : 'text-[#00e6e6]'} hover:text-[#00e6e6]`} onClick={(e)=>{e.stopPropagation();
setStart(true)
for (let i in favouriteSongs) {
 let song = favouriteSongs[i];

  const songUrl = song?.downloadUrl?.[parseInt(localStorage?.getItem("downloads") ? JSON.parse(localStorage.getItem("downloads")) : ["4"])]?.link;
    const imageUrl = song?.image?.[2]?.link;
    const filename = `${song?.name?.replace("&#039;","'")?.replace("&amp;","&")?.replaceAll('&quot;','"')}.mp3`
    const artists = song?.primaryArtists;
    const duration = song?.duration;
  if (localStorage?.getItem("downloaded").includes(filename)) { continue; }

var xhr = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();
    xhr.open('GET', songUrl, true);
    xhr2.open('GET', imageUrl, true);
    xhr.responseType = 'blob';
    xhr2.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        
        var blob = this.response;
        browserFileStorage.save(filename, blob, null, { artist: artists, duration: duration }).then((file) => {
            console.log('Saved file!', file)
	    browserFileStorage.list().then((filenames) => {
	    localStorage?.setItem("downloaded" , filenames)
            setDownloading([...downloading, song.name])
            }).catch((error) => {})    
            //setDone([true,false,100]);	
        })
        .catch((error) => {
            console.error(error)
        })
      }

            
    };
    xhr2.onload = function(e) {
      if (this.status == 200) {
        
        var blob = this.response;
        browserFileStorage.save(`img-${filename.replace('.mp3','')}`, blob).then((file) => {
            console.log('Saved file!', file)
	    setDownloading([...downloading, song.id])
        })
        .catch((error) => {
            console.error(error)
        })
      }
    };
   xhr.onprogress = e => {
    // Every time progress occurs
    const percent = parseInt((e.loaded / e.total)*100);
    if (percent != 100){
    //setDone([false,true,percent]);
    //node.appendChild( div ); 

    }    }       
                        
    xhr.addEventListener('load', function() {

    });                    
    xhr.onerror = function(e) {
      alert("Error " + e.target.status + " occurred while receiving the document.");
    };
    xhr.send();
    xhr2.send();


                                                                                              
};
	setStart(false);																										    
}} /></h2>
      {favouriteSongs?.length <= 0 && loading === false ?
        <h1 className='text-xl font-semibold mt-10'>No Favourite Songs</h1>
        :
        <SongsList SongData={favouriteSongs} loading={loading} downloading={downloading}/>
      }
    </div>
  )
}

export default page
