import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Heart, User } from "lucide-react";
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
      <div className="container max-w-8xl mx-auto flex h-20 items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-600 hover:text-yellow-700 transition-colors"
        >
          ⛱ Ghuro
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className="text-lg font-medium hover:text-yellow-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg font-medium hover:text-yellow-600 transition-colors"
          >
            About
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Wishlist Button */}
              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-yellow-50 hover:text-yellow-600"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              {/* Notifications Button */}
              <Link to="/notifications">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 relative hover:bg-yellow-50 hover:text-yellow-600"
                >
                  <Bell className="h-5 w-5" />
                  {/* Notification badge */}
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-transparent hover:ring-yellow-300 transition-all">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-yellow-100 text-yellow-700">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 hover:bg-yellow-50"
                    >
                      <User className="h-4 w-4 text-yellow-600" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/wishlist"
                      className="flex items-center space-x-2 hover:bg-yellow-50"
                    >
                      <Heart className="h-4 w-4 text-yellow-600" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/notifications"
                      className="flex items-center space-x-2 hover:bg-yellow-50"
                    >
                      <Bell className="h-4 w-4 text-yellow-600" />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-base hover:bg-red-50 hover:text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/auth">
              <Button
                variant="outline"
                className="h-12 px-6 text-base border-yellow-300 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-400"
              >
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
