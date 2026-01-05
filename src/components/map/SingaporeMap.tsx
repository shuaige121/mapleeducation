'use client';

import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { schools, mrtStations, School, MRTStation } from '@/data/mapData';
import { DivIcon, LatLngExpression } from 'leaflet';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';

// Fix for default marker icon in Next.js
import L from 'leaflet';

const getSchoolBadgeText = (name: string) => {
    const bracketMatch = name.match(/\(([^)]+)\)\s*$/);
    if (bracketMatch && bracketMatch[1]) return bracketMatch[1].slice(0, 6).toUpperCase();

    const cleaned = name.replace(/[^a-zA-Z0-9]+/g, " ").trim();
    if (!cleaned) return "LOGO";
    const first = cleaned.split(/\s+/)[0] || "LOGO";
    return first.slice(0, 6).toUpperCase();
};

const createSchoolIcon = (name: string) => {
    const badgeText = getSchoolBadgeText(name);

    return new DivIcon({
        className: 'custom-school-icon',
        html: `<div class="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white relative group flex items-center justify-center">
             <div class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-50"></div>
             <div class="absolute inset-0 bg-blue-500/15 animate-pulse"></div>
             <span class="relative text-[10px] font-bold text-gray-700 tracking-wide">${badgeText}</span>
           </div>`,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    });
};

const createMRTIcon = (lines: string[]) => {
    const colorMap: Record<string, string> = {
        NS: 'bg-red-500',
        EW: 'bg-green-500',
        NE: 'bg-purple-500',
        CC: 'bg-yellow-500',
        DT: 'bg-blue-500',
        TE: 'bg-brown-500',
    };

    // Use the first line color for the dot
    const mainColor = colorMap[lines[0]] || 'bg-gray-500';

    return new DivIcon({
        className: 'custom-mrt-icon',
        html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-md ${mainColor}"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -8],
    });
};

// Component to handle map flying
function MapController({ center, zoom }: { center: LatLngExpression | null, zoom: number }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, {
                duration: 1.5,
                easeLinearity: 0.25
            });
        }
    }, [center, zoom, map]);
    return null;
}

export default function SingaporeMap() {
    const { t, locale } = useI18n();
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
    const [activeMRTStations, setActiveMRTStations] = useState<MRTStation[]>([]);

    // Center of Singapore
    const defaultCenter: LatLngExpression = [1.3521, 103.8198];
    const defaultZoom = 12;

    useEffect(() => {
        // Fix leaflet icon issue
        // @ts-expect-error - Leaflet types do not expose internal _getIconUrl
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    const handleSchoolClick = (school: School) => {
        setSelectedSchool(school);
        // Find nearest MRT stations
        const nearby = mrtStations.filter(station => school.nearestMRT.includes(station.id));
        setActiveMRTStations(nearby);
    };

    return (
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
                style={{ background: '#242f3e' }} // Dark background to match dark tiles
            >
                {/* Dark Matter Tiles for "Cool" look */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <MapController
                    center={selectedSchool ? [selectedSchool.lat, selectedSchool.lng] : defaultCenter}
                    zoom={selectedSchool ? 15 : defaultZoom}
                />

                {/* School Markers */}
                {schools.map((school) => (
                    <Marker
                        key={school.id}
                        position={[school.lat, school.lng]}
                        icon={createSchoolIcon(school.name)}
                        eventHandlers={{
                            click: () => handleSchoolClick(school),
                        }}
                    >
                        {/* We don't use standard popup, we use custom overlay, but keep tooltip for hover */}
                        <Tooltip direction="top" offset={[0, -20]} opacity={1} className="custom-tooltip">
                            <span className="font-bold">{school.name}</span>
                        </Tooltip>
                    </Marker>
                ))}

                {/* MRT Markers (Only show when a school is selected or show all? Let's show relevant ones) */}
                {activeMRTStations.map((station) => (
                    <Marker
                        key={station.id}
                        position={[station.lat, station.lng]}
                        icon={createMRTIcon(station.lines)}
                    >
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                            <div className="text-center">
                                <span className="font-bold block text-xs">{station.name}</span>
                                <span className="text-[10px] text-gray-500">{station.avgPropertyPrice}</span>
                            </div>
                        </Tooltip>
                    </Marker>
                ))}

                {/* Connecting Lines */}
                {selectedSchool && activeMRTStations.map((station) => (
                    <Polyline
                        key={`${selectedSchool.id}-${station.id}`}
                        positions={[
                            [selectedSchool.lat, selectedSchool.lng],
                            [station.lat, station.lng]
                        ]}
                        pathOptions={{ color: '#3b82f6', weight: 3, dashArray: '10, 10', opacity: 0.7 }}
                    />
                ))}

            </MapContainer>

            {/* Overlay Info Panel */}
            <AnimatePresence>
                {selectedSchool && (
                    <motion.div
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        className="absolute top-4 right-4 w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-xl shadow-xl z-[1000] border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSchool.name}</h3>
                            <button
                                onClick={() => {
                                    setSelectedSchool(null);
                                    setActiveMRTStations([]);
                                }}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{selectedSchool.description[locale]}</p>

                        <div className="mb-4">
                            <h4 className="text-xs font-semibold uppercase text-gray-400 mb-2">{t("map.nearestMrtStations")}</h4>
                            <div className="space-y-2">
                                {activeMRTStations.map(station => (
                                    <div key={station.id} className="flex items-center justify-between text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${station.lines.includes('NS') ? 'bg-red-500' : station.lines.includes('EW') ? 'bg-green-500' : station.lines.includes('NE') ? 'bg-purple-500' : station.lines.includes('CC') ? 'bg-yellow-500' : station.lines.includes('DT') ? 'bg-blue-500' : 'bg-gray-500'}`}></span>
                                            <span className="font-medium dark:text-gray-200">{station.name}</span>
                                        </div>
                                        <span className="text-xs text-green-600 font-semibold">{station.avgPropertyPrice}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <a
                            href={selectedSchool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            {t("map.visitWebsite")}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
