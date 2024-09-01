import BlogCard from "@/components/BlogCard";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/post`,
          {
            withCredentials: true,
          },
        );

        console.log(res.data.posts);
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error.response);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-6 mt-5">
          {posts?.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
    </Layout>
  );
}
