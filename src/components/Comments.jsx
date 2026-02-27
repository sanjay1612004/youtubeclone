import { useEffect, useState } from "react"
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi2";
import { convert, timeAgo } from "../utils/contants";


function Comments({videoid}){
    const[comments,setcomments]=useState([])
    useEffect(()=>{
        getComments()
    },[])
    async function getComments(params) {
        const data=await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoid}&key=AIzaSyCz_YBQwlM-W4Iyxr9n9Iedfjjh3o7r4qQ`)
        const json=await data.json()
        // console.log(json.items[0].snippet.topLevelComment.snippet)
        setcomments(json.items)
    }
    // const {authorDisplayName,authorProfileImageUrl,likeCount,textOriginal,textDisplay}=comments
    // console.log(authorDisplayName)
     if (!comments?.length){
      return <div>
            <h1 className="text-2xl font-semibold">Comments</h1>

             No Comments
            </div>
    }

    return (
     
  <div className="max-w-225 w-full ">
    <h1 className="text-2xl font-semibold">Comments {comments.length}</h1>
    {/* {console.log(comments)} */}
    

    {comments?.map((item, ind) => {
      return (
        <div className="flex justify-between">

          {/* LEFT SIDE */}
          <div>

            <div className="flex mt-2 pt-2">
              <h1>
                <img
                  src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                  alt=""
                  className="rounded-full w-8 h-8"
                  onError={(e) => {
                    e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                  }}

                />
              </h1>
              <h1 className="mt-1 ml-1">
                {item.snippet.topLevelComment.snippet.authorDisplayName}.<span className="text-md mb-1">{timeAgo(item.snippet.topLevelComment.snippet.publishedAt)}</span>
              </h1>
            </div>

            <h1 className="wrap-break-word px-9">
              {item.snippet.topLevelComment.snippet.textOriginal}
            </h1>

            <div className="flex px-9 pt-3">
              <div className="flex">
                <AiOutlineLike className="mt-1" />
                <div className="mt-0">
                  {convert(item.snippet.topLevelComment.snippet.likeCount)}
                  
                </div>
              </div>

              <div>
                <AiOutlineDislike className="mt-1 mx-5" />
              </div>
            </div>

          </div>

          {/* RIGHT SIDE ⋮ */}
          <div>
            <span>⋮</span>
          </div>

        </div>
      );
    })}
  </div>
);
}
export default Comments