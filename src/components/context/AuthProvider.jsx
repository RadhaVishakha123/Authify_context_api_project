import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { AuthContextProvider } from "./AuthContext";
import { useCallback } from "react";
function AuthProvider({ children }) {
  const [registerdata2, setregisterdata] = useState(() => {
    return JSON.parse(localStorage.getItem("registerdata2")) || [];
  });
 
  const [CurrentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("CurrentUser")) || null;
  });
  function AddUser(data) {
    const id = nanoid(10);
    console.log(" AddUser called with:", data);
    const userExists = registerdata2.some(
      //
      (user) =>
        user.Email.trim().toLowerCase() === data.Email.trim().toLowerCase()
    );
    if (userExists) {
      alert("User already exists!");
      return;
    }
    setregisterdata((pre) => [{ id: id, ...data }, ...pre]);
  }
  function FoundUser(Email, Password) {
    const found = registerdata2.find(
      (user) => user.Email === Email && user.Password === Password
    );
    console.log("currentuser:", found);
    if (found) setCurrentUser(found);
    return found || null;
  }
  function Logout() {
    setCurrentUser(null);
  }
  const [UserProfiledata, setProfiledata] = useState(() => {
    return JSON.parse(localStorage.getItem("UserProfiledata")) || [];
  });

  function AddUpadteProfile(Data) {
    if (!CurrentUser) return null;
    const foundid = UserProfiledata.find((data) => data.id == CurrentUser.id);
    if (foundid) {
      setProfiledata((pre) =>
        pre.map((profiledata) =>
          foundid.id == profiledata.id
            ? { id: foundid.id, ...Data }
            : profiledata
        )
      );
    } else {
      setProfiledata((pre) => [...pre, { ...Data }]);
    }
  }
  function FetchExitProfile() {
    if (!CurrentUser) return null;
    const found = UserProfiledata.find((data) => data.id == CurrentUser.id);
    if (found) {
      console.log("exit user data:",found);
      return found;
    } else {
      console.log("not exit user data:",CurrentUser);
      return CurrentUser;
    }
  }
  //login/register and profile form
  const [IsuserFormopen, setuserFormopen] = useState();
    const openUserform = useCallback(() => {
      setuserFormopen(true);
    }, []);
    const closeUserform = useCallback(() => {
      setuserFormopen(false);
    }, []);
    // profile page(popup)
    const [IsProfileopen, setProfile] = useState();
    const openProfile = useCallback(() => {
      setProfile(true);
    }, []);
    const closeProfile = useCallback(() => {
      setProfile(false);
    }, []);

  useEffect(() => {
    localStorage.setItem("UserProfiledata", JSON.stringify(UserProfiledata));
  }, [UserProfiledata]);
  useEffect(() => {
    localStorage.setItem("registerdata2", JSON.stringify(registerdata2));
  }, [registerdata2]);
  useEffect(() => {
    localStorage.setItem("CurrentUser", JSON.stringify(CurrentUser));
  }, [CurrentUser]);
  return (
    <>
      <AuthContextProvider
        value={{
          registerdata2,
          CurrentUser,
          Logout,
          AddUser,
          FoundUser,
          UserProfiledata,
          AddUpadteProfile,
          FetchExitProfile,
          IsuserFormopen,openUserform,closeUserform,//login register form
          IsProfileopen,openProfile,closeProfile//profile form


        }}
      >
        

        {children}
      </AuthContextProvider>
    </>
  );
}

export default AuthProvider;
