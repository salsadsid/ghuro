import type { Destination } from "@/types";

// Mock data - replace with actual API calls
const mockDestinations: Destination[] = [
  // Bangladesh Destinations
  {
    id: "1",
    name: "Cox's Bazar, Bangladesh",
    description:
      "World's longest natural sea beach with golden sand stretching 120km",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format&fit=crop",
    price: 150,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Sundarbans, Bangladesh",
    description: "Largest mangrove forest and home to the Royal Bengal Tiger",
    image:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2670&auto=format&fit=crop",
    price: 120,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Sylhet Tea Gardens, Bangladesh",
    description:
      "Rolling hills covered in lush tea plantations and natural beauty",
    image:
      "https://images.unsplash.com/photo-1563122757-1e5a3b63d6dd?q=80&w=2670&auto=format&fit=crop",
    price: 100,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Bandarban, Bangladesh",
    description: "Highest peaks and breathtaking mountain landscapes",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop",
    price: 80,
    rating: 4.8,
  },
  {
    id: "5",
    name: "Saint Martin's Island, Bangladesh",
    description: "Coral island paradise with crystal clear waters",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2670&auto=format&fit=crop",
    price: 90,
    rating: 4.6,
  },
  {
    id: "6",
    name: "Rangamati, Bangladesh",
    description: "Lake district with hanging bridge and tribal culture",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2670&auto=format&fit=crop",
    price: 70,
    rating: 4.5,
  },
  // International Destinations
  {
    id: "7",
    name: "Bali, Indonesia",
    description: "Tropical paradise with ancient temples and vibrant culture",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2586&auto=format&fit=crop",
    price: 1200,
    rating: 4.8,
  },
  {
    id: "8",
    name: "Paris, France",
    description: "City of lights, romance, and world-class art museums",
    image:
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2670&auto=format&fit=crop",
    price: 1500,
    rating: 4.9,
  },
  {
    id: "9",
    name: "Tokyo, Japan",
    description: "Futuristic metropolis blending tradition with innovation",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2653&auto=format&fit=crop",
    price: 1800,
    rating: 4.7,
  },
  {
    id: "10",
    name: "Santorini, Greece",
    description: "Iconic white buildings and stunning Mediterranean sunsets",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2670&auto=format&fit=crop",
    price: 1300,
    rating: 4.8,
  },
  {
    id: "11",
    name: "Maldives",
    description: "Luxury overwater villas in crystal-clear turquoise waters",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2665&auto=format&fit=crop",
    price: 2500,
    rating: 4.9,
  },
  {
    id: "12",
    name: "Dubai, UAE",
    description: "Modern luxury with golden deserts and architectural marvels",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop",
    price: 1600,
    rating: 4.7,
  },
];

export async function getDestinations(): Promise<Destination[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockDestinations;
}

export async function getDestinationById(
  id: string
): Promise<Destination | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockDestinations.find((dest) => dest.id === id);
}
