import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  category: z.string().min(1, "Category is required"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required")
    .transform((files) => files[0])
    .refine((file) => file.size <= 5000000, "File size should be less than 5MB")
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export default function Posts() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [watchImage]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("image", data.image);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/post/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      console.log(res);
    } catch (error) {
      console.error("Error during post creation:", error.response.data);
    }
  };

  return (
    <Layout>
      <div className="px-4 md:px-6 max-w-2xl mt-2">
        <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter post title"
            />
            {errors.title}
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="Write your blog post content here"
              className="h-40"
            />
            {errors.content}
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category}
          </div>
          <div>
            <Label htmlFor="image">Cover Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image")}
            />
            {errors.image}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 max-w-full h-auto"
              />
            )}
          </div>
          <Button type="submit" className="w-full">
            Publish Post
          </Button>
        </form>
      </div>
    </Layout>
  );
}
