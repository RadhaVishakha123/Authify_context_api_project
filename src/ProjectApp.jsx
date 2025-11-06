import { useCallback, useState } from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import UserForm from "./components/Authformfolder/Authform";
import AuthProvider from "./components/context/AuthProvider";
import Footer from "./components/Footer/Footer";
import UserPersonlDetails from "./components/UserDataForm/UserPersonlDetails";
import Children from "./Children";
export default function ProjectApp() {
  //for login register page(popup)
  return (
    <>
      <AuthProvider>
        <Header/>
          <Children />
        <Footer />
      </AuthProvider>
    </>
  );
}
