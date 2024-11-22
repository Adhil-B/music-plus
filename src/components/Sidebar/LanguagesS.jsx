'use client'
import React, { use } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setLanguagesS } from '@/redux/features/languagesSSlice'
import { useEffect } from 'react'
import { addLang } from '@/services/dataAPI';

const LanguagesS = ({open, setOpen}) => {
    const dispatch = useDispatch();
    const {languagesS} = useSelector((state) => state.languagesS);
    const [selectedLanguagesS, setSelectedLanguagesS] = useState([...languagesS]);
    
    useEffect(() => {
        const lang = localStorage?.getItem("languagesS") ? JSON.parse(localStorage.getItem("languagesS")) : [...languagesS];
        setSelectedLanguagesS(lang);
        }, []);

    const languageList = [
        { id: 'englishS', label: 'English' },
        { id: 'malayalamS', label: 'Malayalam' },
        { id: 'tamilS', label: 'Tamil' },
        { id: 'hindiS', label: 'Hindi' },
        { id: 'haryanviS', label: 'Haryanvi' },
        { id: 'punjabiS', label: 'Punjabi' },
        { id: 'rajasthaniS', label: 'Rajasthani'},
        { id: 'teluguS', label: 'Telugu' },
        { id: 'odiaS', label: 'Odia' },
        { id: 'marathiS', label: 'Marathi' },
        { id: 'gujaratiS', label: 'Gujarati' },
        { id: 'bengaliS', label: 'Bengali' },
        { id: 'kannadaS', label: 'Kannada' },
        { id: 'bhojpuriS', label: 'Bhojpuri' },
        { id: 'urduS', label: 'Urdu' },
        { id: 'assameseS', label: 'Assamese' },
        // Add more languagesS as needed
      ];

      const handleLanguageChange = (event) => {
        const { value, checked } = event.target;
        let updatedLanguagesS;

        if (checked) {
          updatedLanguagesS = [...selectedLanguagesS, value];
        } else {
          updatedLanguagesS = selectedLanguagesS.filter((lang) => lang !== value);
        }

        (async function () {  
       // if(updatedLanguagesS.length > 0){
            const res = await addLang(updatedLanguagesS);
            if (res?.success === true) {
                console.log(updatedLanguagesS);
              console.log("Updated languagesS!");
            }
       // }
        })();
          
        setSelectedLanguagesS(updatedLanguagesS);
        dispatch(setLanguagesS(updatedLanguagesS));
        localStorage.setItem('languagesS', JSON.stringify(updatedLanguagesS));
      
      };


  return (
    <div className=' text-white'>
        <details className={`text-white detailanimatation`}>
            <summary className=' flex cursor-pointer gap-3 items-baseline mx-2'>
            <FaChevronDown className='arrow '/>
            <div>
                <p className=' font-semibold text-lg'>LanguagesS</p>
                <p className=' text-[9px] mb-7'>Pick which languagesS you like to listen</p>
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
            checked={selectedLanguagesS.includes(language.id)}
            onChange={handleLanguageChange}
            className="hidden"
          />
          <label
            htmlFor={language.id}
            className={`${
              selectedLanguagesS.includes(language.id)
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

export default LanguagesS
