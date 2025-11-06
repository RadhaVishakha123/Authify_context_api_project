import { useLayoutEffect, useReducer, useState } from "react"

import useAuth from "../context/AuthContext";
import InputField from "../Header/InputField";
import { useMemo } from "react";
import { useRef } from "react";
export default function TodoTask(){
    const {CurrentUser}=useAuth();
    const Taskinput=useRef()
    const TaskListref=useRef();
function Reducer(state,Action){
switch(Action.Type){
    case "Add_task":
        return  [...state,{id:Date.now(),text:Action.payload}]
    case "Delete_task":
        return state.filter((task)=>task.id!==Action.payload)
   default:
    return state;
}
}

    const [todo,Dispatch]=useReducer(Reducer,[])
    const [Task,setTask]=useState("");
    function AddTask(){
        Dispatch({Type:"Add_task" , payload:Task})
        setTask("");

    }
    
    useLayoutEffect(()=>{
        if(Taskinput.current){
           Taskinput.current.focus();
        }
        if(TaskListref.current){
            TaskListref.current.scrollTop=TaskListref.current.scrollHight;
        }
    },[todo])
    const TotalRows=useMemo(()=>{
    return todo.length;
},[todo])
    if(CurrentUser){
    return(
        <>
        <div className="flex justify-center items-center h-screen">
  <div className="w-80 rounded-2xl p-4 shadow-lg bg-white">
    <InputField
      ref={Taskinput}
      type="text"
      value={Task}
      name="Task"
      onChange={(e) => setTask(e.target.value)}
      placeholder="Enter the Task"
      className="w-full p-1 m-1 rounded-xl border-2 border-blue-600 focus:border-b-blue-900 focus:ring-2 focus:ring-blue-900 outline-none"
    />

    <button
      onClick={AddTask}
      className="w-full p-1 m-1 rounded-xl bg-blue-600 text-white hover:bg-blue-800"
    >
      + Add
    </button>

    <p className="text-gray-700 text-sm mt-2 text-center">
      Total Tasks: {TotalRows}
    </p>

    {/* ✅ All tasks are now INSIDE this same box */}
    <div
      ref={TaskListref}
      className="max-h-60 overflow-y-auto mt-3 border-t border-gray-300 pt-2"
    >
      {todo.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center p-1 text-gray-800"
        >
          {task.text}
          <button
            className="w-20 p-1 m-1 rounded-xl bg-red-600 text-white hover:bg-red-800"
            onClick={() =>
              Dispatch({ Type: "Delete_task", payload: task.id })
            }
          >
            Delete
          </button>
        </li>
      ))}
    </div>
  </div>
</div>



        </>
    )
}
return(<>
<div className="flex items-center justify-center h-screen text-xl text-gray-700">
        Please log in to view this page.
      </div>
</>)
}