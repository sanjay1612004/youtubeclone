import { useSearchParams } from "react-router-dom"
import Comments from "./Comments"
import Related from "./Related"
import { useEffect, useState } from "react"
import { convert, googleapi, timeAgo } from "../utils/contants"
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";

function WatchPage(){
    const[searchParams]=useSearchParams()
    const[channelinfo,setchannelinfo]=useState({})
    const[channelid,setchannelid]=useState('')
    const[like,setlike]=useState(0)
    const videoId=searchParams.get('v')
    const[videotitle,setvideotitle]=useState('')
    const [subscribed, setSubscribed] = useState(false)

    useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}, [])

    useEffect(()=>{
        if (videoId){
            getchannelid()
        }
    },[videoId])
    useEffect(()=>{
        if (channelid){
            getchannelinfo()

        }
    },[channelid])
    async function getchannelid() {
        const data=await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${googleapi}`)
        const json=await data.json()
        console.log(json.items[0])
        setlike(json?.items[0]?.statistics?.likeCount)
        setchannelid(json.items[0].snippet.channelId)
        setvideotitle(json.items[0].snippet.localized.title)
    }

    async function getchannelinfo() {
        const data=await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelid}&key=${googleapi}`)
        const json=await data.json()
        console.log(json)
        setchannelinfo(json)
    }
    // const {channelTitle,description}=channelinfo?.items[0]?.snippet || {}
    const {title,description}=channelinfo?.items?.[0]?.snippet?.localized || {}
    const {url}=channelinfo?.items?.[0]?.snippet?.thumbnails?.default || {}
    const {viewCount,subscriberCount}=channelinfo?.items?.[0]?.statistics || {}


    return (
        <div className="flex">
            <div className="m-1 p-2">
            <iframe 
            width="900" 
            height="500" 
            src={"https://www.youtube.com/embed/"+searchParams.get('v')+"?si=n_gUuMqEVwpzwybj" }
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            <div className="m-2 p-2">
                <h1 className="text-xl font-bold">{videotitle}</h1>
                
                <div className="flex items-center justify-between mt-4">

                    <div className="flex items-center gap-4">
                        <img src={url} alt="" className="w-12 h-12 rounded-full" />

                        <div>
                        <h2 className="font-medium text-sm">{title}</h2>
                        <p className="text-xs text-gray-600">
                            {convert(subscriberCount)} subscribers
                        </p>
                        </div>

                        <button className="ml-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-full transition"   onClick={() => setSubscribed(!subscribed)}>
                              {subscribed ? "Subscribed" : "Subscribe"}

                        </button>
                    </div>

                    <div className="flex items-center gap-3">

                        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition">
                        <AiOutlineLike className="text-lg" onClick={()=>setlike(Number(like)+1)}/>
                        <span className="text-sm font-medium">
                            {like}
                        </span>
                        </button>

                        <button className="flex items-center bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
                        <AiOutlineDislike className="text-lg" />
                        </button>

                        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition">
                        <RiShareForwardLine className="text-lg" />
                        <span className="text-sm font-medium">Share</span>
                        </button>

                        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition">
                        <CiBookmark className="text-lg" />
                        <span className="text-sm font-medium">Save</span>
                        </button>

                    </div>

                    </div>
                                    
            </div>

            <div className="w-225 mx-5 mt-3">
                <Comments videoid={searchParams.get('v')}/>

            </div>
            </div>
            <div className="">
                <Related videoId={searchParams.get('v')}/>
            </div>
        </div>
    )
}
export default WatchPage