import { createContext, useState } from "react"
import Body from "./components/Body"
import Head from "./components/Head"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainContainer from "./components/MainContainer"
import WatchPage from "./components/WatchPage"
import { GoogleOAuthProvider } from "@react-oauth/google"

const clinetid=import.meta.env.VITE_GOOGLE_CLIENT_ID
export const UserContext=createContext()
export const UserProfile=createContext()
function App(){
  const[menu,setmenu]=useState(false)
  const [user,setuser]=useState(null)
  const[profile,setprofile]=useState(null)
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
      <UserProfile.Provider value={{profile,setprofile}}>
      <UserContext.Provider value={{user,setuser}}>
      <GoogleOAuthProvider clientId={clinetid}>
          <RouterProvider router={appRouter}/>
      </GoogleOAuthProvider>
      </UserContext.Provider>
      </UserProfile.Provider>
    </>
  )
}
export default App