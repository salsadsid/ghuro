export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

export interface BookingData {
  destination: Destination;
  name: string;
  email: string;
  phone: string;
  date: string;
}
