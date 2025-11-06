import React, { useRef, useState } from "react";
import InputField from "../Header/InputField";
import useAuth from "../context/AuthContext";
 const Authform=React.memo(
 function UserForm(){
    const [islogpage, setlaoginpage]=useState(true)
    const[Errors,setErrors]=useState({})
    const Nameinputref =useRef()
    const Emailinputref=useRef()
    const Passwodinputref=useRef()
    const CPasswodinputref=useRef()
    const [Data,Setdata]=useState({
        Username:"",
        Password:"",
        CPassword:"",
        Email:""      
    })
    const [isshowpassword,setpasswordshowhide]=useState(false);
    const [isshowcpassword,setcpasswordshowhide]=useState(false);
    const showicon=(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>);
    const hideicon=(<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
        <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>)
    const {AddUser,FoundUser,closeUserform}=useAuth();
    function ValidationInput(){
        let ErrorObject={}
        if(!islogpage && !Data.Username.trim()){
            ErrorObject.Username="Username is required";
        }
        if(!Data.Email.trim()){
            ErrorObject.Email="Email is required"
        }
        else if(!Data.Email.includes("@")){
            ErrorObject.Email="Invalid email formate"
        }
        if (!Data.Password.trim()) {
      ErrorObject.Password = "Password is required";
    } else if (Data.Password.length < 4) {
     ErrorObject.Password = "Password must be at least 4 characters";
    }

    if (!islogpage && Data.Password !== Data.CPassword) {
      ErrorObject.CPassword = "Passwords do not match";
    }
    setErrors(ErrorObject)
    return Object.keys(ErrorObject).length===0

    }
    function Handeldata(e){
        const {name,value}=e.target;
        Setdata((pre)=>({
            ...pre,
            [name]:value}
        )
        )

    }
    function handlesubmit(){
        if(!ValidationInput()) return;
        if(islogpage){
            Emailinputref.current.clear();
            Passwodinputref.current.clear();
            Emailinputref.current.getValue();
            
            console.log("email:",Data.Email);
            console.log("email:",Data.Password);

            const found=FoundUser(Data.Email,Data.Password)
            Setdata({
        Username:"",
        Password:"",
        CPassword:"",
        Email:"" }) 
            console.log("currentdata:",found);
            if(found){
                closeUserform(); 
            }
            else{
                alert("User not found!");
            }
        }
        else{
            const { CPassword, ...data1 } = Data; 
            AddUser(data1)
            Setdata({
        Username:"",
        Password:"",
        CPassword:"",
        Email:"" })  
        alert("registertion done!") 
            setlaoginpage(true)
        }
        
    }
    function Toggleform(){
        setlaoginpage((pre)=>!pre)
    }
    
    return(
        <>
        <h1 className="text-center"> {islogpage?"Login":"Register"}</h1>
        {!islogpage && 
        (<InputField ref={Nameinputref} 
            type="text" placeholder=" Username" 
            value={Data.Name} name="Username" 
            onChange={Handeldata}
            Error={Errors.Username}
            ></InputField>

        )}
        
        <InputField 
        ref={Emailinputref} 
        type="Email" placeholder="Email" 
        value={Data.Email} name="Email" 
        onChange={Handeldata}
        Error={Errors.Email}></InputField>

        <InputField 
        ref={Passwodinputref} 
        type={isshowpassword?"text":"password"}
        placeholder="Password" 
        value={Data.Password} 
        name="Password" 
        onChange={Handeldata}
        icon={isshowpassword?showicon:hideicon}
        Error={Errors.Password}
        Icontoggle={()=>setpasswordshowhide(!isshowpassword)} />
        

        {!islogpage && 
        (<InputField 
            ref={CPasswodinputref} 
            type={isshowcpassword?"text":"password"}
            placeholder=" Confirm Password" 
            value={Data.CPassword}
            name="CPassword" 
            onChange={Handeldata}
            icon={isshowcpassword?showicon:hideicon}
            Error={Errors.CPassword} 
            Icontoggle={()=>setcpasswordshowhide(!isshowcpassword)}/> 

        )}
        <button  className="w-full p-1.5  rounded-xl bg-blue-600 hover:bg-blue-700
        hover:right-1.5 hover:ring-blue-600 outline-none" 
        onClick={handlesubmit}>{islogpage?"Login":"Register"}</button>
        <p className="text-center cursor-pointer hover:text-blue-600 " onClick={Toggleform}>{islogpage?"Do't have account? Register":"Already have an account? Login"}</p>
        </>
    )
}
 )
 export default Authform