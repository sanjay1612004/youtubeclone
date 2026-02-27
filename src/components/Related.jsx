import { useEffect, useState } from "react";
import { convert, googleapi, timeAgo } from "../utils/contants";
import { Link } from "react-router-dom";

function Related({ videoId }) {

  const [categoryId, setCategoryId] = useState(null);
  const[items,setitems]=useState([])

  useEffect(() => {
    if (!videoId) return;
    fetchCategory();
  }, [videoId]);

  async function fetchCategory() {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${googleapi}`
    );

    const json = await data.json();

    const category = json.items[0]?.snippet?.categoryId;
    // console.log("Category:", category);

    setCategoryId(category);
  }

  useEffect(() => {
    if (!categoryId) return;
    getRelated();
  }, [categoryId]);

  async function getRelated() {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${googleapi}`
    );

    const json = await data.json();
    // console.log("Related:", json.items);
    setitems(json.items)
  }

  return (
    <div>
      {/* <h1 className="text-2xl font-bold text-center">Related video</h1> */}
      
        {items?.map((item) => (
        <a href={'/watch?v='+item.id}>
        <div
            key={item.id}
            className="flex gap-3 p-2 mb-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
        >
    <img
      src={item?.snippet?.thumbnails?.medium?.url}
      alt="thumbnail"
      className="w-40 h-24 object-cover rounded-xl "
    />

    <div className="flex flex-col flex-1 min-w-0">
      <h3 className="text-sm font-semibold line-clamp-2 wrap-break-word">
        {item?.snippet?.localized?.title}
      </h3>

      <p className="text-xs text-gray-600 mt-1">
        {item?.snippet?.channelTitle}
      </p>

      <p className="text-xs text-gray-600">
        {convert(Number(item?.statistics?.viewCount)).toLocaleString()} views •{" "}
        {timeAgo(item?.snippet?.publishedAt)}
      </p>
    </div>

    {/* Menu */}
    <div className="text-gray-500 hover:text-black">
      <span className="text-lg">⋮</span>
    </div>
  </div>
  </a>
))}
     
    </div>
  );
}

export default Related;