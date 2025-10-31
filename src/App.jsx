import { useCallback, useState } from "react"
import Header from "./components/Header/Header"
import { Outlet } from "react-router-dom"
import UserForm from "./components/UsedataForm/UserForm"
import UserformWithprovider from "./components/UsedataForm/UserformWithprovider"
import Footer from "./components/Footer/Footer"
export default function App(){
    const [IsuserFormopen, setuserFormopen]=useState()
    const openUserform=useCallback(()=>{setuserFormopen(true)},[])
    const closeUserform=useCallback(()=>{setuserFormopen(false)},[])
    return(
        <>
       <UserformWithprovider>
        <Header onLoginClick={openUserform}/>
        <main>
            <Outlet/>
            {IsuserFormopen && (
          <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-30">
            <div className="bg-white p-6 rounded-xl shadow-2xl relative w-96">
              <button
                onClick={closeUserform}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
              <UserForm loginClose={closeUserform}/>
            </div>
          </div>
        )}
        </main>
<Footer/>
</UserformWithprovider>
        </>
    )
}