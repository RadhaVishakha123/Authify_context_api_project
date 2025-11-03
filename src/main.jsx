import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider , createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import TodoTask from './components/TaskAdd/TodoTask.jsx'
import UserformWithprovider from './components/UsedataForm/UserformWithprovider.jsx'
import UserPersonlDetails from './components/UserDataForm/UserPersonlDetails.jsx'
const router=createBrowserRouter([{
  path:"/",
  element:
    <App/>
  ,
  children:[
    {path:"Home",element:<Home/>},
    {path:"About",element:<About/>},
    {path:"TodoTask",element:<TodoTask/>},
    {path:"UserPersonlDetails",element:<UserPersonlDetails/>},

  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
