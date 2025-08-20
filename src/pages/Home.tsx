import { getDestinations } from "@/api/destination";
import BookingDialog from "@/components/BookingDialog";
import BookingFormDialog from "@/components/BookingFormDialog";
import Footer from "@/components/Footer";
import HomeExtraSection from "@/components/HomeExtraSection";
import SearchBox from "@/components/SearchBox";
import { WishlistButton } from "@/components/Wishlist";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import type { Destination } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [storedBooking, setStoredBooking] = useState<any>(null);

  // On mount, check for stored booking data if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const bookingData = localStorage.getItem("bookingData");
      const pendingBookingData = localStorage.getItem("pendingBookingData");

      if (bookingData) {
        setStoredBooking(JSON.parse(bookingData));
        localStorage.removeItem("bookingData");
      }

      // If there's pending booking data, open the booking dialog with pre-filled data
      if (pendingBookingData) {
        const parsedData = JSON.parse(pendingBookingData);
        setSelectedDestination(parsedData.destination);
        setIsDialogOpen(true);
      }
    }
  }, [isAuthenticated]);

  const { data: destinations = [] } = useQuery({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookNow = (destination: Destination) => {
    setSelectedDestination(destination);
    if (isAuthenticated) {
      setIsDialogOpen(true);
    } else {
      setIsFormDialogOpen(true);
    }
  };

  return (
    <>
      {/* Success Banner - Container */}
      {storedBooking && (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-green-800 text-lg text-center">
              🎉 Great choice!{" "}
              <span className="font-semibold">
                {storedBooking.destination.name}
              </span>{" "}
              has been booked.
            </p>
          </div>
        </div>
      )}

      {/* Hero Section - Full Screen */}
      <section className="relative h-[100vh] w-full bg-gray-900">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold"
          >
            Discover Your Next Adventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl"
          >
            Find the perfect destination for your dream vacation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-4xl px-4 relative z-50"
          >
            <SearchBox onSearch={setSearchTerm} />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30 overflow-hidden" />
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2565&auto=format&fit=crop"
          alt="Travel"
          className="h-full w-full object-cover"
        />
      </section>

      {/* Destinations Grid - Container */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked destinations that offer unforgettable
              experiences
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="h-full py-0">
                  <CardContent className="!p-0 relative">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="h-64 w-full rounded-t-lg object-cover cursor-pointer"
                      onClick={() => navigate(`/destination/${destination.id}`)}
                    />
                    <div className="absolute top-2 right-2">
                      <WishlistButton destination={destination} />
                    </div>
                    <div className="p-6">
                      <h3
                        className="text-2xl font-semibold cursor-pointer hover:text-yellow-600 mb-3"
                        onClick={() =>
                          navigate(`/destination/${destination.id}`)
                        }
                      >
                        {destination.name}
                      </h3>
                      <p className="mt-2 text-base text-gray-600 mb-6">
                        {destination.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-xl">
                          ${destination.price}
                        </span>
                        <Button
                          onClick={() => handleBookNow(destination)}
                          className="h-12 px-6 text-base"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections - Full Screen */}
      <HomeExtraSection />

      {/* Footer - Full Screen */}
      <Footer />

      {/* Booking Dialogs */}
      {selectedDestination && (
        <>
          <BookingDialog
            destination={selectedDestination}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
          <BookingFormDialog
            destination={selectedDestination}
            open={isFormDialogOpen}
            onOpenChange={setIsFormDialogOpen}
          />
        </>
      )}
    </>
  );
}
