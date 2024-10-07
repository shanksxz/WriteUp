import BlogCard from "@/components/BlogCard";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/useAuth";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/post`, {
          withCredentials: true,
        });

        console.log(res.data.posts);
        setPosts(res.data.posts);
        toast.success("Posts fetched successfully");
      } catch (error) {
        console.error("Error fetching posts:", error.response);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-6 mt-5 mb-3">
        {posts?.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </Layout>
  );
}
