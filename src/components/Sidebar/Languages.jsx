'use client'
import React, { use } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setLanguages } from '@/redux/features/languagesSlice'
import { useEffect } from 'react'
import { addLang } from '@/services/dataAPI';

const Languages = ({open, setOpen}) => {
    const dispatch = useDispatch();
    const {languages} = useSelector((state) => state.languages);
    const [selectedLanguages, setSelectedLanguages] = useState([...languages]);
    
    useEffect(() => {
        const lang = localStorage?.getItem("languages") ? JSON.parse(localStorage.getItem("languages")) : [...languages];
        setSelectedLanguages(lang);
        }, []);

    const languageList = [
        { id: 'english', label: 'English' },
        { id: 'malayalam', label: 'Malayalam' },
        { id: 'tamil', label: 'Tamil' },
        { id: 'hindi', label: 'Hindi' },
        { id: 'haryanvi', label: 'Haryanvi' },
        { id: 'punjabi', label: 'Punjabi' },
        { id: 'rajasthani', label: 'Rajasthani'},
        { id: 'telugu', label: 'Telugu' },
        { id: 'odia', label: 'Odia' },
        { id: 'marathi', label: 'Marathi' },
        { id: 'gujarati', label: 'Gujarati' },
        { id: 'bengali', label: 'Bengali' },
        { id: 'kannada', label: 'Kannada' },
        { id: 'bhojpuri', label: 'Bhojpuri' },
        { id: 'urdu', label: 'Urdu' },
        { id: 'assamese', label: 'Assamese' },
        // Add more languages as needed
      ];

      const handleLanguageChange = (event) => {
        const { value, checked } = event.target;
        let updatedLanguages;

        if (checked) {
          updatedLanguages = [...selectedLanguages, value];
        } else {
          updatedLanguages = selectedLanguages.filter((lang) => lang !== value);
        }

        (async function () {  
       // if(updatedLanguages.length > 0){
            const res = await addLang(updatedLanguages);
            if (res?.success === true) {
                console.log(updatedLanguages);
              console.log("Updated languages!");
            }
       // }
        })();
          
        setSelectedLanguages(updatedLanguages);
        dispatch(setLanguages(updatedLanguages));
        localStorage.setItem('languages', JSON.stringify(updatedLanguages));
      
      };


  return (
    <div className=' text-white'>
        <details className={`text-white detailanimatation`}>
            <summary className=' flex cursor-pointer gap-3 items-baseline mx-2'>
            <FaChevronDown className='arrow '/>
            <div>
                <p className=' font-semibold text-lg'>Languages</p>
                <p className=' text-[9px] mb-7'>Pick which languages you like to listen</p>
            </div>
                </summary>
            <form className=' flex flex-wrap mb-1 h-28 overflow-y-scroll overflow-x-hidden hideScrollBar'>
            {languageList.map((language) => (
        <div key={language.id} className="flex items-center mb-3 mx-2 ml-5">
          <input
            type="checkbox"
            id={language.id}
            name="language"
            value={language.id}
            checked={selectedLanguages.includes(language.id)}
            onChange={handleLanguageChange}
            className="hidden"
          />
          <label
            htmlFor={language.id}
            className={`${
              selectedLanguages.includes(language.id)
                ? 'border-[#00e6e6] text-[#00e6e6]'
                : 'border-white text-white'
            } cursor-pointer transition-colors text-sm min-w-[86px] text-center  border rounded-md p-2 font-semibold`}
          ><small>
            {language.label}</small>
          </label>
        </div>
      ))}
            </form>
        </details>        
    </div>
  )
}

export default Languages
