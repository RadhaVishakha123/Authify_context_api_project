import { Link,NavLink } from "react-router-dom"
import useAuth from "../context/AuthContext.js"
import { useState } from "react"
import { useRef ,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import UserPersonlDetails from "../UserDataForm/UserPersonlDetails.jsx"
import Authform from "../Authformfolder/Authform.jsx"
export default function Header(){
  

    const {CurrentUser,Logout,IsuserFormopen,openUserform,closeUserform,IsProfileopen,openProfile,closeProfile}=useAuth()
    const [isUserIconSlide, setUserIconSlide]=useState(false);
    const navigate=useNavigate()
    const Slideref=useRef(null)//ref to doesn’t exist yet — it hasn’t been rendered to the DOM.
    function HandleToggleslide(e){
        
        setUserIconSlide((pre)=>!pre);
    }
    
    function LogoutUser(){
        Logout()
        setUserIconSlide(false)

    }
    function SubmitLogin(){
        openUserform()
        setUserIconSlide(false);
    }
    function ProfileUserhandling(){
      openProfile()
      setUserIconSlide(false);

    }
    
    useEffect(()=>{
        function handleClickOutside(event) {
      if (Slideref.current && !Slideref.current.contains(event.target)) {
        setUserIconSlide(false);
      }
    }
    

    if (isUserIconSlide) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {//The component unmounts (is removed from the screen), or
                 //The useEffect re-runs (when its dependencies change).
      document.removeEventListener("mousedown", handleClickOutside);
    };
    },[isUserIconSlide])

    return(
        <>
        <div className="w-full bg-blue-200 h-15">
        <div className="flex justify-between w-full h-15 pt-4 px-4 ">
            <div className="ml-6"> 
                Demo
            </div>
            <nav className=" space-x-6 text-gray-700">
                
            
                <NavLink to="/Home" className={({isActive})=>(isActive?"text-blue-800":"text-gray-700")}>Home</NavLink>
                <NavLink to="/About" className={({isActive})=>(isActive?"text-blue-800":"text-gray-700")}>About</NavLink>
                <NavLink to="/TodoTask" className={({isActive})=>(isActive?"text-blue-800":"text-gray-700")}>TodoTask</NavLink>
                {/* <NavLink to="/UserPersonlDetails" className={({isActive})=>(isActive?"text-blue-800":"text-gray-700")}>Profile</NavLink> */}
                
            </nav>
            <div className="mr-6" onClick={HandleToggleslide}>
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
            </div>
            {isUserIconSlide && (
  <div  className="absolute right-4 mt-8 bg-white shadow-lg rounded-xl p-4">
    {CurrentUser ? (
      <div ref={Slideref} className="flex flex-col">
        <button onClick={ProfileUserhandling} className="bg-blue-500 text-white mb-3 p-2 rounded">
          + Profile
        </button>
        <button onClick={LogoutUser} className="bg-red-500 text-white p-2 rounded">
          Logout
        </button>
      </div>
    ) : (
      <button onClick={SubmitLogin} className="bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    )}
  </div>
)}


        </div>
        </div>
        {IsuserFormopen && (
            <div className="fixed inset-0 bg-black/30 flex justify-center items-center h-screen">
              <div className="bg-white p-6 rounded-xl shadow-2xl relative w-96">
                <button
                  onClick={closeUserform}
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
                <Authform />
              </div>
            </div>
          )}
          {IsProfileopen && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center h-screen">
              <div className="bg-white p-6 rounded-xl shadow-2xl relative ">
                <button
                  onClick={closeProfile}
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
                <UserPersonlDetails />
              </div>
            </div>
          )}
        </>
    )
}