import { GoogleLogin } from "@react-oauth/google"
import { ImPower } from "react-icons/im"
import { jwtDecode } from "jwt-decode"
import { useContext, useEffect } from "react"
import { UserContext, UserProfile } from "../App"

function Login(){
    const {user,setuser}=useContext(UserContext)
    const {profile,setprofile}=useContext(UserProfile)
    function handlesuccess(res){
        const decoded=jwtDecode(res.credential)
        const {picture}=decoded
        console.log(decoded)
        setuser(decoded)
        sessionStorage.setItem("profile",picture)
        sessionStorage.setItem("user",JSON.stringify(decoded))

        setprofile(picture)
    }
    useEffect(()=>{
        const savedUser = sessionStorage.getItem("user")

        const savedProfile = sessionStorage.getItem("profile")

        if(savedUser){
        setuser(JSON.parse(savedUser))
        }
        if(savedProfile){

        setprofile(savedProfile)

        }

},[])
    return (
        <div>
            <GoogleLogin
            onSuccess={handlesuccess}
            onError={()=>console.log("some error occured")}
            useOneTap
            size="medium"
            text="continue_with"
            shape="pill"
            />
        </div>
    )
}
export default Login