import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StudentdataSchema from '../ZodSchema/StudentdataSchema'
import { useEffect, useState } from "react";
export default function UserPersonlDetails() {
  const [iscpassword,setcpasword]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors,isDirty,isValid,isSubmitting,touchedFields},
    reset,unregister,watch
  } = useForm({mode:"onTouched",
    resolver:zodResolver(StudentdataSchema)
  });//mode: "onTouched" → runs validation when user touches (focus + blur) a field.
// Other modes:
// "onChange" → validate as user types.
// "onBlur" → validate when user leaves input.
// "onSubmit" (default) → validate only on form submit.
  const form = useForm();
console.log("UserForm:",form);

  function SubmitForm(Data) {
    console.log("User data:", Data);
    const StudentData=JSON.parse(localStorage.getItem("StudentData"))||[];
    StudentData.push(Data)
    localStorage.setItem("StudentData",JSON.stringify(StudentData))
 
    alert("data submit succesfuly");
    reset()
    
  }
 let password=watch("Password");
 let cpassword=watch("cPassword")
 useEffect(()=>{
  if(password && cpassword){
  if(password==cpassword){
    setcpasword(false);
  }
  else{
    setcpasword(true);
  }
 }
 },[password,cpassword])
 

  return (
    <>
      <div className="flex  justify-center items-center w-full m-4 p-4">
        <div className="w-250 rounded-2xl p-4 shadow-lg bg-blue-50 ">
          <h2 className="text-center text-2xl font-bold mb-4">
            User Information Form
          </h2>
          <form
            onSubmit={handleSubmit(SubmitForm)}
            className="flex flex-wrap justify-between gap-4"
          >
            <div className="w-[48%] p-4 rounded-xl flex items-center justify-between gap-2">
              <label className=" text-lg mb-1">Full Name</label>
              <input
                {...register("fullname")}
                className="w-80 p-1 m-1 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
              ></input>
              { errors.fullname && (
                <p className="text-red-500 text-sm">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div className="w-[48%] p-4 rounded-xl flex items-center justify-between gap-2">
              <label className=" text-lg mb-1">Email</label>
              <input type="email"
                {...register("Email", )}
                className="w-80 p-1 m-1 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
              ></input>
              {errors.Email && (
                <p className="text-red-500 text-sm">{errors.Email.message}</p>
              )}
            </div>
            <div className="w-[48%] p-4 rounded-xl flex items-center justify-between gap-2">
              <label className=" text-lg mb-1">Password</label>
              <input type="password"
                {...register("Password", )}
                className="w-80 p-1 m-1 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
              ></input>
              {errors.Password && (
                <p className="text-red-500 text-sm">{errors.Password.message}</p>
              )}
            </div>
            <div className="w-[48%] p-4 rounded-xl flex items-center justify-between gap-2">
              <label className=" text-lg mb-1">Comfirm Password</label>
              <input type="password"
                {...register("cPassword", )}
                className="w-80 p-1 m-1 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
              ></input>
              {errors.cPassword && (
                <p className="text-red-500 text-sm">{errors.cPassword.message}</p>
              )}
              {iscpassword && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
            </div>
            <div className="w-[48%] p-4 rounded-xl flex items-center justify-between gap-2">
              <label className=" text-lg mb-1">Phone No.</label>
              <input type="number" 
                {...register("Phone", )}
                onInput={(e)=>{
                  if(e.target.value.length>10)
                    e.target.value=e.target.value.slice(0,10);
                }}
                className="w-80 p-1 m-1 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
              ></input>
              {errors.Phone && (
                <p className="text-red-500 text-sm">{errors.Phone.message}</p>
              )}
            </div>
            <div className="w-[48%] p-4 rounded-xl flex items-center justify-between gap-2">
              <label className=" text-lg mb-1">Address</label>
              <textarea
                {...register("Address", )}
                className="w-80 p-1 m-1 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
              ></textarea>
              {errors.Address && (
                <p className="text-red-500 text-sm">{errors.Address.message}</p>
              )}
            </div>
            <div className="w-[48%] p-4 rounded-xl flex items-center justify-between gap-2">
              <label className=" text-lg mb-1">Course</label>
              <select
                {...register("Course", )}
                className="w-80 p-1 m-1 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
              >
             
                <option value="BSCIT">BSCIT</option>
                <option value="BBA">BBA</option>
                <option value="BCom">BCom</option>
              </select>
              {errors.Course && (
                <p className="text-red-500 text-sm">{errors.Course.message}</p>
              )}
            </div>
            <div className="w-[48%] p-4 rounded-xl flex items-center justify-between gap-2">
              <label className=" text-lg mb-1">Gender</label>
              <label>
  <input type="radio"
        value="male"
        
        {...register("gender")} /> Male
</label>
<label>
  <input type="radio" {...register("gender")}  value="female" /> Female
</label>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
            <div className="w-full p-4 rounded-xl flex justify-center">
              <button
                type="submit" disabled={!isDirty || !isValid }
                className={`px-6 py-2 bg-blue-600 text-white rounded-xl transition ${
            isDirty && isValid
              ? "bg-blue-600 hover:bg-blue-800 text-white"
              : "bg-gray-300 cursor-not-allowed"
          }`}
              >
                Submit
                
              </button>
            </div>
            {/* Live Form Info (just to show how formState changes) */}
        <div className="mt-4 text-sm text-gray-700">
          <p>🧩 isDirty: {isDirty ? "true" : "false"}</p> 
           {/* isDirty
true → The user has changed at least one field value
false → No field has been modified yet */}
          <p>✅ isValid: {isValid ? "true" : "false"}</p>
          {/* isValid
true → All inputs are valid (no validation errors)
false → There are validation errors present */}
          <p>⏳ isSubmitting: {isSubmitting ? "true" : "false"}</p>
        </div>
          </form>
        </div>
      </div>
    </>
  );
}
