import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import {
  Search, MapPin, Users, Sprout, Package, Crosshair, Maximize2,
  Layers, ChevronRight, List, Map as MapIcon, X, ChevronLeft, Star,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { producers, categories } from '@/data/producers';
import type { Category, Producer } from '@/data/producers';
import { defaultLeafIcon, selectedLeafIcon, hoverLeafIcon } from '@/components/map/LeafIcon';
import ProducerPopup from '@/components/map/ProducerPopup';
import ProducerSidebar from '@/components/map/ProducerSidebar';
import BottomSheet from '@/components/map/BottomSheet';
import RegionOverlay from '@/components/map/RegionOverlay';
import 'leaflet/dist/leaflet.css';

// Map controller component for programmatic map control
function MapController({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.8 });
  }, [center, zoom, map]);
  return null;
}

// Locate me button
function LocateButton({ onLocate }: { onLocate: (pos: [number, number]) => void }) {
  const map = useMap();
  const [locating, setLocating] = useState(false);

  const handleClick = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        onLocate(coords);
        map.flyTo(coords, 10, { duration: 1 });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={locating}
      className="absolute bottom-24 left-4 z-[500] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-soil-700 hover:bg-soil-100 transition-colors disabled:opacity-50"
      title="Locate me"
    >
      <Crosshair size={18} className={locating ? 'animate-spin' : ''} />
    </button>
  );
}

export default function MapPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [searchValue, setSearchValue] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([5.0, 12.0]);
  const [mapZoom, setMapZoom] = useState(7);
  const [showRegions, setShowRegions] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMapView, setIsMapView] = useState(true);
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Filter producers
  const filteredProducers = useMemo(() => {
    let result = producers;
    if (activeFilter !== 'all') {
      result = result.filter((p) => p.category === activeFilter);
    }
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeFilter, searchValue]);

  const selectedProducer = useMemo(
    () => producers.find((p) => p.id === selectedId) || null,
    [selectedId],
  );

  const handleMarkerClick = useCallback((producer: Producer) => {
    setSelectedId(producer.id);
    setMapCenter([producer.latitude, producer.longitude]);
    setMapZoom(12);
    setBottomSheetExpanded(false);
  }, []);

  const handleListItemClick = useCallback((id: number) => {
    const p = producers.find((pr) => pr.id === id);
    if (p) {
      setSelectedId(id);
      setMapCenter([p.latitude, p.longitude]);
      setMapZoom(12);
    }
    setSidebarOpen(false);
  }, []);

  const handleSearchFocus = useCallback(() => {
    // Search input expand handled by CSS
  }, []);

  // Stats
  const totalProducers = producers.length;
  const totalRegions = 10;

  return (
    <div className="relative w-full" style={{ height: 'calc(100dvh - 56px)' }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="absolute top-0 left-0 right-0 z-[500] bg-white border-b border-soil-200 shadow-sm"
      >
        <div className="px-4 py-2">
          {/* Top row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => navigate(-1)}
                className="md:hidden p-1.5 text-soil-700 hover:text-soil-900 shrink-0"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="min-w-0">
                <h1 className="font-display text-display-sm text-soil-900 leading-tight">
                  {isEn ? 'Producer Map' : 'Carte des Producteurs'}
                </h1>
                <p className="text-body-sm text-soil-500">
                  {totalProducers} {isEn ? 'producers' : 'producteurs'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-soil-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder={isEn ? 'Search city or region...' : 'Rechercher une ville ou region...'}
                  className="w-44 focus:w-64 transition-all duration-200 h-9 bg-soil-100 border border-soil-200 rounded-full pl-8 pr-3 text-sm text-soil-900 placeholder:text-soil-500 outline-none focus:border-terracotta focus:shadow-[0_0_0_3px_#F2E0D6]"
                />
                {searchValue && (
                  <button
                    onClick={() => setSearchValue('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-soil-400 hover:text-soil-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* View toggle */}
              <div className="flex items-center bg-soil-100 rounded-full p-0.5">
                <button
                  onClick={() => setIsMapView(true)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isMapView
                      ? 'bg-white text-soil-900 shadow-sm'
                      : 'text-soil-500 hover:text-soil-700'
                  }`}
                >
                  <MapIcon size={13} />
                  <span className="hidden sm:inline">{isEn ? 'Map' : 'Carte'}</span>
                </button>
                <button
                  onClick={() => setIsMapView(false)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    !isMapView
                      ? 'bg-white text-soil-900 shadow-sm'
                      : 'text-soil-500 hover:text-soil-700'
                  }`}
                >
                  <List size={13} />
                  <span className="hidden sm:inline">{isEn ? 'List' : 'Liste'}</span>
                </button>
              </div>

              {/* Open sidebar on desktop */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-soil-100 rounded-full text-xs font-medium text-soil-700 hover:bg-soil-200 transition-colors"
              >
                <List size={13} />
                {isEn ? 'Producers' : 'Producteurs'}
              </button>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 mt-2 pb-1 overflow-x-auto hide-scrollbar">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setActiveFilter(cat.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === cat.id
                    ? 'bg-terracotta text-white'
                    : 'bg-soil-200 text-soil-700 hover:bg-soil-300'
                }`}
              >
                {isEn ? cat.labelEn : cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile search (when no desktop search) */}
      <div className="sm:hidden absolute top-[88px] left-4 right-4 z-[500]">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-soil-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={isEn ? 'Search city or region...' : 'Rechercher une ville ou region...'}
            className="w-full h-10 bg-white border border-soil-200 rounded-full pl-8 pr-3 text-sm text-soil-900 placeholder:text-soil-500 outline-none focus:border-terracotta focus:shadow-[0_0_0_3px_#F2E0D6] shadow-md"
          />
        </div>
      </div>

      {isMapView ? (
        <>
          {/* Map */}
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            minZoom={6}
            maxZoom={16}
            style={{ height: '100%', width: '100%', zIndex: 1 }}
            zoomControl={false}
            scrollWheelZoom={true}
          >
            <MapController center={mapCenter} zoom={mapZoom} />

            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {/* Region overlays */}
            <RegionOverlay visible={showRegions} lang={lang} />

            {/* User location */}
            {userLocation && (
              <>
                <Circle
                  center={userLocation}
                  radius={2000}
                  pathOptions={{
                    fillColor: '#4A8FBF',
                    fillOpacity: 0.15,
                    color: '#4A8FBF',
                    weight: 1,
                  }}
                />
                <Marker
                  position={userLocation}
                  icon={L.divIcon({
                    className: 'user-location-marker',
                    html: `<div style="width:14px;height:14px;background:#4A8FBF;border:2px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(74,143,191,0.3);"></div>`,
                    iconSize: [14, 14],
                    iconAnchor: [7, 7],
                  })}
                />
              </>
            )}

            {/* Producer markers */}
            {filteredProducers.map((producer) => (
              <Marker
                key={producer.id}
                position={[producer.latitude, producer.longitude]}
                icon={
                  selectedId === producer.id
                    ? selectedLeafIcon
                    : hoveredId === producer.id
                      ? hoverLeafIcon
                      : defaultLeafIcon
                }
                eventHandlers={{
                  click: () => handleMarkerClick(producer),
                  mouseover: () => setHoveredId(producer.id),
                  mouseout: () => setHoveredId(null),
                }}
              >
                <Popup className="producer-popup" minWidth={220} maxWidth={280}>
                  <ProducerPopup producer={producer} />
                </Popup>
              </Marker>
            ))}

            {/* Controls */}
            <div className="absolute bottom-24 right-4 z-[500] flex flex-col gap-2">
              <button
                onClick={() => setShowRegions(!showRegions)}
                className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors ${
                  showRegions ? 'bg-leaf text-white' : 'bg-white text-soil-700 hover:bg-soil-100'
                }`}
                title={isEn ? 'Agricultural regions' : 'Regions agricoles'}
              >
                <Layers size={18} />
              </button>
              <button
                onClick={() => setShowFullscreen(!showFullscreen)}
                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-soil-700 hover:bg-soil-100 transition-colors"
                title="Fullscreen"
              >
                <Maximize2 size={18} />
              </button>
            </div>

            <LocateButton onLocate={setUserLocation} />
          </MapContainer>

          {/* Stats bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[500] bg-white rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-4 md:gap-6"
          >
            <div className="flex items-center gap-1.5">
              <Users size={16} className="text-leaf" />
              <span className="text-sm font-semibold text-soil-900">{totalProducers}</span>
              <span className="text-body-sm text-soil-500 hidden sm:inline">
                {isEn ? 'Producers' : 'Producteurs'}
              </span>
            </div>
            <div className="w-px h-5 bg-soil-200" />
            <div className="flex items-center gap-1.5">
              <Sprout size={16} className="text-terracotta" />
              <span className="text-sm font-semibold text-soil-900">{totalRegions}</span>
              <span className="text-body-sm text-soil-500 hidden sm:inline">
                {isEn ? 'Regions' : 'Regions'}
              </span>
            </div>
            <div className="w-px h-5 bg-soil-200" />
            <div className="flex items-center gap-1.5">
              <Package size={16} className="text-sky" />
              <span className="text-sm font-semibold text-soil-900">18K+</span>
              <span className="text-body-sm text-soil-500 hidden sm:inline">
                {isEn ? 'Deliveries' : 'Livraisons'}
              </span>
            </div>
          </motion.div>

          {/* Region legend */}
          {showRegions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-36 md:bottom-20 left-4 z-[500] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3"
            >
              <p className="text-label text-soil-700 mb-2">
                {isEn ? 'AGRICULTURAL REGIONS' : 'REGIONS AGRICOLES'}
              </p>
              <div className="space-y-1.5">
                {[
                  { color: '#C75B2A', label: isEn ? 'West (Coffee, Cacao)' : 'Ouest (Cafe, Cacao)' },
                  { color: '#4A7C3F', label: isEn ? 'Centre (Vegetables, Poultry)' : 'Centre (Legumes, Volailles)' },
                  { color: '#D4A017', label: isEn ? 'Littoral (Fruits)' : 'Littoral (Fruits)' },
                  { color: '#C75B2A99', label: isEn ? 'South (Cacao, Fruits)' : 'Sud (Cacao, Fruits)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: item.color, opacity: 0.5 }}
                    />
                    <span className="text-body-sm text-soil-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bottom sheet (mobile) */}
          <BottomSheet
            producer={selectedProducer}
            isExpanded={bottomSheetExpanded}
            onExpand={() => setBottomSheetExpanded(true)}
            onCollapse={() => setBottomSheetExpanded(false)}
          />

          {/* Producer sidebar (desktop) */}
          <ProducerSidebar
            producers={filteredProducers}
            selectedId={selectedId}
            onSelect={handleListItemClick}
            onClose={() => setSidebarOpen(false)}
            isOpen={sidebarOpen}
            userLocation={userLocation}
          />
        </>
      ) : (
        /* List View */
        <div className="pt-28 pb-6 px-4 overflow-y-auto bg-soil-50" style={{ height: '100%' }}>
          <div className="max-w-[1024px] mx-auto space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-display-sm text-soil-900">
                {filteredProducers.length} {isEn ? 'producers' : 'producteurs'}
              </h2>
              <select className="h-9 px-3 bg-white border border-soil-200 rounded-lg text-sm text-soil-700 outline-none focus:border-terracotta">
                <option>{isEn ? 'Distance' : 'Distance'}</option>
                <option>{isEn ? 'Rating' : 'Note'}</option>
                <option>{isEn ? 'Sales' : 'Ventes'}</option>
                <option>{isEn ? 'Name' : 'Nom'}</option>
              </select>
            </div>
            {filteredProducers.map((producer, index) => (
              <motion.div
                key={producer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                onClick={() => navigate(`/producer/${producer.id}`)}
                className="flex items-center gap-4 p-4 bg-soil-50 rounded-2xl border border-soil-200 hover:shadow-card-hover hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div
                  className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url(${producer.avatar})` }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[15px] font-semibold text-soil-900 truncate">
                    {producer.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-leaf" />
                    <span className="text-body-sm text-soil-500">{producer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center gap-0.5 text-body-sm text-soil-600">
                      <Star size={12} className="text-sun fill-sun" />
                      {producer.rating}
                    </span>
                    <span className="text-body-sm text-soil-400">({producer.reviews} {isEn ? 'reviews' : 'avis'})</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label bg-leaf-light text-leaf-dark">
                      {isEn ? producer.categoryLabelEn : producer.categoryLabel}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-soil-400 shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
