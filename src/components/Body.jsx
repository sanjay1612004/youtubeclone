import { useState } from "react";
import MainContainer from "./MainContainer";
import SideBar from "./SideBar";
import SideBar2 from "./SideBar2";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Body({show,menu}){

    const location=useLocation()
    const iswatch=location.pathname==="/watch"
   
    return (
        <div className="grid grid-flow-col ">
            
        {!iswatch && (menu ?<SideBar2/>:<SideBar/>)}
    
        <Outlet/>
        </div>
    )
}
export default Body;