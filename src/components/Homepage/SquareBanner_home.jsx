import { useEffect } from 'react';
const SquareBannerH = () => {
  
useEffect(() => {
    // Dynamically create the script element
    const script2 = document.createElement('script');
    const script22 = document.createElement('script');
    const container2 = document.getElementById('ad-container-99');

    script2.innerHTML = `
	atOptions = {
		'key' : '6472e9e96fda1f44ecc5f08fd44fc5af',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
`
  script2.type='text/javascript';
  script22.type='text/javascript';
  script22.src='//www.highperformanceformat.com/6472e9e96fda1f44ecc5f08fd44fc5af/invoke.js'
  container2.appendChild(script2);
  container2.appendChild(script22);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      while (container2.firstChild) {
        container2.removeChild(container2.firstChild);
      }
    };
  }, []);

  
  return (

    <div className='flex sm:hidden justify-center rounded-lg bg-[hsla(0,0%,100%,.05)] p-[10px] sm:p-[0px] mb-[15px] min-h-[60px]' id="ad-container-99" >
    <div className='absolute z-[-1]'>
    <center>Advertisement</center>
    </div>
    </div>
  );
};

export default SquareBannerH;
