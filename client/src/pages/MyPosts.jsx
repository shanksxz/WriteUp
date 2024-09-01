import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/useAuth";
import axios from "axios";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function MyPosts() {
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log(user);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/posts`,
          {
            withCredentials: true,
          },
        );

        console.log(res.data.posts)
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error.response);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Blog Posts</h1>
          <div className="flex justify-between items-center">
            <Input
              className="max-w-sm"
              placeholder="Search blog posts..."
              type="search"
            />
            <Button onClick={() => navigate("/create/post")}>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </div>
        </header>
        <main>
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    Published on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                 <p className="text-gray-700">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Link to={`/post/${post._id}`} passHref>
                    <Button variant="link">Read More</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
