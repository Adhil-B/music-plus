const SquareBannerH = () => {
  
useEffect(() => {
    // Dynamically create the script element
    const script = document.createElement('script');
    const script2 = document.createElement('script');
    const container = document.getElementById('ad-container-1');

    script.innerHTML = `
	atOptions = {
		'key' : 'ebeb566c60bd1f2f59dfbd5d18edd05d',
		'format' : 'iframe',
		'height' : 50,
		'width' : 320,
		'params' : {}
	};
`
  script.type='text/javascript';
  script2.type='text/javascript';
  script2.src='//www.highperformanceformat.com/ebeb566c60bd1f2f59dfbd5d18edd05d/invoke.js'
  container.appendChild(script);
  container.appendChild(script2);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  
  return (

    <div className='flex sm:hidden justify-center rounded-lg bg-[hsla(0,0%,100%,.05)] p-[10px] sm:p-[0px] mb-[15px] min-h-[60px]' id="ad-container-1" >
    <div className='absolute z-[-1]'>
    <center>Advertisement</center>
    </div>
    </div>
  );
};

export default SquareBannerH;
