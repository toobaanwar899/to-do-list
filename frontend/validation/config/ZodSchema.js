import { z } from "zod";

export const UserSignInSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),

});

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password is required"),
});

export const AddSchema = z.object({
  title: z.string().min(1, "Enter Task to Edit"),
  description: z.string().min(8, "Enter Task Description"),
  dueDate: z.string().min(8, "Enter due date"),
});

export const EditSchema = z.object({
  title: z.string().min(1, "Enter Task to Edit"),
  description: z.string().min(8, "Enter Task Description"),
  dueDate: z.string().min(8, "Enter due date"),
});
