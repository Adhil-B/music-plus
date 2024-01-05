'use client'
import React, { use } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setHomeCategories } from '@/redux/features/homeCategoriesSlice'
import { useEffect } from 'react'

const HomeCategories = () => {
    const dispatch = useDispatch();
    const {homeCategories} = useSelector((state) => state.homeCategories);
    const [selectedHomeCategories, setSelectedHomeCategories] = useState([...homeCategories]);
 
    useEffect(() => {
        const lang = localStorage?.getItem("homeCategories") ? JSON.parse(localStorage.getItem("homeCategories")) : [...homeCategories];
        setSelectedHomeCategories(lang);
        }, []);

    const homeCategoryList = [
        { id: 'listen', label: 'Listen Again' },
        { id: 'picks', label: 'Quick Picks For You' },
        { id: 'recommendations', label: 'Recommendations' },
        { id: 'releases', label: 'New Releases' },
        { id: 'charts', label: 'Top Charts' },
        { id: 'trending', label: 'Trending' },
        { id: 'featured', label: 'Featured Playlists'},
        // Add more homeCategories as needed
      ];

      const handleHomeCategoryChange = (event) => {
        const { value, checked } = event.target;
        let updatedHomeCategories;

        if (checked) {
          updatedHomeCategories = [...selectedHomeCategories, value];
        } else {
          updatedHomeCategories = selectedHomeCategories.filter((lang) => lang !== value);
        }
      
        setSelectedHomeCategories(updatedHomeCategories);
        dispatch(setHomeCategories(updatedHomeCategories));
        localStorage.setItem('homeCategories', JSON.stringify(updatedHomeCategories));
      
      };


      
  return (
    <div className=' text-white'>
        <details className={`text-white detailanimatation`}  >
            <summary className=' flex cursor-pointer gap-3 items-baseline mx-2' >
            <FaChevronDown className='arrow '/>
            <div>
                <p className=' font-semibold text-lg'>Home Page</p>
                <p className=' text-[9px] mb-7'>Pick which categories you like to have</p>
            </div>
                </summary>
            <form className=' flex flex-wrap mb-1 h-28 overflow-y-scroll overflow-x-hidden hideScrollBar'>
            {homeCategoryList.map((homeCategory) => (
        <div key={homeCategory.id} className="flex items-center mb-3 ml-5">
          <input
            type="checkbox"
            id={homeCategory.id}
            name="homeCategory"
            value={homeCategory.id}
            checked={selectedHomeCategories.includes(homeCategory.id)}
            onChange={handleHomeCategoryChange}
            className="hidden"
          />
          <label
            htmlFor={homeCategory.id}
            className={`${
              selectedHomeCategories.includes(homeCategory.id)
                ? 'border-[#00e6e6] text-[#00e6e6]'
                : 'border-white text-white'
            } cursor-pointer transition-colors text-sm min-w-[86px] text-center  border rounded-md p-2 font-semibold`}
          ><small>
            {homeCategory.label}</small>
          </label>
        </div>
      ))}
            </form>
        </details>        
    </div>
  )
}

export default HomeCategories
