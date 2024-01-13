
/*document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('fullscreen-controls')) return;
full();
	// Don't follow the link
	event.preventDefault();
	// Log the clicked element in the console
	console.log(event.target);

}, false);*/

var c = document.cookie
 
// If there's no PREF cookie, then create one with a value that enables the Dark Theme
if(!localStorage.getItem("setup")) {
  
if(!sessionStorage.getItem("setup")) {
  document.cookie = "PREF=f6=400;domain=youtube.com";
  window.location.href = "https://m.youtube.com/?themeRefresh=1"
  sessionStorage.setItem("setup", true);
}
  setTimeout(function(){
    localStorage.setItem("setup", true);
  }, 25000)
};

//var urlherf = "https://m.youtube.com"
// FETCH POLYFILL
(function() {
    const {fetch: origFetch} = window;
    window.fetch = async (...args) => {
        const response = await origFetch(...args);

        if (response.url.includes('/youtubei/v1/player')) {
            const text = () =>
                response
                    .clone()
                    .text()
                    .then((data) => data.replace(/adPlacements/, 'odPlacement'));

            response.text = text;
            return response;
        }
        return response;
    };
})();

 
(function() {
    window.autoClick = setInterval(function() {
        try {
            const btn = document.querySelector('.videoAdUiSkipButton,.ytp-ad-skip-button')
            if (btn) {
                btn.click()
            }
            const ad = document.querySelector('.ad-showing');
            if (ad) {
                document.querySelector('video').playbackRate = 10;
            }
        } catch (ex) {}
    }, 100);

    window.inlineAdsInterval = setInterval(function() {
        try {
            const div = document.querySelector('#player-ads');
            if (div) {
                div.parentNode.removeChild(div);
            }
        } catch (ex) {}
    }, 500);
})();


const removeAds = () => {

	// Get skip button and click it
	let btn = document.querySelector('.ytp-ad-skip-button');
	if (btn) {
	    console.log("javascript:(function () {"+encodeURI("document.querySelector('.ytp-ad-skip-button').click();")+"})()");
	}

	// (unskipable ads) If skip button didn't exist / was not clicked speed up video
	const ad = [...document.querySelectorAll('.ad-showing')][0];
	if (ad) {
	  //  console.log("ad found");
	    // Speed up and mute
	 try{ 
	    document.querySelector('video').playbackRate = 16;
	   // document.querySelector('video').muted = true;
      document.querySelector('video').currentTime = document.querySelector('video').duration; } catch{}
	   
	} else {
	    //console.log("ad not found");
	}

}

//console.log("javascript:(function(){ document.cookie = 'PREF=f6=8000000&al=en&f1=50000000; path=/; domain=.youtube.com'; })")
//location.reload();


var div3 = document.createElement('lazy-list');
div3.innerHTML = `<ytm-compact-link-renderer class="item"><a class="compact-link-endpoint" onclick="console.log(':downloads:')"><c3-icon class="compact-link-icon"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M17 18V19H6V18H17ZM16.5 11.4L15.8 10.7L12 14.4V4H11V14.4L7.2 10.6L6.5 11.3L11.5 16.3L16.5 11.4Z" class="style-scope yt-icon"></path></g></svg></c3-icon><div class="compact-link-metadata">Downloads</div></a></ytm-compact-link-renderer>`;



/*const main = new MutationObserver(() => {
    // call if ad watcher called late
console.log("javascript:(function () {"+encodeURI("document.querySelector('.ytp-ad-skip-button').click();")+"})()");
    removeAds();
    const adContainer = document.getElementsByClassName("video-ads ytp-ad-module").item(0); 
    if(adContainer) {
 	main.disconnect();
 	console.log("ad container found, observing...");
 	new MutationObserver(()=> removeAds()).observe(adContainer, {attributes: true, characterData: true, childList: true});
     } else {
 	console.log("adContainer not found!");
     }
})*/
setInterval(() => {
  removeAds();

}, 500)

// call in case page loads this script late and no mutations to observe
removeAds();
var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://vtlogos.adhilreplit.repl.co/yt/stylesheet.css';
    link.media = 'all';
    head.appendChild(link);
}

function full(){
document.getElementById('pip').style.display = "none";
document.getElementById('download').style.display = "none";
document.getElementById('fullscreen').style.display = "none";
document.getElementById('fullscreen-exit').style.display = "flex";
//document.querySelector('ytm-mobile-topbar-renderer#header-bar').style.display = "none";
document.querySelector('div#player-container-id').style.top = "2px";
document.querySelector('div#player-container-id').style["z-index"] = 99998;
}
function fulloff(){
if (window.location.href.includes("/watch?v=")){
document.getElementById('pip').style.display = "flex";
document.getElementById('download').style.display = "flex";
document.getElementById('fullscreen').style.display = "flex";
}
document.getElementById('fullscreen-exit').style.display = "none";
document.querySelector('div#player-container-id').style.top = '';
document.querySelector('div#player-container-id').style["z-index"] = '';
}
function seek(){
  document.querySelector('video').pause();
  console.log("seek:"+document.querySelector('video').currentTime*1000)
//  console.log("seek:200")
}
function peek(time){
  document.querySelector('video').currentTime = time/1000;
}
function url(link1){
 // urlherf = link1;
  //alert(link1);
}
function downloadernone(){
  document.getElementById("downloader").style.display = "none";
}
function downloaderon(){
//document.querySelector('input[name="format"]:checked').value = (localStorage.getItem("format") || "mp4");
//document.querySelector('input[name="quality"]:checked').value = (localStorage.getItem("quality") || "lowest");
document.getElementById("downloader").style.display = "flex"; document.querySelector('video').pause();
}
function download(){
  localStorage.setItem("format", document.querySelector('input[name="format"]:checked').value);
  localStorage.setItem("quality", document.querySelector('input[name="quality"]:checked').value);
  let format = document.querySelector('input[name="format"]:checked').value;
  let quality = document.querySelector('input[name="quality"]:checked').value;
  let type = document.querySelector('input[name="format"]:checked').value.replace("mp3","audio");
downloadernone()
  console.log("download~"+"2"+"~"+document.title.replace(" - YouTube", "").replace("~","-")+"~."+format+"~"+type.replace("mp4","videos")+"/~https://yt-server.adhilreplit.repl.co/download?quality="+quality+type.replace("mp4","")+"&format="+format+"&url=https://www.youtube.com/watch"+window.location.search);
  
}

////https://yt-server.adhilreplit.repl.co/download?quality=lowest&format=mp4&url=
var div = document.createElement('div');
div.innerHTML = `<center><div style='border-radius:6px; color: white; background-color:#212121; font-family: sans-serif; padding: 4rem;'>
<div>
  <img style="vertical-align:top; height:31px" src="https://vtlogos.adhilreplit.repl.co/yt.png">&nbsp;
  <span style='font-size:28.5px'><b>Download</b></span>
</div><br>

<div class="form-check">
  <label for="formGroupExampleInput" style="font-size:1.75rem" class="form-label"><b>File Format:</b></label><br>
  <input class="form-check-input" type="radio" name="format" value="mp4" id="flexRadioDefault1" checked>
  <label class="form-check-label" style="font-size:1.5rem" for="flexRadioDefault1">
    MP4 (Video)
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="format" value="mp3" id="flexRadioDefault2">
  <label class="form-check-label" style="font-size:1.5rem" for="flexRadioDefault2">
    MP3 (Audio)
  </label>
</div><br>
<div class="form-check">
  <label for="formGroupExampleInput" style="font-size:1.75rem" class="form-label"><b>File Quality:</b></label><br>
  <input class="form-check-input" type="radio" name="quality" value="lowest" id="flexRadioDefault4" checked>
  <label class="form-check-label" style="font-size:1.5rem" for="flexRadioDefault4">
    Medium
  </label>
</div>
    <div class="form-check">
  <input class="form-check-input" type="radio" name="quality" value="highest" id="flexRadioDefault3">
  <label class="form-check-label" style="font-size:1.5rem" for="flexRadioDefault3">
    Highest&nbsp;
  </label>
</div>
<br>
    <!--div class="mb-3">
      <label for="disabledSelect" style="font-size:1.75rem" class="form-label"><b>Storage Location:</b></label><br>
      <select id="select" class="form-select">
        <option value="1">In-app</option>
        <option value="2">Local Storage</option>
      </select>
    </div--><br>
    
    <button type="button" class="btn btn-primary" onclick="download()">Download</button>&nbsp;
    <a type="button" class="btn btn-link" style="text-decoration: none;" onclick="downloadernone()">Cancel</a>
    <br>
  </div></center>`;
// set style
div.style['backdrop-filter'] = 'blur(12px)';
div.style['align-items']="center";
div.style['justify-content'] = "center";
div.style['text-align'] = "center";
div.style['background-color']='#000000c7';
div.style.display = 'flex';
div.style.display = 'none';
div.style.position='fixed';
div.style.top='0px';
div.style.width="100%";
div.style.height="100%";
div.style.zIndex="99999";
div.id = 'downloader';
//div.className = 'download';
// better to use CSS though - just set class
//div.setAttribute('class','download'); // and make sure myclass has some styles in css
document.body.appendChild(div);
////
//document.getElementById("dcancel").addEventListener("click", download);

var div1 = document.createElement('div');
div1.innerHTML = `<div class="btn-circle btn-reload" onclick="console.log(':reload:')" id="refresh">
    <i class="material-icons" >refresh</i>
    </div>
  <div class="btn-circle btn-downloads" onclick="console.log(':downloads:')" id="downloads">
    <i class="material-icons">file_download_done</i>
  </div>
  <div class="btn-circle btn-pip" style="display:none" onclick="console.log(':pip:')" id="pip">
    <i class="material-icons">open_in_new</i>
  </div>
  <div class="btn-circle btn-download" onclick='downloaderon()' style="display:none" id="download">
    <i class="material-icons">file_download</i>
  </div>
  <div class="btn-circle btn-fullscreen" style="display:none" id="fullscreen" onclick="console.log(':fullscreen:')">
    <i class="material-icons">fullscreen</i>
  </div>
  <div class="btn-circle btn-fullscreen-exit" style="display:none" id="fullscreen-exit" onclick="console.log(':fullscreen:')">
    <i class="material-icons">fullscreen_exit</i>
  </div>`;
document.body.appendChild(div1);
// look for ad container
//main.observe(document.body, {attributes: false, characterData: false, childList: true, subtree: true});
//loaded


var oldpath = "";
function change(){
  let newpath = window.location.href;
  if (oldpath != newpath){
    /////////////
    
    //alert(newpath);

    if (newpath.includes("https://m.youtube.com/") && window.location.pathname == '/'){
      document.getElementById('refresh').style.display = "flex";
      document.getElementById('downloads').style.display = "flex";


    } else {
      document.getElementById('refresh').style.display = "none";
      document.getElementById('downloads').style.display = "none";
    }

    document.getElementById('fullscreen-exit').style.display = "none";
    
    if (newpath.includes("/watch?v=")){
      
      document.getElementById('pip').style.display = "flex";
      document.getElementById('download').style.display = "flex";
      document.getElementById('fullscreen').style.display = "flex";
      setInterval(function(){
      document.querySelector('[aria-label="Share"]').onclick=null;
      }  , 500);
      var element9 = document.querySelector('[aria-label="Share"]');
                                      
element9.addEventListener("click", function(e) {
  const queryString1 = window.location.search;
  const urlParams1 = new URLSearchParams(queryString1);
  console.log("share:https://youtu.be/"+urlParams1.get('v'));
},false);

      
  //const queryString1 = window.location.search;
  //const urlParams1 = new URLSearchParams(queryString1);
  
  /*
    setTimeout(function(){
    document.querySelector('body').removeAttribute("bottom-sheet-open");
    document.querySelector('bottom-sheet-container ').innerHTML="";
  }  , 1000);
  setTimeout(function(){
    document.querySelector('body').removeAttribute("bottom-sheet-open");
    document.querySelector('bottom-sheet-container ').innerHTML="";
  }  , 500);*/
  //document.querySelector('bottom-sheet-container ').style.display="none";
  




    //setTimeout(console.log("back:"), 90000);
//}, false);
/*var element99 = document.querySelector('.slim_video_action_bar_renderer_button.icon-add_to_playlist');
                                      
element99.addEventListener("click", function(e) {
    setTimeout(function(){
    document.querySelector('bottom-sheet-container ').style.display="";
    }  , 800);
}, false);
var element999 = document.querySelector('ytm-bottom-sheet-renderer.media-item-menu');
                                      
element999.addEventListener("click", function(e) {
    setTimeout(function(){
    document.querySelector('bottom-sheet-container ').style.display="";
    }  , 800);
}, false);
*/
var div9 = document.createElement('div');
div9.innerHTML = `<center><b>Skip Sponsor Ad</b></center>`;
div9.style="display:none; border-radius: 8px;padding: 10px;background-color: rgb(68 68 68 / 50%);width: auto;height: auto;font-size: 11px;color: rgb(255 255 255 / 85%);z-index: 2147483647;right: 10px;bottom: 48px;position: absolute;";
//div9.onclick="alert('hello');";
div9.id="sponsorskipper";
document.querySelector('.player-container').appendChild(div9);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let fetchRes = fetch(
    "https://sponsor.ajay.app/api/skipSegments?videoID="+urlParams.get('v'));
    // fetchRes is the promise to resolve
    // it by using.then() method
    var ss = "";
    fetchRes.then(res =>
        res.text()).then(d => {
            ss = JSON.parse(d);
  const video = document.querySelector("video");

video.ontimeupdate = (event) => {
   div9.style.display="none";
  for (const element of ss) {
    
    
  if(element["segment"][0]<document.querySelector('video').currentTime && element["segment"][1] > document.querySelector('video').currentTime){
    
    div9.style.display="";
    div9.onclick = function() {document.querySelector('video').currentTime=element["segment"][1];document.getElementById("sponsorskipper").style.display="none";};
    //&& element["segment"][0] > last1
    //alert("hello");
    div9.last1=element["segment"][0];
    div9.last2=element["segment"][1];
    
  }
  
  
}
};
             //alert("cool:"+ss[0]["segment"][0]);
        })
    

      



      
    } else{
      document.getElementById('pip').style.display = "none";
      document.getElementById('download').style.display = "none";
      document.getElementById('fullscreen').style.display = "none";
    }
    if (newpath.includes("/feed/library")){
      setTimeout(function(){
       document.querySelectorAll('ytm-item-section-renderer')[0].appendChild(div3); 
      }, 10);
      setTimeout(function(){
       document.querySelectorAll('ytm-item-section-renderer')[0].appendChild(div3); 
      }, 500);
      setTimeout(function(){
       document.querySelectorAll('ytm-item-section-renderer')[0].appendChild(div3); 
      }, 1000);
       document.querySelectorAll('ytm-item-section-renderer')[0].appendChild(div3);
    }
    if (newpath.includes("/select_site")){


      
      document.querySelectorAll('ytm-setting-single-option-menu-renderer')[2].style.display="none";
    }
    if (newpath.includes("/shorts")){


      setTimeout(function(){
      document.querySelectorAll('span.yt-core-attributed-string.yt-core-attributed-string--white-space-pre-wrap.yt-core-attributed-string--text-alignment-center.yt-core-attributed-string--word-wrapping')[1].style.display = "none";}, 10);
    }
    
    /////////////
    oldpath = newpath;
  }
  

}


console.log("loaded*1.0.2*t*/");
console.log("javascript:(function(){ var%20script%20=%20document.createElement('script');%20script.setAttribute('src','https://vtlogos.adhilreplit.repl.co/yt/dislike.js');%20document.head.appendChild(script); })()")
console.log("javascript:(function(){ var%20script%20=%20document.createElement('script');%20script.setAttribute('src','https://vtlogos.adhilreplit.repl.co/yt/background.js');%20document.head.appendChild(script); })()")
console.log("javascript:(function(){ var%20script%20=%20document.createElement('script');%20script.setAttribute('src','https://vtlogos.adhilreplit.repl.co/yt/update.js');%20document.head.appendChild(script); })()")
 

//var oldpath = "";
let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    let oldValue = mutation.oldValue;
    let newValue = mutation.target.textContent;

    if (oldValue !== newValue) {
     // if window.location.pathname != ""{
        change()
        
      
        //oldpath = window.location.pathname;
     // }
        
    }
  });
});

observer.observe(document.body, {
  characterDataOldValue: true, 
  subtree: true, 
  childList: true, 
  characterData: true
})

//https://gihs.adhil.ga/404
/*var div3 = document.createElement('div');
div3.innerHTML = `<center>Skip Sponsor</center>`;
div3.style="border-radius:8px; padding:10px; background-color: #444444; width:120px;height:auto; font-size: 20px; color: white; z-index:99999999999; right: 5px; bottom:10px;";
document.querySelector('.html5-video-container').appendChild(div3);*/