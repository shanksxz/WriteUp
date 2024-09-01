import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { useAuth } from "./context/useAuth";

export default function App() {

  const { user } = useAuth();

  if(!user) {
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
