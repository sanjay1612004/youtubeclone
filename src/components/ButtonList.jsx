import Buttons from "./Buttons"

function ButtonList(){
const l = ["All", "Shorts", "Videos", "Live", "Music", "Gaming", "News", "Sports", "Podcasts", "Recently uploaded", "Watched", "New to you","Popular","Movies",];
    return (
        <div className="w-full overflow-hidden py-2 bg-white dark:bg-[#171717]">
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap px-2 min-w-0 scrollbar-hide">
        {l.map((item,index)=>{
            return <Buttons name={item} key={index}/>
        })}
        </div>
        </div>
        
    )
}
export default ButtonList