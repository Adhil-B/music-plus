import React, { useEffect } from 'react';

const ScriptComponent = () => {
  useEffect(() => {
    // Dynamically create the script element
    const script = document.createElement('script');
    const container = document.getElementById('ad-container');

    script.innerHTML = `
      (function(upszm){
        var d = document,
            s = d.createElement('script'),
            l = d.scripts[d.scripts.length - 1];
        s.settings = upszm || {};
        s.src = "//infantilecombination.com/bGX_V.stdTGVlP0CYEWedti-YlWD5FuYZAXlIQ/Mecm/9lu/ZAUJlCkZPrTcUq5eOTTAcB3-NhDAg/taNPTgkd5CNDzqc/0/OQQw";
        s.async = true;
        s.referrerPolicy = 'no-referrer-when-downgrade';
        l.parentNode.insertBefore(s, l);
      })({});
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
