var version = "1.0.3";
function updaternone(){
  document.getElementById("updater").style.display = "none";
}
function downloaderon(){
document.getElementById("updater").style.display = "flex"; 
}
function uupdater(){
  updaternone()
  console.log("download~"+"2"+"~"+"update"+"~.apk~"+"/~https://kodular.app/RQN-XBW");
}
////
var divu = document.createElement('div');
divu.innerHTML = `<center><div style='border-radius:6px; color: white; max-width:60%; background-color:#212121; font-family: sans-serif; padding: 4rem;'>
<div>
  <img style="vertical-align:top; height:26px" src="https://vtlogos.adhilreplit.repl.co/yt.png">&nbsp;
  <span style='font-size:24px'><b>Update Available</b></span><br><br>
  <span style='font-size:14px; '>New version of this application has been released. Please update the app for new features and bug fixes.</span>
</div>
<br>

    
    <button type="button" class="btn btn-primary" onclick="uupdater()">Download</button>&nbsp;
    <a type="button" class="btn btn-link" style="text-decoration: none;" onclick="updaternone()">Not Now</a>
    
  </div></center>`;
// set style
divu.style['backdrop-filter'] = 'blur(12px)';
divu.style['align-items']="center";
divu.style['justify-content'] = "center";
divu.style['text-align'] = "center";
divu.style['background-color']='#000000c7';
divu.style.display = 'flex';
divu.style.display = 'none';
divu.style.position='fixed';
divu.style.top='0px';
divu.style.width="100%";
divu.style.height="100%";
divu.style.zIndex="99999";
divu.id = 'updater';
//div.className = 'download';
// better to use CSS though - just set class
//div.setAttribute('class','download'); // and make sure myclass has some styles in css
document.body.appendChild(divu);
function version(ver){
  alert("cool")
  if (parseInt(ver) < parseInt(version)) {
  updateron()
}
}
console.log("version:")


