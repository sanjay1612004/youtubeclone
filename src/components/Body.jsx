import { useState } from "react";
import MainContainer from "./MainContainer";
import SideBar from "./SideBar";
import SideBar2 from "./SideBar2";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Head from "./Head";


function Body({show,menu}){

    const location=useLocation()
    const iswatch=location.pathname==="/watch"
   
    return (
        <div>
                  <Head show={show} menu={menu}/>

        <div className="grid grid-flow-col ">
        <div className="hidden md:block lg:block">
            {!iswatch && (!menu ?<SideBar2/>:<SideBar/>)}

        </div>
            
    
        <Outlet/>
        </div>
        </div>
    )
}
export default Body;