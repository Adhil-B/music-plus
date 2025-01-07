import React, { useEffect } from 'react';

const ScriptComponent = () => {
  useEffect(() => {
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
l.parentNode.insertBefore(s, l);
})({})
    `;

    container.appendChild(script);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (

    <div id="ad-container">
      {/* Placeholder for the ad */}
    </div>
  );
};

export default ScriptComponent;
