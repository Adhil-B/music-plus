'use client'
import React, { use } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setDownloads } from '@/redux/features/downloadsSlice'
import { useEffect } from 'react'

const Downloads = () => {
    const dispatch = useDispatch();
    const {downloads} = useSelector((state) => state.downloads);
    const [selectedDownloads, setSelectedDownloads] = useState([...downloads]);

    useEffect(() => {
        const qua = localStorage?.getItem("downloads") ? JSON.parse(localStorage.getItem("downloads")) : ["4"];
        setSelectedDownloads(qua);
        }, []);

    const downloadList = [
        { id: '4d', label: '320kbps' },
        { id: '3d', label: '160kbps' },
        { id: '2d', label: '96kbps' },
        { id: '1d', label: '48kbps' },
        { id: '0d', label: '12kbps' },

      ];

      const handleDownloadChange = (event) => {
        const { value, checked } = event.target;
        let updatedDownloads;

        if (checked) {
          updatedDownloads = [value.replace('d','')];
          //updatedDownloads = [...selectedDownloads, value];
        } else {
          updatedDownloads = selectedDownloads.filter((qua) => qua !== value.replace('d',''));
        }
      
        setSelectedDownloads(updatedDownloads);
        dispatch(setDownloads(updatedDownloads));
        localStorage.setItem('downloads', JSON.stringify(updatedDownloads));
      
      };
      
  return (
    <div className=' text-white'>
        <details className='text-white detailanimatation'>
            <summary className=' flex cursor-pointer gap-3 items-baseline mx-2'>
            <FaChevronDown className='arrow '/>
            <div>
                <p className=' font-semibold text-lg'>Download Quality</p>
                <p className=' text-[9px] mb-7'>Pick which quality you like to download</p>
            </div>
                </summary>
            <form className=' flex flex-wrap mb-1 h-fit overflow-y-scroll overflow-x-hidden hideScrollBar'>
            {downloadList.map((download) => (
        <div key={download.id} className="flex items-center mb-3 mx-2 ml-5">
          <input
            type="checkbox"
            id={download.id}
            name="download"
            value={download.id}
            checked={selectedDownloads.includes(download.id.replace('d',''))}
            onChange={handleDownloadChange}
            className="hidden"
          />
          <label
            htmlFor={download.id}
            className={`${
              selectedDownloads.includes(download.id.replace('d',''))
                ? 'border-[#00e6e6] text-[#00e6e6]'
                : 'border-white text-white'
            } cursor-pointer transition-colors text-sm min-w-[86px] text-center  border rounded-md p-2 font-semibold`}
          ><small>
            {download.label}</small>
          </label>
        </div>
      ))}
            </form>
        </details>        
    </div>
  )
}

export default Downloads
