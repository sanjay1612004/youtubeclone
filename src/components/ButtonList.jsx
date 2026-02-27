import Buttons from "./Buttons"

function ButtonList(){
const l = ["All", "Shorts", "Videos", "Live", "Music", "Gaming", "News", "Sports", "Podcasts", "Recently uploaded", "Watched", "New to you"];
    return (
        <div className="w-full overflow-hidden py-2 bg-white">
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap px-2">
        {l.map((item,index)=>{
            return <Buttons name={item} key={index}/>
        })}
        </div>
        </div>
        
    )
}
export default ButtonList