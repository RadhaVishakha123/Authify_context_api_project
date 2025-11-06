import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StudentdataSchema from "../ZodSchema/StudentdataSchema";
import { useEffect, useState } from "react";
import { email, json, nanoid } from "zod";
import useAuth from "../context/AuthContext";
export default function UserPersonlDetails() {
  const {CurrentUser,AddUpadteProfile,FetchExitProfile,closeProfile}=useAuth()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting, touchedFields },
    reset,
    setValue,
    watch,
  } = useForm({ mode: "onTouched", resolver: zodResolver(StudentdataSchema) }); //mode: "onTouched" → runs validation when user touches (focus + blur) a field.
  // Other modes:
  // "onChange" → validate as user types.
  // "onBlur" → validate when user leaves input.
  // "onSubmit" (default) → validate only on form submit.
  const form = useForm();
  console.log("UserForm:", form);
useEffect(()=>{
  const profiledata=FetchExitProfile()
  reset(profiledata)
},[reset])
  function SubmitForm(Data) {
    // console.log("User data:", Data);
    // const StudentData = JSON.parse(localStorage.getItem("StudentData")) || [];
    // StudentData.push(Data);
    // localStorage.setItem("StudentData", JSON.stringify(StudentData));

    // alert("data submit succesfuly");
    const Userdata={id:CurrentUser.id,...Data}
    AddUpadteProfile(Userdata);
    closeProfile();
    reset();
  }
  // let password = watch("Password");
  // let cpassword = watch("cPassword");
  // useEffect(() => {
  //   if (password && cpassword) {
  //     if (password == cpassword) {
  //       setcpasword(false);
  //     } else {
  //       setcpasword(true);
  //     }
  //   }
  // }, [password, cpassword]);

  return (
    <>
    
      <div className="w-full max-w-2xl  p-6 ">
        <h2 className="text-center text-2xl font-bold mb-6">
          User Information Form
        </h2>

        <form
          onSubmit={handleSubmit(SubmitForm)}
          className="flex flex-col gap-4"
        >
          {/* Each field */}
          {[
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "Email", name: "Email", type: "email" },
            { label: "Phone No.", name: "Phone", type: "number" },
            { label: "Address", name: "Address", type: "textarea" },
          ].map((field) => (
            <div
              key={field.name}
              className="flex flex-col sm:flex-row sm:items-start sm:gap-6"
            >
              {/* Label */}
              <label className="w-40 text-lg font-medium shrink-0 pt-2">
                {field.label}
              </label>

              {/* Input + error */}
              <div className="flex flex-col flex-1">
                {field.type === "textarea" ? (
                  <textarea
                    {...register(field.name)}
                    className="w-full p-2 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    {...register(field.name)}
                    onInput={
                      field.name === "Phone"
                        ? (e) => {
                            if (e.target.value.length > 10)
                              e.target.value = e.target.value.slice(0, 10);
                          }
                        : undefined
                    }
                    readOnly={field.name=="Email"}
                    className="w-full p-2 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
                  />
                )}
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name].message}
                  </p>
                )}
                {/* {field.name === "cPassword" && iscpassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )} */}
              </div>
            </div>
          ))}

          {/* Course */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
            <label className="w-40 text-lg font-medium shrink-0 pt-2">
              Course
            </label>
            <div className="flex flex-col flex-1">
              <select
                {...register("Course")}
                className="w-full p-2 rounded-xl border-2 bg-blue-100 border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 outline-none"
              >
                <option value="">Select Course</option>
                <option value="BSCIT">BSCIT</option>
                <option value="BBA">BBA</option>
                <option value="BCom">BCom</option>
              </select>
              {errors.Course && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Course.message}
                </p>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
            <label className="w-40 text-lg font-medium shrink-0 pt-2">
              Gender
            </label>
            <div className="flex flex-col flex-1">
              <div className="flex gap-6">
                <label>
                  <input type="radio" value="male" {...register("gender")} />{" "}
                  Male
                </label>
                <label>
                  <input type="radio" value="female" {...register("gender")} />{" "}
                  Female
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={!isDirty || !isValid}
              className={`px-8 py-2 rounded-xl text-white font-semibold transition ${
                isDirty && isValid
                  ? "bg-blue-600 hover:bg-blue-800"
                  : "bg-gray-300 cursor-not-allowed text-gray-600"
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
              {/* <p>⏳ isSubmitting: {isSubmitting ? "true" : "false"}</p> */}
            </div>
          </form>
        </div>
      
    </>
  );
}
