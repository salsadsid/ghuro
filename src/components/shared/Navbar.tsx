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
import { Bell, Heart, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: any;
}) {
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-8xl mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-yellow-600 hover:text-yellow-700 transition-colors"
          onClick={closeMobileMenu}
        >
          ⛱ Ghuro
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Mobile Menu Button and Quick Actions */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && (
            <>
              {/* Mobile Wishlist */}
              <Link to="/wishlist" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-yellow-50 hover:text-yellow-600"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              {/* Mobile Notifications */}
              <Link to="/notifications" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 relative hover:bg-yellow-50 hover:text-yellow-600"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>

              {/* Mobile Avatar */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-yellow-300 transition-all">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-yellow-100 text-yellow-700 text-sm">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 hover:bg-yellow-50"
                      onClick={closeMobileMenu}
                    >
                      <User className="h-4 w-4 text-yellow-600" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/wishlist"
                      className="flex items-center space-x-2 hover:bg-yellow-50"
                      onClick={closeMobileMenu}
                    >
                      <Heart className="h-4 w-4 text-yellow-600" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/notifications"
                      className="flex items-center space-x-2 hover:bg-yellow-50"
                      onClick={closeMobileMenu}
                    >
                      <Bell className="h-4 w-4 text-yellow-600" />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="text-base hover:bg-red-50 hover:text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-yellow-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block text-lg font-medium hover:text-yellow-600 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-lg font-medium hover:text-yellow-600 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              About
            </Link>

            {!isAuthenticated && (
              <div className="pt-4">
                <Link to="/auth" onClick={closeMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base border-yellow-300 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-400"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
