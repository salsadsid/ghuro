import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import type { Destination } from "@/types";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface WishlistItem extends Destination {
  dateAdded: string;
}

interface WishlistButtonProps {
  destination: Destination;
  onToggle?: () => void;
}

// Wishlist Toggle Button Component
export function WishlistButton({ destination, onToggle }: WishlistButtonProps) {
  const { isAuthenticated } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const wishlist = JSON.parse(localStorage.getItem("userWishlist") || "[]");
      setIsInWishlist(
        wishlist.some((item: WishlistItem) => item.id === destination.id)
      );
    }
  }, [destination.id, isAuthenticated]);

  const toggleWishlist = () => {
    if (!isAuthenticated) {
      alert("Please log in to save destinations to your wishlist");
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem("userWishlist") || "[]");

    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(
        (item: WishlistItem) => item.id !== destination.id
      );
      localStorage.setItem("userWishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      const wishlistItem: WishlistItem = {
        ...destination,
        dateAdded: new Date().toISOString(),
      };
      const updatedWishlist = [...wishlist, wishlistItem];
      localStorage.setItem("userWishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
    }

    onToggle?.();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleWishlist}
      className={`p-2 ${
        isInWishlist
          ? "text-yellow-500 hover:text-yellow-600"
          : "text-gray-400 hover:text-yellow-500"
      }`}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
    </Button>
  );
}

// Main Wishlist Page Component
export default function WishlistPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [sortBy, setSortBy] = useState<"dateAdded" | "price" | "rating">(
    "dateAdded"
  );

  useEffect(() => {
    if (isAuthenticated) {
      const savedWishlist = JSON.parse(
        localStorage.getItem("userWishlist") || "[]"
      );
      setWishlist(savedWishlist);
    }
  }, [isAuthenticated]);

  const removeFromWishlist = (destinationId: string) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== destinationId
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("userWishlist", JSON.stringify(updatedWishlist));
  };

  const sortedWishlist = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "rating":
        return b.rating - a.rating;
      case "dateAdded":
      default:
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">
          Sign in to view your wishlist
        </h2>
        <p className="text-gray-600 mb-6">
          Save your favorite destinations and plan your next adventure
        </p>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">My Wishlist</h1>
        <p className="text-xl text-gray-600">
          {wishlist.length} destination{wishlist.length !== 1 ? "s" : ""} saved
          for later
        </p>
      </motion.div>

      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring destinations and save your favorites for later!
            </p>
            <Button onClick={() => navigate("/")}>Explore Destinations</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Sort Options */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Saved Destinations</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="dateAdded">Date Added</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWishlist.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-48 w-full object-cover rounded-t-lg cursor-pointer"
                        onClick={() =>
                          navigate(`/destination/${destination.id}`)
                        }
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWishlist(destination.id)}
                          className="p-1 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3
                          className="text-lg font-semibold cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            navigate(`/destination/${destination.id}`)
                          }
                        >
                          {destination.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">
                            {destination.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm">
                        {destination.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>
                            Added{" "}
                            {new Date(
                              destination.dateAdded
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="font-bold text-lg">
                          ${destination.price}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          className="flex-1"
                          onClick={() =>
                            navigate(`/destination/${destination.id}`)
                          }
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => removeFromWishlist(destination.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex space-x-4">
                <Button onClick={() => navigate("/")}>
                  Explore More Destinations
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Calculate total price of all wishlist items
                    const total = wishlist.reduce(
                      (sum, item) => sum + item.price,
                      0
                    );
                    alert(
                      `Total cost for all wishlist items: $${total.toLocaleString()}`
                    );
                  }}
                >
                  Calculate Total Cost
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
