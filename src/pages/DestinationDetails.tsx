import { getDestinationById } from "@/api/destination";
import BookingDialog from "@/components/BookingDialog";
import BookingFormDialog from "@/components/BookingFormDialog";
import { WishlistButton } from "@/components/Wishlist";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bed,
  Calendar,
  Camera,
  Car,
  Clock,
  Download,
  MapPin,
  Play,
  Share2,
  Star,
  Users,
  Utensils,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DestinationDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const { data: destination } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestinationById(id!),
  });

  const handleBookNow = () => {
    if (isAuthenticated) {
      setIsDialogOpen(true);
    } else {
      setIsFormDialogOpen(true);
    }
  };

  // Get YouTube video ID based on destination
  const getYouTubeVideoId = (destinationName: string) => {
    const videoMap: { [key: string]: string } = {
      "Cox's Bazar": "1nM-kKDJ-4o", // Example YouTube video ID
      Sundarbans: "Nc99FJi5q1Q",
      Sylhet: "dQw4w9WgXcQ",
      Bandarban: "li19jWVzUPU",
      "Saint Martin's Island": "U7JzEl2AGb0",
      Rangamati: "ABHQnTANmBE",
      Bali: "BFS9n4B_2xA",
      Paris: "AQ6GmpMu5L8",
      Tokyo: "cS-hFKC_RKI",
      "New York": "flqL0IZOZvY",
      Rome: "XBbzOKhG1bQ",
      Sydney: "HRg1gJi6yqc",
    };

    // Find video by checking if destination name contains key
    for (const [key, videoId] of Object.entries(videoMap)) {
      if (destinationName.toLowerCase().includes(key.toLowerCase())) {
        return videoId;
      }
    }

    // Default video if no match found
    return "dQw4w9WgXcQ";
  };

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Car, label: "Transportation" },
    { icon: Utensils, label: "Meals Included" },
    { icon: Bed, label: "Accommodation" },
    { icon: Camera, label: "Photo Tours" },
    { icon: Users, label: "Group Activities" },
  ];

  const highlights = [
    "Professional tour guide included",
    "All entrance fees covered",
    "Traditional cultural experiences",
    "Photography opportunities",
    "Local cuisine tasting",
    "Comfortable transportation",
  ];

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="text-gray-600">Loading destination details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <WishlistButton destination={destination} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Single Image */}
          <div className="lg:col-span-2" onClick={() => setIsVideoOpen(true)}>
            <div className="relative">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-[400px] object-cover rounded-xl cursor-pointer shadow-lg"
              />
              <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Play className="h-12 w-12 text-white fill-current" />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {destination.rating} ★
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <Play className="h-4 w-4" />
                Watch Video
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    ${destination.price}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>Available all year round</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>3-5 days recommended</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="h-5 w-5" />
                    <span>Suitable for all ages</span>
                  </div>
                </div>

                <Button
                  onClick={handleBookNow}
                  className="w-full h-12 text-lg font-semibold"
                  size="lg"
                >
                  Book This Experience
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Free cancellation up to 24 hours before
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-yellow-500" />
                    <h1 className="text-3xl font-bold">{destination.name}</h1>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(destination.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-medium">
                        {destination.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-600">Based on 147 reviews</span>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">
                      What makes this special?
                    </h3>
                    <p className="text-yellow-700">
                      Experience authentic local culture, breathtaking
                      landscapes, and unforgettable memories in one of the
                      world's most beautiful destinations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Amenities & Services
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <amenity.icon className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-700 text-sm">
                          {amenity.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Quick Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">3-5 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group Size</span>
                      <span className="font-medium">2-15 People</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Languages</span>
                      <span className="font-medium">English, Local</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age Range</span>
                      <span className="font-medium">All Ages</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Brochure */}
              <Card>
                <CardContent className="p-6 text-center">
                  <Download className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Download Brochure</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get detailed information about this destination
                  </p>
                  <Button variant="outline" className="w-full">
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Dialogs */}
      {destination && (
        <>
          <BookingDialog
            destination={destination}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
          <BookingFormDialog
            destination={destination}
            open={isFormDialogOpen}
            onOpenChange={setIsFormDialogOpen}
          />
        </>
      )}

      {/* YouTube Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-7xl w-[90vw] p-0">
          <div className="relative bg-black rounded-lg overflow-hidden w-full">
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  destination?.name || ""
                )}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg w-full h-full"
              ></iframe>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
