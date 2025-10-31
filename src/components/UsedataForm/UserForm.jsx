import { useRef, useState } from "react";
import InputField from "../Header/InputField";
import useAuth from "../context/AuthContext";
export default function UserForm({loginClose}){
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
    const {AddUser,FoundUser}=useAuth();
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
            console.log("email:",Data.Email);
            console.log("email:",Data.Password);

            const found=FoundUser(Data.Email,Data.Password)
            console.log("currentdata:",found);
            if(found){
                loginClose(); 
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
        type="password" 
        placeholder="Password" 
        value={Data.Password} 
        name="Password" 
        onChange={Handeldata}
        Error={Errors.Password} />

        {!islogpage && 
        (<InputField 
            ref={CPasswodinputref} 
            type="password" 
            placeholder=" Confirm Password" 
            value={Data.CPassword}
            name="CPassword" 
            onChange={Handeldata}
            Error={Errors.CPassword} />

        )}
        <button  className="w-full p-1.5  rounded-xl bg-blue-600 hover:bg-blue-700
        hover:right-1.5 hover:ring-blue-600 outline-none" 
        onClick={handlesubmit}>{islogpage?"Login":"Register"}</button>
        <p className="text-center cursor-pointer hover:text-blue-600 " onClick={Toggleform}>{islogpage?"Do't have account? Register":"Already have an account? Login"}</p>
        </>
    )
}