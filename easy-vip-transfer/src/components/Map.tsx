'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
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

// Custom Icon Creator
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

// Component to handle map view fitting
const MapFitter = ({ toId }: { toId: string }) => {
  const map = useMap();
  useEffect(() => {
    if (toId && DESTINATIONS[toId]) {
      const bounds = L.latLngBounds([BJV_COORDS, DESTINATIONS[toId].coords]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    } else {
      map.setView([37.15, 27.5], 11);
    }
  }, [toId, map]);
  return null;
};

// Label overlay for the route
const RouteLabel = ({ center, time, distance }: { center: [number, number], time: string, distance: string }) => {
  const html = ReactDOMServer.renderToString(
    <div className="bg-black/80 backdrop-blur-md border border-white/20 text-white text-[12px] font-sans font-bold px-3 py-1.5 rounded-full shadow-2xl whitespace-nowrap flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-[#E5D3B3]" />
      {time} <span className="text-zinc-500 font-normal">({distance})</span>
    </div>
  );
  const icon = L.divIcon({ html, className: 'route-label-icon', iconSize: [120, 30], iconAnchor: [60, 15] });
  return <Marker position={center} icon={icon} zIndexOffset={1000} />;
};

export default function Map({ toId }: { toId: string }) {
  const airportIcon = createCustomIcon(<Plane className="w-5 h-5" />, true);
  const destIcon = createCustomIcon(<MapPin className="w-5 h-5" />, false);

  const dest = DESTINATIONS[toId];

  // Calculate mid point for the label
  const midPoint: [number, number] | null = dest ? [
    (BJV_COORDS[0] + dest.coords[0]) / 2,
    (BJV_COORDS[1] + dest.coords[1]) / 2
  ] : null;

  return (
    <div className="w-full h-full bg-[#0a0a0a] relative z-0">
      <MapContainer 
        center={[37.15, 27.5]} 
        zoom={11} 
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapFitter toId={toId} />

        <Marker position={BJV_COORDS} icon={airportIcon} />
        
        {dest && (
          <>
            <Marker position={dest.coords} icon={destIcon} />
            <Polyline 
              positions={[BJV_COORDS, dest.coords]} 
              color="#E5D3B3" 
              weight={3} 
              dashArray="8, 12" 
              opacity={0.8}
            />
            {midPoint && <RouteLabel center={midPoint} time={dest.time} distance={dest.distance} />}
          </>
        )}
      </MapContainer>
    </div>
  );
}
