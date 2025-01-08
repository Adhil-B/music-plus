import { useEffect } from 'react';
const AdBanner = ({adno}) => {

  
  return (

    <div className='flex sm:hidden justify-center rounded-lg bg-[hsla(0,0%,100%,.05)] p-[10px] sm:p-[0px] mb-[15px] min-h-[60px]' id={`ad-container-${adno}`} >
    <div className='absolute z-[-1]'>
    <center>Advertisement</center>
    </div>
    </div>
  );
};

export default AdBanner;
