import { useSearchParams } from "react-router-dom"
import Comments from "./Comments"
import Related from "./Related"
import { useEffect, useState } from "react"
import { convert, googleapi } from "../utils/contants"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";

function WatchPage(){

const [searchParams]=useSearchParams()
const [channelinfo,setchannelinfo]=useState({})
const [channelid,setchannelid]=useState('')
const [like,setlike]=useState(0)
const videoId=searchParams.get('v')
const [videotitle,setvideotitle]=useState('')
const [subscribed,setSubscribed]=useState(false)

useEffect(()=>{
window.scrollTo({top:0,behavior:"smooth"})
},[])

useEffect(()=>{
if(videoId){
getchannelid()
}
},[videoId])

useEffect(()=>{
if(channelid){
getchannelinfo()
}
},[channelid])

async function getchannelid(){

const data=await fetch(
`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${googleapi}`
)

const json=await data.json()

setlike(Number(json?.items[0]?.statistics?.likeCount))

setchannelid(json.items[0].snippet.channelId)

setvideotitle(json.items[0].snippet.localized.title)

}

async function getchannelinfo(){

const data=await fetch(
`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelid}&key=${googleapi}`
)

const json=await data.json()

setchannelinfo(json)

}

const {title}=channelinfo?.items?.[0]?.snippet?.localized || {}

const {url}=channelinfo?.items?.[0]?.snippet?.thumbnails?.default || {}

const {subscriberCount}=channelinfo?.items?.[0]?.statistics || {}

useEffect(()=>{
document.title=videotitle
},[videotitle])

return (

<div className="flex flex-col lg:flex-row gap-4 w-full p-2 overflow-x-hidden ">

<div className="flex-1 min-w-0">

<div className="w-full px-2">

<iframe
src={"https://www.youtube.com/embed/"+videoId}
title="YouTube video player"
className="w-full aspect-video rounded-lg"
allowFullScreen
></iframe>

</div>

{/* Video info */}
<div className="mt-3 ml-2">

<h1 className="text-lg sm:text-xl font-bold">
{videotitle}
</h1>

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">

{/* Channel */}
<div className="flex items-center gap-4">

<img 
src={url} 
alt=""
className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
/>

<div>

<h2 className="font-medium text-sm">
{title}
</h2>

<p className="text-xs text-gray-600">
{convert(subscriberCount)} subscribers
</p>

</div>

<button
className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-3 py-2 rounded-full"
onClick={()=>setSubscribed(!subscribed)}
>

{subscribed ? "Subscribed" : "Subscribe"}

</button>

</div>

<div className="flex flex-wrap items-center gap-2 sm:gap-3">

<button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 sm:px-5 py-2 rounded-full">

<AiOutlineLike
className="text-lg cursor-pointer"
onClick={()=>setlike(prev=>prev+1)}
/>

<span className="text-sm">
{convert(like)}
</span>

</button>

<button className="flex items-center bg-gray-100 hover:bg-gray-200 p-2 rounded-full">

<AiOutlineDislike className="text-lg"/>

</button>

<button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full">

<RiShareForwardLine/>

<span className="text-sm">
Share
</span>

</button>

<button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full">

<CiBookmark/>

<span className="text-sm">
Save
</span>

</button>

</div>

</div>

</div>

<div className="w-full mt-4 ml-2">

<Comments videoid={videoId}/>

</div>

</div>

<div className="w-full lg:w-95 xl:w-105 shrink-0">

<Related videoId={videoId}/>

</div>

</div>

)

}

export default WatchPage