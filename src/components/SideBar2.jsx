import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { GoHistory  } from "react-icons/go";
import { CgPlayList } from "react-icons/cg";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { MdFileDownload } from "react-icons/md";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMdMusicalNote } from "react-icons/io";
import { MdMovie } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { FaRegNewspaper } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
import { Link } from "react-router-dom";


function SideBar2(){
 return (
    <div className="px-2  h-[90vh] py-2 col-span-1 sticky top-16">
        <div className="border-b border-[#ccc] px-3">
            <div className="flex pb-2 dark:text-[#E5E5E5]">
                <IoMdHome className="text-3xl "/>
                <h1 className="text-md mt-1 ml-5  ">Home</h1>
            </div>
            <div className="flex mt-2 dark:text-[#E5E5E5]">
                <SiYoutubeshorts className="text-2xl" />
                <h1 className="text-md mt-1 ml-5 ">Shorts</h1>
            </div>
            <div className="flex mt-2 dark:text-[#E5E5E5]">
                <MdOutlineSubscriptions className="text-2xl" />
                <h1 className="text-md mt-1 ml-5 ">Subscriptions</h1>
            </div>
        </div>
        <div className="border-b border-[#ccc] p-3">
          <div>
            <h1 className="font-semibold">You </h1>
          </div>
            <div className="flex pb-2 pt-3">
                <GoHistory className="text-2xl"/>

                <h1 className="text-md  ml-5  ">History</h1>
            </div>
            <div className="flex mt-2 ">
                <CgPlayList className=" text-2xl"/>

                <h1 className="text-md  ml-5 ">PlayList</h1>
            </div>
            <div className="flex mt-2 pt-1">
                <MdOutlineWatchLater className="text-2xl" />
                <h1 className="text-md  ml-5 ">Watch later</h1>
            </div>
            <div className="flex mt-2 pt-1">
                <AiOutlineLike className="text-2xl" />
                <h1 className="text-md  ml-5  ">Liked</h1>
            </div>
            <div className="flex mt-2 pt-1">
                <MdFileDownload className="text-2xl" />
                <h1 className="text-md  ml-5 ">Download</h1>
            </div>
        </div>
        <div className=" p-3">
          <div>
            <h1 className="font-semibold">Explore</h1>
          </div>
            <div className="flex pb-2 pt-3">
                <IoMdMusicalNote className="text-2xl font-bold"/>
                {/* <h1 className="text-md  ml-5  ">Music</h1> */}
                <a href="/?category=10"><h1 className="text-md  ml-5  ">Music</h1></a>
            </div>
            <div className="flex mt-2 pt-1">
                <MdMovie className="text-2xl" />
                <h1 className="text-md  ml-5  ">Movie</h1>
            </div>
            <div className="flex mt-2 pt-1">
                <SiYoutubegaming className="text-2xl" />
                <h1 className="text-md  ml-5  ">Games</h1>
            </div>
            <div className="flex mt-2 pt-1">
                <FaRegNewspaper className="text-2xl" />
                <h1 className="text-md  ml-5 ">News</h1>
            </div>
            <div className="flex mt-2 pt-1">
                <FaTrophy className="text-2xl" />
                <h1 className="text-md  ml-5 ">Sports</h1>
            </div>
        </div>
    </div>
 )
}
export default SideBar2