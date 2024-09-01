import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import DropDownMenu from "./DropDownMenu";
import { Link } from "react-router-dom";
import ModeToggle from "./ToggleMode";

export default function Navbar() {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <header className="top-0 z-50 w-full bg-background">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <span
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <Link to={"/"} className="text-2xl">
            WriteUp
          </Link>
        </span>
        <nav className="hidden space-x-2 md:flex md:justify-center md:items-center">
          <ModeToggle />
          {!user ? (
            <Button
              className="h-8 rounded-full"
              onClick={() => navigate("/auth/login")}
            >
              Sign In
            </Button>
          ) : (
              <DropDownMenu user={user} />
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
              <Link
                className="text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                About
              </Link>
              <Link
                className="text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Blog
              </Link>
              <Link
                className="text-sm font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Contact
              </Link>
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
