'use client'
import React, { use } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setQualities } from '@/redux/features/qualitiesSlice'
import { useEffect } from 'react'

const Qualities = () => {
    const dispatch = useDispatch();
    const {qualities} = useSelector((state) => state.qualities);
    const [selectedQualities, setSelectedQualities] = useState([...qualities]);

    useEffect(() => {
        const qua = localStorage?.getItem("qualities") ? JSON.parse(localStorage.getItem("qualities")) : ["4"];
        setSelectedQualities(qua);
        }, []);

    const qualityList = [
        { id: '4', label: '320kbps' },
        { id: '3', label: '160kbps' },
        { id: '2', label: '96kbps' },
        { id: '1', label: '48kbps' },
        { id: '0', label: '12kbps' },

      ];

      const handleQualityChange = (event) => {
        const { value, checked } = event.target;
        let updatedQualities;

        if (checked) {
          updatedQualities = [value];
          //updatedQualities = [...selectedQualities, value];
        } else {
          updatedQualities = selectedQualities.filter((qua) => qua !== value);
        }
      
        setSelectedQualities(updatedQualities);
        dispatch(setQualities(updatedQualities));
        localStorage.setItem('qualities', JSON.stringify(updatedQualities));
      
      };
      
  return (
    <div className=' text-white'>
        <details className='text-white detailanimatation'>
            <summary className=' flex cursor-pointer gap-3 items-baseline mx-2'>
            <FaChevronDown className='arrow '/>
            <div>
                <p className=' font-semibold text-lg'>Audio Quality</p>
                <p className=' text-[9px] mb-7'>Pick which quality you like to listen</p>
            </div>
                </summary>
            <form className=' flex flex-wrap mb-1 h-fit overflow-y-scroll overflow-x-hidden hideScrollBar'>
            {qualityList.map((quality) => (
        <div key={quality.id} className="flex items-center mb-3 mx-2 ml-5">
          <input
            type="checkbox"
            id={quality.id}
            name="quality"
            value={quality.id}
            checked={selectedQualities.includes(quality.id)}
            onChange={handleQualityChange}
            className="hidden"
          />
          <label
            htmlFor={quality.id}
            className={`${
              selectedQualities.includes(quality.id)
                ? 'border-[#00e6e6] text-[#00e6e6]'
                : 'border-white text-white'
            } cursor-pointer transition-colors text-sm min-w-[86px] text-center  border rounded-md p-2 font-semibold`}
          ><small>
            {quality.label}</small>
          </label>
        </div>
      ))}
            </form>
        </details>        
    </div>
  )
}

export default Qualities
