import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, MapPin, Star, User } from "lucide-react";
import { useEffect, useState } from "react";

interface BookingHistoryItem {
  id: string;
  destination: {
    name: string;
    image: string;
    location: string;
  };
  date: string;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
  bookingDate: string;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const [bookingHistory, setBookingHistory] = useState<BookingHistoryItem[]>(
    []
  );
  const [totalSpent, setTotalSpent] = useState(0);
  const [upcomingTrips, setUpcomingTrips] = useState(0);

  useEffect(() => {
    // Load booking history from localStorage or API
    const savedBookings = localStorage.getItem("userBookingHistory");
    if (savedBookings) {
      const bookings = JSON.parse(savedBookings);
      setBookingHistory(bookings);

      const total = bookings.reduce(
        (sum: number, booking: BookingHistoryItem) =>
          sum + (booking.status !== "cancelled" ? booking.price : 0),
        0
      );
      setTotalSpent(total);

      const upcoming = bookings.filter(
        (booking: BookingHistoryItem) =>
          booking.status === "upcoming" && new Date(booking.date) > new Date()
      ).length;
      setUpcomingTrips(upcoming);
    }
  }, []);

  const stats = [
    {
      title: "Total Trips",
      value: bookingHistory.length,
      icon: <MapPin className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Upcoming Trips",
      value: upcomingTrips,
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Total Spent",
      value: `$${totalSpent.toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Member Since",
      value: "2024",
      icon: <Star className="h-6 w-6" />,
      color: "bg-orange-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8 container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-4">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              Welcome back, {user?.name || "Traveler"}!
            </h1>
            <p className="text-xl text-gray-600">
              Ready for your next adventure?
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Booking History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center space-x-2">
            <Clock className="h-6 w-6" />
            <span>Booking History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookingHistory.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No bookings yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start planning your first adventure!
              </p>
              <Button>Explore Destinations</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookingHistory.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <img
                    src={booking.destination.image}
                    alt={booking.destination.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">
                      {booking.destination.name}
                    </h4>
                    <p className="text-gray-600">
                      {booking.destination.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      Booked on{" "}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${booking.price}</p>
                    <p className="text-gray-600">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col space-y-2">
              <MapPin className="h-6 w-6" />
              <span>Explore Destinations</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <User className="h-6 w-6" />
              <span>Update Profile</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Star className="h-6 w-6" />
              <span>Leave Reviews</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
