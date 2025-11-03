import { z } from "zod";

const schema = z.object({
  fullname: z
    .string()
    .min(1, { message:"Full name is required" })
    .max(50, { message: "Full name must be less than 50 characters" }).refine((vale)=>/^[A-Za-z\s]+$/.test(vale),{message:"Name cannot contain numbers or special characters"}),

  Email: z.email({ message: "Invalid email format" }).min(1,{message:"Email is required"}),
 Password:z.string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, { message: "Password must contain one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain one lowercase letter" })
      .regex(/\d/, { message: "Password must contain one number" })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain one special character (@$!%*?&)",
      }),
 cPassword:z.string({ required_error: "Comfirm Password is required" })
 .min(1,{message:"Comfirm password is required"}),
  Phone: z
    .string({ required_error: "Phone number is required" })
    .min(1, { message: "Phone Number is required" })
    .max(10, { message: "Phone number must be 10 digits" })
    .regex(/^\d{10}$/, { message: "Phone number must contain only digits" }),

  Address: z
    .string({ required_error: "Address is required" })
    .min(3, { message: "Address is required" }),

  Course: z.enum(["BSCIT", "BBA", "BCom"], {
    required_error: "Course is required",
  }),

  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
  }),
}).superRefine((data,ctx)=>{if(data.Password!==data.cPassword){
ctx.addIssue({
    path:["cPassword"],
    message:"Passwords do not match"
})
}})

export default schema;
