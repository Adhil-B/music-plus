      if (typeof navigator.serviceWorker !== 'undefined') {
          navigator.serviceWorker.register('sw.js')
      }

browserFileStorage.init('downloads').then((status) => {
if(status.initial) {
	setPdd(true);
}
browserFileStorage.list().then((filenames) => {
localStorage?.setItem("downloaded" , filenames);
}).catch((error) => {})
	
}).catch((error) => {
	if(error.alreadyInit) {
	browserFileStorage.list().then((filenames) => {
        //setAllfilenames(filenames)
	localStorage?.setItem("downloaded" , filenames)
        }).catch((error) => {})
		
	}
});
