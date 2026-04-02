import { useEffect, useState } from "react"
import { Youtube_api } from "../utils/contants"
import VideoCard from "./VideoCard"
import { Link } from "react-router-dom"
function VideoContainer({menu}){
    useEffect(()=>{
        getvideos()
    },[])
    const [videos,setvideos]=useState([])

    async function getvideos(){
        const data=await fetch(Youtube_api)
        const json=await data.json()
        console.log(json.items)
        setvideos(json.items)
    }
    return(
        <div className="flex flex-wrap justify-center">
        
        {videos.map((item,ind)=>{
            return <Link to={'/watch?v='+item.id}><VideoCard info={videos[ind]} menu={menu}/></Link>
         })}
          
        </div>
    )
}
export default VideoContainer