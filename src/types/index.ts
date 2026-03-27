import { Timestamp } from "firebase/firestore";

export interface Donation {
  id: string;
  name: string;
  amount: number;
  createdAt: Timestamp;
}

export interface Impact {
  id: string;
  image: string;
  caption: string;
  createdAt: Timestamp;
}

export interface Location {
  id: string;
  lat: number;
  lng: number;
  type: "need" | "helped";
  description: string;
}
