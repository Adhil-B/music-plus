import React, { useEffect } from 'react';

const ScriptComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    const l = document.scripts[document.scripts.length - 1];

    script.settings = {}; // Equivalent to the `upszm` argument in the function
    script.src = "//infantilecombination.com/bGX_V.stdTGVlP0CYEWedti-YlWD5FuYZAXlIQ/Mecm/9lu/ZAUJlCkZPrTcUq5eOTTAcB3-NhDAg/taNPTgkd5CNDzqc/0/OQQw";
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';

    l.parentNode.insertBefore(script, l);

    // Cleanup function to remove the script if necessary
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return <div>Script loaded</div>;
};

export default ScriptComponent;
