import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";

function SideBar() {
  return (
    <div className="h-[90vh] col-span-1 px-3 sticky top-16">
      <div className="">

        <div className="flex flex-col items-start mt-3 py-2">
          <IoMdHome className="text-3xl" />
          <h1 className="text-xs">Home</h1>
        </div>

        <div className="flex flex-col items-start mt-3">
          <SiYoutubeshorts className="text-3xl" />
          <h1 className="text-xs">Shorts</h1>
        </div>

        <div className="flex flex-col items-start mt-3">
          <MdSubscriptions className="text-3xl" />
          <h1 className="text-xs">Subscriptions</h1>
        </div>

        <div className="flex flex-col items-start mt-3">
          <HiUserCircle className="text-3xl" />
          <h1 className="text-xs">You</h1>
        </div>

      </div>
    </div>
  );
}

export default SideBar;