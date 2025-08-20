import { getDestinationById } from "@/api/destination";
import BookingDialog from "@/components/BookingDialog";
import BookingFormDialog from "@/components/BookingFormDialog";
import { WishlistButton } from "@/components/Wishlist";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  MapPin,
  Play,
  Share2,
  Star,
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const mockImages = [
    destination?.image || "",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563822249366-cc4a8357d4b9?q=80&w=2673&auto=format&fit=crop",
  ];

  // Mock video URLs for different destinations
  const getVideoUrl = (destinationName: string) => {
    const videoMap: { [key: string]: string } = {
      "Cox's Bazar": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "Sundarbans": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "Sylhet": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "Bandarban": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    };

    for (const [key, url] of Object.entries(videoMap)) {
      if (destinationName.toLowerCase().includes(key.toLowerCase())) {
        return url;
      }
    }

    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  };

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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={mockImages[selectedImageIndex]}
                alt={destination.name}
                className="w-full h-[400px] object-cover rounded-xl cursor-pointer shadow-lg"
                onClick={() => {
                  console.log("Image clicked! Opening video modal...");
                  setIsVideoOpen(true);
                }}
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
                <Camera className="h-4 w-4" />
                Watch Video
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {mockImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`View ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
                    selectedImageIndex === index
                      ? "ring-2 ring-yellow-500"
                      : "hover:ring-2 hover:ring-yellow-300"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
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

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {destination.description}
              </p>
            </div>

            {/* Booking Card */}
            <Card className="shadow-lg">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    ${destination.price}
                  </div>
                  <div className="text-gray-600">per person</div>
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
      </div>

      {/* Simple Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" 
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold z-10"
            >
              ✕ Close
            </button>
            <div className="bg-black rounded-lg overflow-hidden relative">
              <video
                controls
                autoPlay
                className="w-full h-[500px] object-cover"
                poster={mockImages[selectedImageIndex]}
              >
                <source
                  src={getVideoUrl(destination?.name || "")}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">{destination?.name}</h3>
                  <p className="text-gray-200">Experience this amazing destination</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}
