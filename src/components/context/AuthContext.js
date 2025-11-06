import { createContext } from "react";
import { useContext } from "react";
export const AuthContext=createContext({
registerdata1:[
    {Username:"",Password:"",Email:""},
],
CurrentUser:null,
Logout:()=>{},
AddUser:(data)=>{},
FoundUser:(Email,Password)=>{},
UserProfiledata:[],
AddUpadteProfile:()=>{},
FetchExitProfile:()=>{},
IsuserFormopen:false,openUserform:()=>{},closeUserform:()=>{},//login register form
          IsProfileopen:false,openProfile:()=>{},closeProfile:()=>{}//profile form
});
export const AuthContextProvider=AuthContext.Provider;
export default function useAuth(){
    return(useContext(AuthContext))
}