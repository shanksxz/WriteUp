import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

export default function PostId() {
  const { id } = useParams(); // Extract the post ID from the URL
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/post/${id}`,
          {
            withCredentials: true,
          },
        );
        console.log(response.data.post);
        setPost(response.data.post);
        // setLikes(response.data.post.likes); // Set initial likes from the fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleLike = () => {
    // if (liked) {
    //   setLikes(likes - 1);
    //   setLiked(false);
    // } else {
    //   setLikes(likes + 1);
    //   setLiked(true);
    // }
  };

  const handleComment = () => {
    // Here you would typically send the comment to your backend
    console.log("New comment:", commentText);
    // setCommentText("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <Link
          to="/user/post"
          className="inline-flex items-center text-blue-600 hover:underline mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
        </Link>
        {post && (
          <article className="prose lg:prose-xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <Avatar>
                <AvatarFallback className="text-lg font-semibold">
                  {post.author.username[0]}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.author.username}</span>
              <span>•</span>
              <time dateTime={new Date(post.createdAt).toLocaleString()} className="text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose lg:prose-lg text-gray-800"
            />
          </article>
        )}
      </div>
    </Layout>
  );
}

//   <div className="max-w-3xl mx-auto mt-8">
//     <Card>
//       <CardHeader>
//         <CardTitle>Engagement</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Button
//           variant={liked ? "default" : "outline"}
//           onClick={handleLike}
//         >
//           <Heart
//             className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`}
//           />
//           {likes} {likes === 1 ? "Like" : "Likes"}
//         </Button>
//       </CardContent>
//     </Card>
//   </div>
// </div>
// <Card className="mt-4">
//   <CardHeader>
//     <CardTitle>Comments</CardTitle>
//   </CardHeader>
//   <CardContent>
//     {post.comments.map((comment) => (
//       <div key={comment.id} className="mb-4">
//         <p className="font-semibold">{comment.author}</p>
//         <p>{comment.content}</p>
//       </div>
//     ))}
//   </CardContent>
//   <CardFooter className="flex flex-col items-start">
//     <Textarea
//       placeholder="Write a comment..."
//       value={commentText}
//       onChange={(e) => setCommentText(e.target.value)}
//       className="w-full mb-2"
//     />
//     <Button onClick={handleComment}>
//       <MessageCircle className="mr-2 h-4 w-4" />
//       Post Comment
//     </Button>
//   </CardFooter>
// </Card>
