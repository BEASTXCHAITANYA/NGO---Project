"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Location {
  lat: number;
  lng: number;
  type: "helped" | "need";
  city: string;
  description: string;
}

const CITY_DATA: Location[] = [
  // Helped cities (green)
  { city: "Mumbai", lat: 19.076, lng: 72.8777, type: "helped", description: "Mumbai — 1,200 families provided clean water access" },
  { city: "Bengaluru", lat: 12.9716, lng: 77.5946, type: "helped", description: "Bengaluru — 850 children enrolled in skill programs" },
  { city: "Chennai", lat: 13.0827, lng: 80.2707, type: "helped", description: "Chennai — Flood relief distributed to 3,000 households" },
  { city: "Pune", lat: 18.5204, lng: 73.8567, type: "helped", description: "Pune — Women's livelihood center operational" },
  { city: "Ahmedabad", lat: 23.0225, lng: 72.5714, type: "helped", description: "Ahmedabad — Solar panels installed in 200 homes" },
  { city: "Jaipur", lat: 26.9124, lng: 75.7873, type: "helped", description: "Jaipur — Free healthcare camp served 5,000 people" },
  { city: "Kochi", lat: 9.9312, lng: 76.2673, type: "helped", description: "Kochi — Coastal community fishing cooperative launched" },
  { city: "Hyderabad", lat: 17.385, lng: 78.4867, type: "helped", description: "Hyderabad — Digital literacy training for 600 youth" },

  // Cities needing help (red)
  { city: "Patna", lat: 25.5941, lng: 85.1376, type: "need", description: "Patna — Urgent: Flood-affected villages need relief" },
  { city: "Bhopal", lat: 23.2599, lng: 77.4126, type: "need", description: "Bhopal — 400 families lack safe drinking water" },
  { city: "Varanasi", lat: 25.3176, lng: 82.9739, type: "need", description: "Varanasi — Child malnutrition support needed" },
  { city: "Agra", lat: 27.1767, lng: 78.0081, type: "need", description: "Agra — Schools need basic sanitation facilities" },
  { city: "Guwahati", lat: 26.1445, lng: 91.7362, type: "need", description: "Guwahati — Landslide survivors need shelter" },
  { city: "Ranchi", lat: 23.3441, lng: 85.3096, type: "need", description: "Ranchi — Tribal village medical outreach needed" },
  { city: "Srinagar", lat: 34.0837, lng: 74.7973, type: "need", description: "Srinagar — Winter relief kits for 800 families" },
];

function createMarker(loc: Location, map: mapboxgl.Map) {
  const isHelped = loc.type === "helped";

  const el = document.createElement("div");
  Object.assign(el.style, {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    backgroundColor: isHelped ? "#22c55e" : "#ef4444",
    border: "2px solid rgba(255,255,255,0.8)",
    cursor: "pointer",
    boxShadow: isHelped
      ? "0 0 8px 2px rgba(34,197,94,0.5)"
      : "0 0 8px 2px rgba(239,68,68,0.5)",
    transition: "transform 0.15s ease",
  });

  el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.4)"; });
  el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });

  new mapboxgl.Marker({ element: el })
    .setLngLat([loc.lng, loc.lat])
    .setPopup(
      new mapboxgl.Popup({ offset: 18, className: "ngo-popup" })
        .setHTML(
          `<div style="font-family:sans-serif;padding:4px 2px">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
              <span style="width:8px;height:8px;border-radius:50%;background:${isHelped ? "#22c55e" : "#ef4444"};flex-shrink:0;display:inline-block"></span>
              <strong style="font-size:13px;color:#fff">${loc.city}</strong>
              <span style="font-size:10px;padding:1px 6px;border-radius:99px;background:${isHelped ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"};color:${isHelped ? "#86efac" : "#fca5a5"}">${isHelped ? "Helped" : "Needs Help"}</span>
            </div>
            <p style="font-size:12px;color:#9ca3af;margin:0;line-height:1.4">${loc.description.split("—")[1]?.trim() ?? loc.description}</p>
          </div>`
        )
    )
    .addTo(map);
}

export default function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mapboxgl.accessToken = (process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "").trim();

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [78.9629, 20.5937],
      zoom: 4.2,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      // Add all predefined city markers
      CITY_DATA.forEach((loc) => createMarker(loc, map));

      // Also render any dynamic locations from Firestore
      fetch("/api/locations")
        .then((r) => r.json())
        .then((locations: Array<{ lat: number; lng: number; type: "helped" | "need"; description: string }>) => {
          locations.forEach((loc) =>
            createMarker({ ...loc, city: loc.description.split("—")[0]?.trim() ?? "Location" }, map)
          );
        })
        .catch(() => {}); // silently ignore if DB is empty
    });

    return () => map.remove();
  }, []);

  return <div ref={containerRef} className="w-full h-screen" />;
}
