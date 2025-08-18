import { getDestinationById } from "@/api/destination";
import BookingDialog from "@/components/BookingDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function DestinationDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: destination } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestinationById(id!),
  });

  const handleBookNow = () => {
    if (isAuthenticated) {
      setIsDialogOpen(true);
    } else {
      localStorage.setItem("bookingData", JSON.stringify({ destination }));
      window.location.href = "/auth";
    }
  };

  if (!destination) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <img
            src={destination.image}
            alt={destination.name}
            className="rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{destination.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(destination.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>{destination.rating.toFixed(1)}</span>
          </div>

          <p className="text-lg">{destination.description}</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">${destination.price}</span>
              <span className="text-gray-600"> / person</span>
            </div>

            <Button onClick={handleBookNow}>Book Now</Button>
          </div>
        </div>
      </div>

      {destination && (
        <BookingDialog
          destination={destination}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
}
