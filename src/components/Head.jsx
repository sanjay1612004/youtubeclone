import { GiHamburgerMenu } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { searchapi } from "../utils/contants";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaMicrophoneSlash } from "react-icons/fa";
import { GrMicrophone } from "react-icons/gr";
import Login from "./Login";
import { UserContext, UserProfile } from "../App";
import { GoSignOut } from "react-icons/go";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";


function Head({ show, menu }) {
  const [inp, setinp] = useState('')
  const [suggestions, setsuggestions] = useState([])
  const [showsuggestion, setshowsuggestion] = useState(false)
  const [text, setText] = useState("")
  const [listening, setListening] = useState(false)

  const [recognition, setRecognition] = useState(null)
  const {user,setuser}=useContext(UserContext)
  const {profile,setprofile}=useContext(UserProfile)
  const[showpop,setshowpop]=useState(false)
  const[dark,setdark]=useState(()=>{
        const saved = localStorage.getItem("theme")
        return saved === "dark"

})

  // function toggle(){
  //   if (dark){
  //     document.documentElement.classList.add("dark")
  //     localStorage.setItem("theme","dark")
  //     console.log("toglle called dark")
  //   }
  //   else{
  //     document.documentElement.classList.remove("dark")
  //     console.log("toglle called light")
  //     localStorage.setItem("theme","light")

  //   }
  // }
 

  useEffect(()=>{

document.documentElement.classList.toggle("dark",dark)

localStorage.setItem("theme", dark ? "dark":"light")

},[dark])


  useEffect(() => {

    const recog = new (window.SpeechRecognition || window.webkitSpeechRecognition)()

    recog.continuous = true

    recog.onresult = (e) => {
      const voice = e.results[e.results.length - 1][0].transcript
      setinp(prev => prev + " " + voice)
    }

    setRecognition(recog)

    return () => recog.stop()

  }, [])


  useEffect(() => {
    const timer = setTimeout(() => getsuggestion(), 200)
    return () => {
      clearTimeout(timer)
    }
  }, [inp])
  async function getsuggestion() {
    const data = await fetch(searchapi + inp)
    const json = await data.json()
    setsuggestions(json[1])
    console.log(suggestions)
  }



  return (
    <div className="sticky top-0 grid grid-cols-12 p-2 items-center bg-white z-50 dark:bg-[#171717]">

      {/* Left */}
      <div className="flex gap-3 col-span-4 sm:col-span-3 md:col-span-2 items-center">

        <GiHamburgerMenu
          className="text-2xl cursor-pointer mx-2 hidden md:block"
          onClick={() => show()}
        />

        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/3840px-YouTube_Logo_2017.svg.png"
            alt="logo"
            className="h-4 sm:h-5 md:h-6 w-auto cursor-pointer"

          />
        

    
        </a>

      </div>

      {/* Center */}
      <div className="col-span-6 sm:col-span-7 md:col-span-8 flex justify-center">

        <div className="relative w-full sm:w-4/5 md:w-3/5">

          <div className="flex">

            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-l-full outline-none text-sm sm:text-base dark:border-[#373737]"
              onChange={(e) => setinp(e.target.value)}
              value={inp}
              onFocus={() => setshowsuggestion(true)}
              // onBlur={() => setshowsuggestion(false)}
              onBlur={()=>{
              setTimeout(()=>setshowsuggestion(false),50)
              }}

            />

            <button className="px-3 sm:px-5 border border-l-0 border-gray-300 bg-gray-100 rounded-r-full hover:bg-gray-200 dark:bg-[#262626] dark:hover:bg-[#373737] dark:border-[#373737]">

              <FaSearch className="text-sm sm:text-lg " />

            </button>

          </div>

          {/* Suggestions */}
          {
            suggestions.length > 0 && showsuggestion && (

              <ul className="absolute bg-white w-full px-2 py-2 z-50 border border-gray-200 rounded-md shadow-md dark:bg-[#171717] dark:border-none">

                {
                  suggestions.map((item, index) => (
                    <li
                      className="py-1 px-1 cursor-pointer hover:bg-gray-100 text-sm sm:text-base dark:hover:bg-[#262626] rounded-md"
                      key={index}
                      onMouseDown={() => {
                        setinp(item)
                        setsuggestions([])
                      }}
                    >

                      <div className="flex">

                        <CiSearch className="text-lg mt-1 mr-2" />

                        {item}

                      </div>

                    </li>
                  ))
                }

              </ul>

            )

          }

        </div>

        {/* Mic */}
        <span
          className="ml-2 sm:block cursor-pointer mt-3"
          onClick={() => {

            if (!listening) {
              recognition.start()
              setListening(true)
            } else {
              recognition.stop()
              setListening(false)
            }

          }}
        >

          {
            listening
              ? <FaMicrophone className="text-lg sm:text-xl" />
              : <GrMicrophone className="text-lg sm:text-xl" />
          }

        </span>

      </div>

      <div className="col-span-2 sm:col-span-2 md:col-span-2 flex justify-end items-center">

      

        {!profile ? <HiUserCircle className="text-3xl sm:text-4xl cursor-pointer dark:bg-[#171717] dark:text-[#F5F5F5]" onClick={()=>setshowpop(!showpop)}/> : <img src={profile} className="w-7 h-7 md:w-10 lg:w-10 md:h-10 lg:h-10 rounded-3xl" onClick={()=>setshowpop(!showpop)}/>}
        {!user && <Login/>}

        {showpop && <div className="absolute right-4 top-16 w-40 bg-white border-1.5 border-gray-200 shadow-xl rounded-xl py-2 dark:bg-[#262626] ">
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 font-medium flex dark:text-[#FAFAFA] dark:hover:bg-[#373737]" onClick={()=>{setuser(null);window.location.reload();setprofile(null);sessionStorage.removeItem("user");sessionStorage.removeItem("profile")}}> <GoSignOut className="mt-0.5 mr-2 text-xl font-bold"/>logout</li>
            {!dark && <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-bold flex dark:text-[#FAFAFA] dark:hover:bg-[#373737]" onClick={()=>{setdark(!dark);toggle()}}><CiLight className="mt-0.5 mr-2 text-xl font-bold" /><p>light</p></li>}
            {dark && <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-bold flex dark:text-[#FAFAFA] dark:hover:bg-[#373737]" onClick={()=>{setdark(!dark);toggle()}}><CiDark className="mt-0.5 mr-2 text-xl font-bold" /><p className="dark:text-[#FAFAFA]">dark</p></li>}

          </ul>
        </div>}

      </div>

    </div>
  );

}

export default Head;