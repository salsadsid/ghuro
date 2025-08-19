import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: any;
}) {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 max-w-7xl">
        <Link to="/" className="text-2xl font-bold">
          TravelApp
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/" className="text-lg font-medium hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-lg font-medium hover:underline">
            About
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout} className="text-base">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="h-12 px-6 text-base">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
