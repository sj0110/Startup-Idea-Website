import { z } from "zod";

export const formSchema = z.object({
	title: z.string().min(3, "Title is required").max(100, "Title must be less than 100 characters"),
    description: z.string().min(10, "Description is required").max(1000, "Description must be less than 1000 characters"),
    category: z.string().min(3, "Category is required").max(50, "Category must be less than 50 characters"),
    link: z.string().min(3, "Image URL is required").url("Invalid URL format").refine(async (url) => {
      try{
        const res = await fetch(url, { method: 'HEAD' });
        const contentType = res.headers.get('content-type');
        return contentType?.startsWith('image/') ? true : false;
      }
      catch {
        return false;
    }}),
    pitch: z.string().min(10, "Pitch is required").max(10000, "Pitch must be less than 10000 characters"),
})