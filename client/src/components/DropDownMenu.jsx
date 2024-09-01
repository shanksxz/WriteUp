import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DropDownMenu({ user }) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user?.firstName?.split("")[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-sm"
        side="bottom"
        align="end"
        sideOffset={20}
      >
        <DropdownMenuItem onClick={() => navigate("/user/post")}>
          My Posts
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/")}>
          Explore
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/create/post")}>
          Create Post
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("DO SHIT")}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
