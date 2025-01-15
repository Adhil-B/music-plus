import React, { useEffect } from 'react';

const AdBanner = () => {

useEffect(() => {
    // Dynamically create the script element

    const script = document.createElement('script');
    const head = document.head;

  script.innerHTML = `(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',8799072,document.createElement('script'))`
  script.type='text/javascript';
  head.appendChild(script);

    // Cleanup function to remove the script if the component unmounts
    return () => {

    };
  }, []);

  
  return (

    <div className='flex sm:hidden justify-center rounded-lg bg-[hsla(0,0%,100%,.05)] p-[10px] sm:p-[0px] mb-[15px] min-h-[60px]' id={`ad-container-full`} >
    <div className='absolute z-[-1]'>
    <center>Advertisement</center>
    </div>
    </div>
  );
};

export default AdBanner;
