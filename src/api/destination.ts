import type { Destination } from "@/types";

// Mock data - replace with actual API calls
const mockDestinations: Destination[] = [
  {
    id: "1",
    name: "Bali, Indonesia",
    description: "Beautiful beaches and vibrant culture",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2586&auto=format&fit=crop",
    price: 1200,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Paris, France",
    description: "The city of love and lights",
    image:
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2670&auto=format&fit=crop",
    price: 1500,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Tokyo, Japan",
    description: "Modern city with rich traditions",
    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2653&auto=format&fit=crop",
    price: 1800,
    rating: 4.7,
  },
  {
    id: "4",
    name: "New York, USA",
    description: "The city that never sleeps",
    image:
      "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=2671&auto=format&fit=crop",
    price: 1400,
    rating: 4.6,
  },
  {
    id: "5",
    name: "Rome, Italy",
    description: "Eternal city with ancient history",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=2676&auto=format&fit=crop",
    price: 1300,
    rating: 4.8,
  },
  {
    id: "6",
    name: "Sydney, Australia",
    description: "Stunning harbor and iconic opera house",
    image:
      "https://images.unsplash.com/photo-1523428096881-5bd79d043006?q=80&w=2670&auto=format&fit=crop",
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
