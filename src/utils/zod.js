import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().trim().min(3, "name must be at least 3 characters").max(16, "name must be 16 characters maximum"),
    email: z.string().trim().email("Please enter a valid email").min(3, "email must be at least 3 characters"),
    password: z.string().trim().min(4, "password must be at least 4 characters").max(16, "password must be 16 characters maximum"),
});

export const signinSchema = z.object({
    email: z.string().trim().email("Please enter a valid email").min(3, "email must be at least 3 characters"),
    password: z.string().trim().min(4, "password must be at least 4 characters").max(16, "password must be 16 characters maximum"),
});

export const productSchema = z.object({
    name: z.string().trim().min(3, "product name must be at least 3 characters").max(60, "product name must be 60 characters maximum"),
    price: z.number({ required_error: "please enter the price", }).positive("the price must be greater than 0"),
    quantity: z.string().min(2, "quantity must be at least 2 characters").max(20, "quantity must be 20 characters maximum"),
    description: z.string().trim().min(3, "description must be at least 3 characters"),
    category: z.string().trim().min(3, "Please Select the category"),
});

export const commentSchema = z.object({
    message: z.string().trim().min(3, "your comment must have at least 3 characters"),
    name: z.string().trim().min(3, "name must be at least 3 characters").max(16, "name must be 16 characters maximum"),
    score: z.number().gte(0, "the score must be between 0 and 5").lte(5, "the score must be between 0 and 5"),

});

export const categoryTitleSchema = z.string().trim().min(3, "category title must be at least 3 characters").max(50, "category title must be 50 characters maximum");

export const contactUsSchema = z.object({
    name: z.string().trim().min(3, "name must be at least 3 characters").max(16, "name must be 16 characters maximum"),
    email: z.string().trim().email("Please enter a valid email").min(3, "email must be at least 3 characters"),
    number: z.string().trim().min(3, "Please enter a valid Phone Number").max(20, "Please enter a valid Phone Number"),
    message: z.string().trim().min(3, "message must be at least 3 characters")
});

export const updateUserSchema = z.object({
    name: z.string().trim().min(3, "name must be at least 3 characters").max(16, "name must be 16 characters maximum"),
    email: z.string().trim().email("Please enter a valid email").min(3, "email must be at least 3 characters"),
});
export const changePasswordSchema = z.object({
    currentPassword: z.string().trim().min(4, "the Current Password is incorrect").max(16, "the Current Password is incorrect"),
    newPassword: z.string().trim().min(4, "the new password must be at least 4 characters").max(16, "the new password must be 16 characters maximum"),
});

export const departmentSchema = z.string().trim().min(3, "department name must be at least 3 characters").max(35, "department name must be 35 characters maximum");

export const ticketSchema = z.object({
    title: z.string().trim().min(3, "ticket title must be at least 3 characters").max(400, "ticket title must be 400 characters maximum"),
    body: z.string().trim().min(3, "ticket message must be at least 3 characters")
});

export const emailSchema = z.string().trim().email("Please enter a valid email").min(3, "email must be at least 3 characters");

export const ticketAnswerSchema = z.string().trim().min(2, "your answer must be at least 2 characters");

export const discountSchema = z.object({
    code: z.string().trim().min(3, "discount code must be at least 3 characters").max(20, "discount code must be 20 characters maximum"),
    percent: z.number().gte(1, "the discount percentage should be more than 1").lte(100, "maximum discount percentage should be 100"),
    maxUse: z.number().gte(1, "the discount max use should be more than 1"),
});

export const discountCodeSchema = z.string().trim().min(3, "discount code must be at least 3 characters").max(20, "discount code must be 20 characters maximum")

export const searchParamSchema = z.string().trim().min(3,"search query must be at least 3 characters")