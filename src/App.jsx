import { useState } from "react"
import Body from "./components/Body"
import Head from "./components/Head"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainContainer from "./components/MainContainer"
import WatchPage from "./components/WatchPage"



function App(){
  const[menu,setmenu]=useState(false)
        function show(){
            setmenu(!menu)
        }
    const appRouter=createBrowserRouter([{
        path:'/',
        element:<Body show={show} menu={menu}/>,
        children:[
          {
            path:'/',
            element:<MainContainer/>
          },
          {
            path:'watch',
            element:<WatchPage/>
          }
        ]
}])
  return (
    <>
      {/* <Head show={show} menu={menu}/> */}
      {/* <Body show={show} menu={menu}/> */}
      <RouterProvider router={appRouter}/>
    </>
  )
}
export default App