// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useEffect, useState } from "react";
// import L from "leaflet";

// // Fix default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// export default function LocationMap({ onAddressFetched }) {
//   const [position, setPosition] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported");
//       return;
//     }

//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;

//         setPosition([lat, lng]);

//         // Reverse Geocoding (OpenStreetMap)
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//         );
//         const data = await res.json();

//         const address = data.address || {};

//         onAddressFetched({
//           country: address.country || "",
//           postalCode: address.postcode || "",
//           fullAddress: data.display_name || "",
//         });

//         setLoading(false);
//       },
//       () => {
//         alert("Location permission denied");
//         setLoading(false);
//       }
//     );
//   }, []);

//   if (loading) {
//     return <p className="text-sm text-gray-500">Fetching location…</p>;
//   }

//   if (!position) return null;

//   return (
//     <div className="rounded-xl overflow-hidden border">
//       <MapContainer
//         center={position}
//         zoom={15}
//         style={{ height: "300px", width: "100%" }}
//       >
//         <TileLayer
//           attribution="© OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>Your current location</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import api from "../services/api";   
export default function LocationMap({ onAddressFetched }) {
  const [position, setPosition] = useState([19.076, 72.8777]); // fallback (Mumbai)
  const [address, setAddress] = useState("");

  

useEffect(() => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);

        // ✅ CALL YOUR BACKEND INSTEAD OF NOMINATIM DIRECTLY
        const res = await api.get(
          `/location/reverse?lat=${lat}&lon=${lng}`
        );

        const data = res.data;

        const country = data.address?.country;
        const postalCode = data.address?.postcode;
        const fullAddress = data.display_name;

        setAddress(fullAddress);

        onAddressFetched?.({
          country,
          postalCode,
          fullAddress,
          lat,
          lng,
        });

      } catch (err) {
        console.error("Location fetch error", err);
      }
    },
    (err) => console.error("Geolocation error", err)
  );
}, []);


  return (
    <>
      {/* MAP */}
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "350px", width: "100%" }}
        attributionControl={false}   
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{address || "Your location"}</Popup>
        </Marker>
      </MapContainer>

      {/* ✅ LEGAL ATTRIBUTION (outside map) */}
      <p className="text-xs text-gray-400 mt-2 text-right">
        Map data © OpenStreetMap contributors
      </p>
    </>
  );
}
