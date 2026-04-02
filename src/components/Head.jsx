import { GiHamburgerMenu } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { useEffect, useState } from "react";
import { searchapi } from "../utils/contants";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaMicrophoneSlash } from "react-icons/fa";
import { GrMicrophone } from "react-icons/gr";



function Head({ show, menu }) {
  const [inp, setinp] = useState('')
  const [suggestions, setsuggestions] = useState([])
  const [showsuggestion, setshowsuggestion] = useState(false)
  const [text, setText] = useState("")
  const [listening, setListening] = useState(false)


  const [recognition, setRecognition] = useState(null)

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


  // return (
  //   <div className="sticky top-0 grid grid-flow-col p-2   items-center bg-white z-50">

  //     <div className="flex gap-3 col-span-1 items-center">
  //       <GiHamburgerMenu className="text-2xl cursor-pointer mx-3 hidden md:block lg:block" onClick={()=>show()}/>
  //       <a href="/">
  //       <img
  //         src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1280px-Logo_of_YouTube_%282015-2017%29.svg.png"
  //         alt="logo"
  //         width={90}
  //       />
  //       </a>
  //     </div>

  //     <div className="col-span-10 flex justify-center">
  //       <div className="relative w-1/2">
  //         <div className="flex">
  //           <input
  //             type="text"
  //             placeholder="Search"
  //             className="w-full px-4 py-2 border border-gray-300 rounded-l-full outline-none"
  //             onChange={(e)=>setinp(e.target.value)}
  //             value={inp}
  //             onFocus={()=>setshowsuggestion(true)}
  //             onBlur={()=>setshowsuggestion(false)}
  //           />

  //           <button className="px-5 border border-l-0 border-gray-300 bg-gray-100 rounded-r-full hover:bg-gray-200">
  //             <FaSearch className="text-lg" />
  //           </button>
  //         </div>
  //         <div>
  //           {suggestions.length>0 && showsuggestion &&(
  //           <ul className="absolute bg-white w-115 px-2 py-2 z-50 border border-gray-200 rounded-md shadow-md">
  //             {suggestions.map((item,index)=>{return <li className="py-1 cursor-pointer" key={index} onMouseDown={()=>{setinp(item); setsuggestions([])}}>
  //               <div className="flex">
  //               <CiSearch className="text-xl mt-1 mr-2" /> 
  //               {item}
  //               </div>
  //               </li>})
  //             }

  //           </ul>
  //           )}
  //         </div>
  //       </div>
  //       <span onClick={()=>{
  //         if(!listening){
  //           recognition.start()
  //           setListening(true)
  //         }else{
  //           recognition.stop()
  //           setListening(false)
  //         }
  //         }}>{listening?<FaMicrophone className="text-xl mt-2 mx-3" />:<GrMicrophone className="text-xl mt-2 mx-3"/>}</span>

  //     </div>

  //     <div className="col-span-1 flex justify-end">
  //       <HiUserCircle className="text-4xl cursor-pointer" />
  //     </div>


  //   </div>
  // );



  return (
    <div className="sticky top-0 grid grid-cols-12 p-2 items-center bg-white z-50 ">

      {/* Left */}
      <div className="flex gap-3 col-span-4 sm:col-span-3 md:col-span-2 items-center">

        <GiHamburgerMenu
          className="text-2xl cursor-pointer mx-2 hidden md:block"
          onClick={() => show()}
        />

        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1280px-Logo_of_YouTube_%282015-2017%29.svg.png"
            alt="logo"
            className="w-20 sm:w-24"
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
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-l-full outline-none text-sm sm:text-base"
              onChange={(e) => setinp(e.target.value)}
              value={inp}
              onFocus={() => setshowsuggestion(true)}
              onBlur={() => setshowsuggestion(false)}
            />

            <button className="px-3 sm:px-5 border border-l-0 border-gray-300 bg-gray-100 rounded-r-full hover:bg-gray-200">

              <FaSearch className="text-sm sm:text-lg" />

            </button>

          </div>

          {/* Suggestions */}
          {
            suggestions.length > 0 && showsuggestion && (

              <ul className="absolute bg-white w-full px-2 py-2 z-50 border border-gray-200 rounded-md shadow-md">

                {
                  suggestions.map((item, index) => (
                    <li
                      className="py-1 cursor-pointer hover:bg-gray-100 text-sm sm:text-base"
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

      {/* Right */}
      <div className="col-span-2 sm:col-span-2 md:col-span-2 flex justify-end items-center">

        {/* Mobile search icon */}
        {/* <FaSearch className="text-xl mr-3 sm:hidden"/> */}

        <HiUserCircle className="text-3xl sm:text-4xl cursor-pointer" />

      </div>

    </div>
  );

}

export default Head;