import z from "zod";

export const PasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(32, { message: "Password must not exceed 32 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });

  export const SignUpSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(20, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(20, "Last name too long"),
  email: z.string().email("Please enter a valid email address"),
  password: PasswordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // This attaches error to confirmPassword field
});


export interface ActionResponse<T = string> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const BasicInfoFormSchema = z.object({
  firstName: z.string().min(1,{ error: "Please Enter Your First Name" }),
  lastName: z.string().min(1,{ error: "Please Enter Your Last Name" }),
  phoneNumber: z.string().optional(),
  dateBirth: z.date({ error: "Please Enter your Birthday" }),
  genderOption: z.string().min(1, { message: "Please Select your Gender"}),
  preferredLang: z.string().min(1, "Please Enter your Preferred Language"),
  countryRegion: z.string().min(1, "Please Select your Country or Region"),
  
});
export const SignInSchema = z.object({
  email: z.string().email("Please Enter A Valid Email Address"),
  password: z.string().min(8, { message: "Incoorrect Email or Password"})
  .max(32, { message: "Incoorrect email or password" })
  .regex(/[A-Z]/, { message: "Incoorrect Email or Password" })
  .regex(/[a-z]/, { message: "Incoorrect Email or Password" })
  .regex(/[0-9]/, { message: "Incoorrect Email or Password" })
  .regex(/[^A-Za-z0-9]/, { message: "Incoorrect Email or Password" }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const ResetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const BugReportFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(50, "Title must be at most 50 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be at most 500 characters."),
});
