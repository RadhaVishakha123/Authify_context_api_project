import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { AuthContextProvider } from "../context/AuthContext";
import Header from "../Header/Header";
import { jsx } from "react/jsx-runtime";
function UserformWithprovider({children}) {
  const [registerdata2, setregisterdata] = useState(() => {
    return JSON.parse(localStorage.getItem("registerdata2")) || [];
  });
  const [CurrentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("CurrentUser")) || null;
  });
  function AddUser(data) {
    console.log("📩 AddUser called with:", data);
    const userExists = registerdata2.some(
      (user) =>
        user.Email.trim().toLowerCase() === data.Email.trim().toLowerCase()
    );
    if (userExists) {
      
      alert("User already exists!");
      return;
    }
    setregisterdata((pre) => [{ ...data }, ...pre]);
  }
  function FoundUser(Email, Password) {
    const found = registerdata2.find(
      (user) => user.Email === Email && user.Password === Password
    );
    console.log("currentuser:",found);
    if (found) setCurrentUser(found);
    return found || null;
  }
  function Logout() {
    setCurrentUser(null);
  }
  useEffect(() => {
    localStorage.setItem("registerdata2", JSON.stringify(registerdata2));
  }, [registerdata2]);
  useEffect(() => {
    localStorage.setItem("CurrentUser", JSON.stringify(CurrentUser));
  }, [CurrentUser]);
  return (
    <>
      <AuthContextProvider
        value={{ registerdata2, CurrentUser, Logout, AddUser, FoundUser }}
      >
        {children}
        
      </AuthContextProvider>
    </>
  );
}

export default UserformWithprovider;
