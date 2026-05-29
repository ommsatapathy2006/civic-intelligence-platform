"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/firebase/config";

// Fix Leaflet default marker icon issue in Next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
}

export default function Map() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "complaints"),
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as DocumentData),
          }) as Complaint)
          .filter(
            (item) =>
              item.status !== "Resolved" &&
              item.latitude &&
              item.longitude
          );

        setComplaints(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <MapContainer
      center={[20.2961, 85.8245]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {complaints.map((complaint) => (
        <Marker
          key={complaint.id}
          position={[complaint.latitude, complaint.longitude]}
        >
          <Popup>
            <div className="text-black min-w-[200px]">
              <h3 className="font-bold text-lg mb-1">{complaint.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
              <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
                {complaint.category}
              </span>
              <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded ml-1">
                {complaint.status}
              </span>
              {complaint.imageUrl && (
                <img
                  src={complaint.imageUrl}
                  alt={complaint.title}
                  className="mt-2 rounded w-full max-h-32 object-cover"
                />
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}