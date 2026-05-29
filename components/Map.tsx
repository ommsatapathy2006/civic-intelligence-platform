"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

export default function Map() {

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

      <Marker position={[20.2961, 85.8245]}>

        <Popup>
          Civic Issue Reported Here
        </Popup>

      </Marker>

    </MapContainer>
  );
}