import React from 'react';
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from '@/context/useAuth';

export default function Navbar() {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  // console.log(isAuthenticated, user);

  console.log(user);

  return (
    <header className="top-0 z-50 w-full bg-background">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <span
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <span className="text-lg">WriteUp</span>
        </span>
        <nav className="hidden space-x-4 md:flex md:justify-center md:items-center">
          <span
            className="text-sm font-medium transition-colors hover:text-primary"
            prefetch={false}
          >
            Home
          </span>
          <span
            className="text-sm font-medium transition-colors hover:text-primary"
            prefetch={false}
          >
            About
          </span>
          <span
            className="text-sm font-medium transition-colors hover:text-primary"
            prefetch={false}
          >
            Blog
          </span>
          {!isAuthenticated ? (
            <Button
              className="h-8 rounded-full"
              onClick={() => navigate("/auth/login")}
            >
              Sign In
            </Button>
          ) : (
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.user?.firstName?.split("")[0]}
              </AvatarFallback>
            </Avatar>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <div className="grid gap-4 p-4">
              <span
                className="text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Home
              </span>
              <span
                className="text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                About
              </span>
              <span
                className="text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Blog
              </span>
              <span
                className="text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Contact
              </span>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
