import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { useAuth } from "./store/useAuthStore";

export default function App() {

  // const {
  //   isAuthenticated: isAuth,
  // } = useAuth();
  //
  // if(!isAuth) {
  //   return (
  //     <h1>Not authenticated</h1>
  //   );
  // }
  
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated) {
    return (
      <h1>Not authenticated</h1>
    );
  }
  
  return (
    <div className="mx-auto max-w-4xl">
      <Navbar />
      <Toaster />
    </div>
  );
}
