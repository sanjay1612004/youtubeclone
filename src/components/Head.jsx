import { GiHamburgerMenu } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { useEffect, useState } from "react";
import { searchapi } from "../utils/contants";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";


function Head({show,menu}) {
  const[inp,setinp]=useState('')
  const[suggestions,setsuggestions]=useState([])
  const[showsuggestion,setshowsuggestion]=useState(false)
  useEffect(()=>{
    const timer=setTimeout(()=>getsuggestion(),200)
    return ()=>{
      clearTimeout(timer)
    }
  },[inp])  
  async function getsuggestion() {
    const data=await fetch(searchapi+inp)
    const json=await data.json()
    setsuggestions(json[1])
    console.log(suggestions)
  }
    
  return (
    <div className="sticky top-0 grid grid-flow-col p-2   items-center bg-white z-50">
      
      <div className="flex gap-3 col-span-1 items-center">
        <GiHamburgerMenu className="text-2xl cursor-pointer mx-3" onClick={()=>show()}/>
        <a href="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1280px-Logo_of_YouTube_%282015-2017%29.svg.png"
          alt="logo"
          width={90}
        />
        </a>
      </div>

      <div className="col-span-10 flex justify-center">
        <div className="relative w-1/2">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full outline-none"
              onChange={(e)=>setinp(e.target.value)}
              value={inp}
              onFocus={()=>setshowsuggestion(true)}
              onBlur={()=>setshowsuggestion(false)}
            />
            
            <button className="px-5 border border-l-0 border-gray-300 bg-gray-100 rounded-r-full hover:bg-gray-200">
              <FaSearch className="text-lg" />
            </button>
          </div>
          <div>
            {suggestions.length>0 && showsuggestion &&(
            <ul className="absolute bg-white w-115 px-2 py-2 z-50 border border-gray-200 rounded-md shadow-md">
              {suggestions.map((item,index)=>{return <li className="py-1 cursor-pointer" key={index} onMouseDown={()=>{setinp(item); setsuggestions([])}}>
                <div className="flex">
                <CiSearch className="text-xl mt-1 mr-2" /> 
                {item}
                </div>
                </li>})
              }
             
            </ul>
            )}
          </div>
        </div>
        <FaMicrophone className="text-xl mt-2 mx-3"/>

      </div>

      <div className="col-span-1 flex justify-end">
        <HiUserCircle className="text-4xl cursor-pointer" />
      </div>
      

    </div>
  );
}

export default Head;