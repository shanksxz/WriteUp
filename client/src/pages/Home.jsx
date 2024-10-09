import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import BlogCard from "@/components/BlogCard";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/post`, {
        params: { page, limit: 5 },
        withCredentials: true,
      });
      setPosts(res.data.posts);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      toast.success("Posts fetched successfully");
    } catch (error) {
      console.error("Error fetching posts:", error.response);
      setError("Failed to fetch posts. Please try again later.");
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    fetchPosts(1);
  }, [isAuthenticated, navigate]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchPosts(newPage);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Layout>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center my-4">{error}</div>
      )}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-6 mt-5 mb-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
          <div className="flex justify-center items-center space-x-4 mt-8 mb-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
}