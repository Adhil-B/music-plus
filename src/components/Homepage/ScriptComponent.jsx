import React, { useEffect } from 'react';

const ScriptComponent = ({adkey, height, width, adno}) => {
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
const time = adno*100;
setTimeout(function() {
    const script = document.createElement('script');
    const script2 = document.createElement('script');
    const container = document.getElementById(`ad-container-${adno}`);

    script.innerHTML = `
	atOptions = {
		'key' : '${adkey}',
		'format' : 'iframe',
		'height' : ${height},
		'width' : ${width},
		'params' : {}
	};
`
  script.type='text/javascript';
  script2.type='text/javascript';
  script2.src=`//www.highperformanceformat.com/${adkey}/invoke.js`
  container.appendChild(script);
  container.appendChild(script2);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
}, time);
  }, []);

  
  return (

    <div className='flex sm:hidden justify-center rounded-lg bg-[hsla(0,0%,100%,.05)] p-[10px] sm:p-[0px] mb-[15px] min-h-[60px]' id={`ad-container-${adno}`} >
    <div className='absolute z-[-1]'>
    <center>Advertisement</center>
    </div>
    </div>
  );
};

export default ScriptComponent;
