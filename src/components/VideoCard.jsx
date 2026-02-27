import { convert } from "../utils/contants";


function VideoCard({ info,menu }) {
  if (!info) return null;

  const {
    snippet: { title, thumbnails, channelTitle,categoryId },
    statistics: { viewCount },
  } = info;
  console.log(info)

  return (
    <div className={`p-3 m-2 ${menu ? "w-72":"w-68"} cursor-pointer  rounded-lg`}>
      <img
        src={thumbnails?.high?.url}
        alt="thumbnail"
        className="rounded-xl h-40 w-full object-cover"
      />

      <div className="mt-3">
        <div className="flex justify-between font-bold">
            <h2 className="font-semibold text-sm line-clamp-2">
            {title}
            </h2>
            <span className="font-bold">⋮</span>
        </div>
      

        <p className="text-sm text-gray-600 mt-1">
          {channelTitle}
        </p>

        <p className="text-sm text-gray-600">
          {convert(Number(viewCount))} views
        </p>
      </div>
    </div>
  );
}

export default VideoCard;