'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Clock, ShieldCheck, ArrowRight, Plane, Car, PhoneCall } from 'lucide-react';
import { CONTACT_INFO } from '@/data/transferData';

interface LocationPin {
  id: string;
  name: string;
  sub: string;
  coords: [number, number]; // [lat, lng]
  distFromBJV: string;
  timeFromBJV: string;
  price: string;
  type: 'airport' | 'destination';
}

const locations: LocationPin[] = [
  {
    id: 'bjv',
    name: 'Milas-Bodrum Havalimanı (BJV)',
    sub: 'Genel Havacılık & VIP Terminali',
    coords: [37.2506, 27.6643],
    distFromBJV: '0 km',
    timeFromBJV: '0 dk',
    price: 'Başlangıç Noktası',
    type: 'airport'
  },
  {
    id: 'yalikavak',
    name: 'Yalıkavak & Marina',
    sub: 'Süperyat İskelesi, Zuma, Novikov',
    coords: [37.1066, 27.2917],
    distFromBJV: '52 km',
    timeFromBJV: '45 dk',
    price: '€75',
    type: 'destination'
  },
  {
    id: 'amanruya',
    name: 'Göltürkbükü & Mandarin / Amanruya',
    sub: 'Demir Mevkii, Maçakızı, Scorpios',
    coords: [37.1333, 27.4480],
    distFromBJV: '42 km',
    timeFromBJV: '38 dk',
    price: '€70',
    type: 'destination'
  },
  {
    id: 'center',
    name: 'Bodrum Merkez & Kruvaziyer Limanı',
    sub: 'Bodrum Kalesi, Marina, Tarih',
    coords: [37.0344, 27.4305],
    distFromBJV: '36 km',
    timeFromBJV: '32 dk',
    price: '€55',
    type: 'destination'
  },
  {
    id: 'torba',
    name: 'Torba & Kaynar Koyu',
    sub: 'Vogue Hotel, The Bodrum Edition',
    coords: [37.0833, 27.4667],
    distFromBJV: '32 km',
    timeFromBJV: '28 dk',
    price: '€50',
    type: 'destination'
  },
  {
    id: 'gumusluk',
    name: 'Gümüşlük & Balıkçı Barınakları',
    sub: 'Gün Batımı, Müzik & Gastronomi',
    coords: [37.0547, 27.2345],
    distFromBJV: '56 km',
    timeFromBJV: '50 dk',
    price: '€80',
    type: 'destination'
  }
];

const MapInner = () => {
  const [selectedPin, setSelectedPin] = useState<LocationPin>(locations[1]); // Default Yalikavak
  const { MapContainer, TileLayer, Marker, Popup, Polyline } = require('react-leaflet');
  const L = require('leaflet');

  const createIcon = (isAirport: boolean, isSelected: boolean) => {
    return L.divIcon({
      className: 'custom-leaflet-pin',
      html: `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${isSelected ? '36px' : '28px'};
          height: ${isSelected ? '36px' : '28px'};
          background: ${isAirport ? '#10b981' : isSelected ? '#E5D3B3' : '#1e1b15'};
          color: ${isAirport || isSelected ? '#000000' : '#ffffff'};
          border: 2px solid ${isSelected ? '#ffffff' : 'rgba(255,255,255,0.4)'};
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6);
          cursor: pointer;
          font-size: ${isSelected ? '16px' : '13px'};
          font-weight: bold;
          transition: all 0.3s ease;
        ">
          ${isAirport ? '✈' : '📍'}
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  const airportCoords = locations[0].coords;

  return (
    <div className="relative w-full h-[480px] md:h-[540px] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
      
      {/* Real Interactive Leaflet Map - Zero API Key Needed (OpenStreetMap / Esri Topo) */}
      <MapContainer
        center={[37.12, 27.46]}
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: '#dce5db' }}
      >
        {/* 100% Free Public OSM Tile Layer with Amanruya Muted Olive Filter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-aman-filter"
        />

        {/* Animated Polyline from Airport to Selected Pin */}
        {selectedPin.type !== 'airport' && (
          <Polyline
            positions={[airportCoords, selectedPin.coords]}
            pathOptions={{
              color: '#1a1917',
              weight: 3.5,
              dashArray: '6, 8',
              opacity: 0.85,
            }}
          />
        )}

        {/* Markers */}
        {locations.map((loc) => {
          const isSelected = selectedPin.id === loc.id;
          const isAirport = loc.type === 'airport';
          return (
            <Marker
              key={loc.id}
              position={loc.coords}
              icon={createIcon(isAirport, isSelected)}
              eventHandlers={{
                click: () => setSelectedPin(loc),
              }}
            >
              <Popup className="luxury-map-popup">
                <div className="p-2 min-w-[200px]">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{loc.distFromBJV} • {loc.timeFromBJV}</div>
                  <h4 className="font-serif font-bold text-sm text-black mt-0.5">{loc.name}</h4>
                  <p className="text-xs text-zinc-600 mb-2">{loc.sub}</p>
                  {loc.type !== 'airport' && (
                    <div className="flex items-center justify-between border-t border-zinc-200 pt-2">
                      <span className="font-serif font-bold text-sm text-black">Net: {loc.price}</span>
                      <a
                        href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Merhaba,%20${encodeURIComponent(loc.name)}%20VIP%20transferi%20icin%20rezervasyon%20yaptirmak%20istiyorum.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-black underline"
                      >
                        Rezerve Et ➔
                      </a>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Active Cove Card on top of map (Aman Style) */}
      <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 z-[1000] backdrop-blur-2xl bg-[#0a0a0a]/92 border border-white/15 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-mono tracking-widest text-[#E5D3B3] uppercase">Seçili Destinasyon</span>
          <span className="text-xs font-serif font-bold text-white">{selectedPin.price}</span>
        </div>
        <h4 className="font-serif text-lg text-white font-medium mb-1">{selectedPin.name}</h4>
        <p className="text-xs text-zinc-400 font-light mb-4">{selectedPin.sub}</p>
        
        <div className="flex items-center justify-between text-xs text-zinc-300 border-t border-white/10 pt-3">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#E5D3B3]" /> {selectedPin.timeFromBJV} Sürüş</span>
          <span className="font-mono text-zinc-400">{selectedPin.distFromBJV}</span>
        </div>

        <a
          href={`https://wa.me/${CONTACT_INFO.phoneClean}?text=Merhaba,%20${encodeURIComponent(selectedPin.name)}%20VIP%20transfer%20icin%20fiyat%20almak%20istiyorum.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-3 flex items-center justify-center gap-2 bg-[#E5D3B3] hover:bg-white text-black py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors"
        >
          <span>WhatsApp İle Ayırt</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};

const DynamicMap = dynamic(() => Promise.resolve(MapInner), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] rounded-[2rem] bg-[#1c1a16] flex items-center justify-center text-zinc-500 font-mono text-xs">
      Bodrum Yarımadası Haritası Yükleniyor...
    </div>
  ),
});

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function BodrumRouteMap() {
  const { t } = useLanguage();

  return (
    <section id="routes" className="py-28 px-4 w-full max-w-6xl mx-auto relative z-10 border-t border-white/5">
      
      {/* Aman-Style Minimalist Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <span className="text-[10px] font-sans tracking-[0.3em] text-[#E5D3B3] uppercase block mb-3 font-medium">
          {t.map.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide mb-4 font-normal">
          {t.map.title}
        </h2>
        <p className="text-sm font-sans text-zinc-400 font-light leading-relaxed">
          {t.map.subtitle}
        </p>
      </motion.div>

      {/* The Leaflet Aman-Themed Real Map */}
      <DynamicMap />

      {/* Aman-Style 3-Column Metadata Strip */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10 items-start">
        
        {/* Col 1: Location & Coordinates */}
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-[#E5D3B3] shrink-0 mt-1" />
          <div className="text-xs font-sans text-zinc-300 leading-relaxed font-light whitespace-pre-line">
            <strong className="text-white font-serif block font-medium mb-0.5">{t.map.hubTitle}</strong>
            {t.map.hubDesc}
          </div>
        </div>

        {/* Col 2: Airport Distance Info */}
        <div className="flex items-start gap-3">
          <Plane className="w-4 h-4 text-[#E5D3B3] shrink-0 mt-1" />
          <div className="text-xs font-sans text-zinc-300 leading-relaxed font-light whitespace-pre-line">
            <strong className="text-white font-serif block font-medium mb-0.5">{t.map.airportTitle}</strong>
            {t.map.airportDesc}
          </div>
        </div>

        {/* Col 3: Direct Action CTA */}
        <div className="flex items-center md:justify-end">
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium text-[#E5D3B3] hover:text-white uppercase tracking-widest border-b border-[#E5D3B3] pb-1 transition-colors"
          >
            <span>{t.map.calcRoute}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </section>
  );
}
