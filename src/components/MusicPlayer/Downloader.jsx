'use client';
import React, { useEffect, useState } from "react";
import { MdOutlineFileDownload } from 'react-icons/md';
import useDownloader from 'react-use-downloader';
import {MdDownloadForOffline, MdFileDownloadDone} from 'react-icons/md'

const Downloader = ({activeSong, icon}) => {
    const { size, elapsed, percentage, download, error, isInProgress } =useDownloader();
    const songUrl = activeSong?.downloadUrl?.[parseInt(localStorage?.getItem("downloads") ? JSON.parse(localStorage.getItem("downloads")) : ["4"])]?.link;
    const imageUrl = activeSong?.image?.[2]?.link;
    const filename = `${activeSong?.name?.replace("&#039;","'")?.replace("&amp;","&")?.replaceAll('&quot;','"')}.mp3`
    const artists = activeSong?.primaryArtists;
    const [done, setDone] = useState(false);

  useEffect(() => {
try{
browserFileStorage.init('downloads').then((status) => {
if(status.initial) {}
}).catch((error) => {});
}catch(err) {}
setDone(localStorage.getItem("downloaded") ? localStorage.getItem("downloaded").includes(filename) : false);

  }, []);
    
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
    xhr.open('GET', songUrl, true);
    xhr2.open('GET', imageUrl, true);
    xhr.responseType = 'blob';
    xhr2.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        
        var blob = this.response;
        browserFileStorage.save(filename, blob, null, { artist: artists }).then((file) => {
            console.log('Saved file!', file)
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

    var node = document.getElementById("xhr1");
    var div = document.createElement('div');
    var div1 = document.createElement('div1');
    div.id="xhr2";
    div.classList.add("text-white","font-extrabold","text-xs","m-");
    div.innerHTML=percent;
    div1.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="" style="color:rgb(0, 230, 230)" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4l-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z"></path></svg>`;
    while( node.firstChild )
    node.removeChild( node.firstChild );
    if (percent != 100){
    node.appendChild( div ); 

    }else{
	    
    const allMusic = localStorage.getItem("downloaded") ? JSON.parse(localStorage.getItem("downloaded")) : [];
    let x={};
    x["name"] = filename.replace(".mp3",'');
    x["artist"] = artists;
    allMusic.push(x);
    localStorage.setItem("downloaded", eval(allMusic));
	    
    document.getElementById("xhr1").classList.remove('download-button','flex', 'justify-center', 'items-center');
    node.appendChild( div1 ); 
    setDone(true)
	    
    }    }       
                        
    xhr.addEventListener('load', function() {

    });                    
    xhr.onerror = function(e) {
      alert("Error " + e.target.status + " occurred while receiving the document.");
    };
    xhr.send();
    xhr2.send();

    
			//*/
                        
    }} className={`flex  mb-1 cursor-pointer w-7`}>
        
        
    <div title={isInProgress ?'Downloading' : 'Download'} id="xhr1" className={isInProgress ? 'download-button flex justify-center items-center':''}>
        {
            isInProgress ? 
            <div id="xhr2" className=' text-white font-extrabold text-xs m-'>{percentage}</div>
            :
              done ? <MdFileDownloadDone size={25} color={'#00e6e6'}/> : <MdOutlineFileDownload  size={25} color={'#ffff'}/>
        }
      </div>
    </div>
  )
}

export default Downloader
