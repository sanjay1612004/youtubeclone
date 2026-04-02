import ButtonList from "./ButtonList"
import VideoContainer from "./VideoContainer"

function MainContainer({menu}){
    return (
        <div className="col-span-11 min-w-0">
        <div className="sticky top-14 z-40 bg-white ">
            <ButtonList/>
        </div>
        
            <VideoContainer menu={menu}/>
        </div>
    )
}
export default MainContainer