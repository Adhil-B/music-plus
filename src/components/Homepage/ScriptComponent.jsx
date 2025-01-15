import React, { useEffect } from 'react';

const ScriptComponent = ({adkey, height, width, adno}) => {

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
