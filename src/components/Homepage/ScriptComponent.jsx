import React, { useEffect } from 'react';

const ScriptComponent = () => {
  /*useEffect(() => {
    // Dynamically create the script element
    const script = document.createElement('script');
    const container = document.getElementById('ad-container');

    script.innerHTML = `
(function(rwr){
var d = document,
    s = d.createElement('script'),
    l = document.getElementById('ad-container');
    //l = d.scripts[d.scripts.length - 1];
s.settings = rwr || {};
s.src = "\/\/infantilecombination.com\/bKX_V.sgdAG\/lT0UYtWcdUicYtW\/5UuQZ\/X\/It\/se\/mH9zuYZUUllskTP\/T\/U\/5wOJTxce3\/Nuz\/YStTNBTRkt5gNVz\/cC3LNtwv";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.appendChild(s);
//l.parentNode.insertBefore(s, l);
})({})
    `;

    container.appendChild(script);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);*/
useEffect(() => {
    // Dynamically create the script element
    const script = document.createElement('script');
    const script2 = document.createElement('script');
    const container = document.getElementById('ad-container');

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
  //container.appendChild(script2);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      
    };
  }, []);

  
  return (

    <div className='flex sm:hidden justify-center rounded-lg bg-[hsla(0,0%,100%,.05)] p-[10px] sm:p-[0px] mb-[15px] min-h-[100px]' id="ad-container" >
    <div className='absolute z-[-1]'>
    <center>Advertisement</center>
    </div>
    </div>
  );
};

export default ScriptComponent;
