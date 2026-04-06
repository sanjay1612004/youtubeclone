import { convert } from "../utils/contants";


function VideoCard({ info,menu }) {
  if (!info) return null;

  const {
    snippet: { title, thumbnails, channelTitle,categoryId },
    statistics: { viewCount },
  } = info;
  console.log(info)

  return (
    <div className={`p-3 m-2 w-full ${menu ? "sm:w-72":"sm:w-68"} cursor-pointer  rounded-lg`}>
      <img
        src={thumbnails?.high?.url}
        alt="thumbnail"
        className="w-full aspect-video object-cover rounded-lg"
      />

      <div className="mt-3">
        <div className="flex justify-between font-bold ">
            <h2 className="font-medium text-sm line-clamp-2 dark:text-[#E5E5E5]">
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