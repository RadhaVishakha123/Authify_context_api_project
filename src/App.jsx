import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProjectApp from './ProjectApp'
import { Route, RouterProvider , createBrowserRouter, createRoutesFromElements, BrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import TodoTask from './components/TaskAdd/TodoTask.jsx'
import UserPersonlDetails from './components/UserDataForm/UserPersonlDetails.jsx'
const router=createBrowserRouter([{
  path:"/",
  element:
    <ProjectApp/>
  ,
  children:[
    {path:"Home",element:<Home/>},
    {path:"About",element:<About/>},
    {path:"TodoTask",element:<TodoTask/>},
    {path:"UserPersonlDetails",element:<UserPersonlDetails/>},

  ]
}])

export default function App() {
  return(
    <>
    <RouterProvider router={router}/>
    </>
  );
}
