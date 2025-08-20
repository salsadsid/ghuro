import { getDestinations } from "@/api/destination";
import BookingDialog from "@/components/BookingDialog";
import BookingFormDialog from "@/components/BookingFormDialog";
import SearchBox from "@/components/SearchBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import type { Destination } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Award, Globe, MapPin, Shield, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistButton } from "../components/Wishlist";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [storedBooking, setStoredBooking] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "bangladesh" | "international">(
    "all"
  );

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

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isBangladesh = dest.name.includes("Bangladesh");

    if (filter === "bangladesh") return matchesSearch && isBangladesh;
    if (filter === "international") return matchesSearch && !isBangladesh;
    return matchesSearch;
  });

  const handleBookNow = (destination: Destination) => {
    setSelectedDestination(destination);
    if (isAuthenticated) {
      setIsDialogOpen(true);
    } else {
      setIsFormDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      {storedBooking && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-6xl mb-8 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 border border-green-200 shadow-elegant"
        >
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-green-500 p-2">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-800">
                Booking Confirmed!
              </h2>
              <p className="text-green-700">
                Your trip to{" "}
                <span className="font-semibold">
                  {storedBooking.destination.name}
                </span>{" "}
                has been successfully booked.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format&fit=crop"
            alt="Beautiful landscape"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Discover{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Bangladesh
              </span>{" "}
              <br />& Beyond
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Experience the hidden gems of Bangladesh and explore breathtaking
              destinations around the world. Your next adventure awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-md"
              >
                <SearchBox onSearch={setSearchTerm} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:shadow-elegant-lg transition-all duration-300 text-lg px-8 py-3"
                  onClick={() =>
                    document
                      .getElementById("destinations")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <ArrowRight className="h-6 w-6 text-white rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose <span className="text-primary">Ghuro</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide exceptional travel experiences with local expertise and
              global standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Local Expertise",
                description:
                  "Discover hidden gems in Bangladesh with our local guides and authentic experiences",
              },
              {
                icon: Award,
                title: "Best Value",
                description:
                  "Get the most from your journey with our competitive prices and premium services",
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description:
                  "Travel with confidence knowing your safety and security are our top priorities",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Explore Amazing Destinations
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              From the serene beaches of Cox's Bazar to the romantic streets of
              Paris
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { key: "all", label: "All Destinations" },
                { key: "bangladesh", label: "Bangladesh" },
                { key: "international", label: "International" },
              ].map((filterOption) => (
                <Button
                  key={filterOption.key}
                  variant={filter === filterOption.key ? "default" : "outline"}
                  onClick={() => setFilter(filterOption.key as any)}
                  className="transition-all duration-300"
                >
                  {filterOption.label}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-all duration-300 border-0">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-64 w-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-300"
                        onClick={() =>
                          navigate(`/destination/${destination.id}`)
                        }
                      />
                      <div className="absolute top-4 right-4">
                        <WishlistButton destination={destination} />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium text-sm">
                            {destination.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3
                          className="text-xl font-semibold text-foreground cursor-pointer hover:text-primary transition-colors duration-200 group-hover:text-primary"
                          onClick={() =>
                            navigate(`/destination/${destination.id}`)
                          }
                        >
                          {destination.name}
                        </h3>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {destination.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-primary">
                            ${destination.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per person
                          </div>
                        </div>
                        <Button
                          onClick={() => handleBookNow(destination)}
                          className="bg-gradient-primary hover:shadow-lg transition-all duration-300"
                          size="lg"
                        >
                          Book Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No destinations found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

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
    </div>
  );
}
