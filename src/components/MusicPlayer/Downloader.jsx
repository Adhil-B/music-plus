'use client';
import React, { useEffect, useState, useLayoutEffect } from "react";
import { MdOutlineFileDownload } from 'react-icons/md';
import useDownloader from 'react-use-downloader';
import {MdDownloadForOffline, MdFileDownloadDone} from 'react-icons/md'

const Downloader = ({activeSong, icon}) => {
    const { size, elapsed, percentage, download, error, isInProgress } =useDownloader();
    const songUrl = activeSong?.downloadUrl?.[parseInt(localStorage?.getItem("downloads") ? JSON.parse(localStorage.getItem("downloads")) : ["4"])]?.link;
    const imageUrl = activeSong?.image?.[2]?.link;
    const filename = `${activeSong?.name?.replace("&#039;","'")?.replace("&amp;","&")?.replaceAll('&quot;','"')}.mp3`
    const artists = activeSong?.primaryArtists;
    const duration = activeSong?.duration;
    const [done, setDone] = useState([false,false,0]);
    const [allfilenames, setAllfilenames] = useState([]);

useEffect(() => {	
setAllfilenames(localStorage?.getItem("downloaded") ? localStorage.getItem("downloaded") : [])
}, []);	
	
useEffect(() => {	
setDone([percentage == 100,isInProgress,percentage])
}, [percentage, isInProgress]);	
	
useEffect(() => {
try{
browserFileStorage.init('downloads').then((status) => {
if(status.initial) {}
	
browserFileStorage.list().then((filenames) => {
        setAllfilenames(filenames)
}).catch((error) => {})
	
}).catch((error) => {
	if(error.alreadyInit) {
		
	browserFileStorage.list().then((filenames) => {
        setAllfilenames(filenames)
	localStorage?.setItem("downloaded" , filenames)
        }).catch((error) => {})
		
	}
});
}catch(err) {}
setDone([false,done[1],done[2]]);
}, [done[0],activeSong]);


	
  return (
    <div onClick={(e)=>{e.stopPropagation();
        //download(songUrl, filename);
        document.getElementById("xhr1").classList.add('download-button','flex', 'justify-center', 'items-center');              
        /*browserFileStorage.init('downloads').then((status) => {
        if(status.initial) {}
        }).catch((error) => {
        if(!error.supported) {}
        if(error.alreadyInit) {}
        if(error.dbError) {
            console.error(error.error)
        }
    })*/

    var xhr = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();
    xhr.open('GET', songUrl.replace('https://soundrex.onrender.com/api/v1/audio?id=', 'https://ytmrelay-api.onrender.com/audio?videoId='), true);
    xhr2.open('GET', imageUrl, true);
    xhr.responseType = 'blob';
    xhr2.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        
        var blob = this.response;
        browserFileStorage.save(filename, blob, null, { artist: artists, duration: duration }).then((file) => {
            console.log('Saved file!', file)
	    browserFileStorage.list().then((filenames) => {
            setAllfilenames(filenames)
	    localStorage?.setItem("downloaded" , filenames)
            }).catch((error) => {})    
            setDone([true,false,100]);	
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
    setDone([false,true,percent]);
    //node.appendChild( div ); 

    }    }       
                        
    xhr.addEventListener('load', function() {

    });                    
    xhr.onerror = function(e) {
      alert("Error " + e.target.status + " occurred while receiving the document.");
    };
    xhr.send();
    xhr2.send();

                        
    }} className={`flex  mb-1 cursor-pointer w-7`}>
        

    <div title={done[1] ?'Downloading' : 'Download'} id="xhr1" className={done[1] ? 'download-button flex justify-center items-center':''}>
        {
            done[1] ? 
            <div id="xhr2" className='w-[15px] text-white font-extrabold text-xs m-'><center>{done[2]}</center></div>
            :
              allfilenames.includes(filename) ? <MdFileDownloadDone size={25} color={'#00e6e6'}/> : <MdOutlineFileDownload  size={25} color={'#ffff'}/>
        }
      </div>
    </div>
  )
}

export default Downloader
