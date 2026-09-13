'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server';
import { Plane, MapPin } from 'lucide-react';

const BJV_COORDS: [number, number] = [37.2506, 27.6644];

const DESTINATIONS: Record<string, { coords: [number, number]; name: string; time: string; distance: string }> = {
  'mandarin': { coords: [37.1352, 27.3847], name: 'Mandarin Oriental', time: '45 dk', distance: '42 km' },
  'yalikavak-marina': { coords: [37.1062, 27.2831], name: 'Yalıkavak Marina', time: '55 dk', distance: '52 km' },
  'amanruya': { coords: [37.1311, 27.3942], name: 'Amanruya / Maçakızı', time: '42 dk', distance: '40 km' },
  'lujo-titanic': { coords: [37.1594, 27.5623], name: 'Lujo / Titanic', time: '15 dk', distance: '16 km' }
};

const createCustomIcon = (icon: React.ReactNode, isAirport = false) => {
  const html = ReactDOMServer.renderToString(
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-2xl border-2 ${isAirport ? 'bg-black border-[#E5D3B3] text-[#E5D3B3]' : 'bg-[#E5D3B3] border-black text-black'}`}>
      {icon}
    </div>
  );
  return L.divIcon({
    html,
    className: 'custom-leaflet-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

const createRouteLabel = (time: string, distance: string) => {
  const html = ReactDOMServer.renderToString(
    <div className="bg-black/80 backdrop-blur-md border border-white/20 text-white text-[12px] font-sans font-bold px-3 py-1.5 rounded-full shadow-2xl whitespace-nowrap flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-[#E5D3B3]" />
      {time} <span className="text-zinc-500 font-normal">({distance})</span>
    </div>
  );
  return L.divIcon({ html, className: 'route-label-icon', iconSize: [120, 30], iconAnchor: [60, 15] });
};

export default function Map({ toId }: { toId: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const featureGroup = useRef<L.FeatureGroup | null>(null);

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [37.15, 27.5],
        zoom: 11,
        zoomControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        className: 'dark-map-filter',
      }).addTo(mapInstance.current);

      featureGroup.current = L.featureGroup().addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !featureGroup.current) return;

    // Clear previous markers
    featureGroup.current.clearLayers();

    const airportIcon = createCustomIcon(<Plane className="w-5 h-5" />, true);
    L.marker(BJV_COORDS, { icon: airportIcon }).addTo(featureGroup.current);

    const dest = DESTINATIONS[toId];
    if (dest) {
      const destIcon = createCustomIcon(<MapPin className="w-5 h-5" />, false);
      L.marker(dest.coords, { icon: destIcon }).addTo(featureGroup.current);

      L.polyline([BJV_COORDS, dest.coords], {
        color: "#E5D3B3",
        weight: 3,
        dashArray: "8, 12",
        opacity: 0.8
      }).addTo(featureGroup.current);

      const midPoint: [number, number] = [
        (BJV_COORDS[0] + dest.coords[0]) / 2,
        (BJV_COORDS[1] + dest.coords[1]) / 2
      ];

      const labelIcon = createRouteLabel(dest.time, dest.distance);
      L.marker(midPoint, { icon: labelIcon, zIndexOffset: 1000 }).addTo(featureGroup.current);

      const bounds = L.latLngBounds([BJV_COORDS, dest.coords]);
      mapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, animate: true, duration: 1 });
    } else {
      mapInstance.current.setView([37.15, 27.5], 11, { animate: true });
    }
  }, [toId]);

  return <div ref={mapRef} className="w-full h-full bg-[#0a0a0a] z-0" />;
}
