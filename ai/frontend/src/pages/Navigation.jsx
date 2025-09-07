// pages/Navigation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCflacqI4NEDQ9JFhiWIgSnUlzBT46H5gE';

const Navigation = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const mapRef = useRef(null);
    const inputRef = useRef(null);


    // Store map and services in refs to persist between renders
    const mapInstance = useRef(null);
    const directionsRendererRef = useRef(null);
    const directionsServiceRef = useRef(null);
    const destMarkerRef = useRef(null);

    useEffect(() => {
        // Use the official loader for best practice
        const loader = new Loader({
            apiKey: GOOGLE_MAPS_API_KEY,
            version: 'weekly',
            libraries: ['places', 'marker']
        });
        loader.load().then(() => {
            initMap();
        });
    }, []);

    const initMap = () => {
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                    renderMap(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    setUserLocation({ lat: 35.2281, lng: 33.3152 });
                    renderMap(35.2281, 33.3152);
                }
            );
        } else {
            setUserLocation({ lat: 35.2281, lng: 33.3152 });
            renderMap(35.2281, 33.3152);
        }
    };

    const renderMap = (lat, lng) => {
        if (!mapRef.current) return;
        const { maps } = window.google;
        mapInstance.current = new maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 16,
        });

        // User marker using AdvancedMarkerElement only if available
        if (maps.marker && maps.marker.AdvancedMarkerElement) {
            new maps.marker.AdvancedMarkerElement({
                map: mapInstance.current,
                position: { lat, lng },
                title: 'Your Location',
            });
        }

        directionsRendererRef.current = new maps.DirectionsRenderer();
        directionsRendererRef.current.setMap(mapInstance.current);
        directionsServiceRef.current = new maps.DirectionsService();
    };

    // Attach PlaceAutocompleteElement after map is rendered
    useEffect(() => {
        if (!window.google || !mapInstance.current || !inputRef.current) return;
        const { maps } = window.google;
        // PlaceAutocompleteElement is the new recommended API
        const autocompleteEl = document.createElement('gmp-place-autocomplete');
        autocompleteEl.setAttribute('input', inputRef.current);
        autocompleteEl.setAttribute('fields', 'geometry,name,formatted_address');
        mapRef.current.appendChild(autocompleteEl);

        autocompleteEl.addEventListener('gmp-place', (event) => {
            const place = event.detail;
            if (!place.geometry || !place.geometry.location) return;
            setDestination(place.geometry.location);

            // Remove previous marker
            if (destMarkerRef.current) {
                if (destMarkerRef.current.map) destMarkerRef.current.map = null;
                destMarkerRef.current = null;
            }

            // Use AdvancedMarkerElement for destination marker if available
            if (maps.marker && maps.marker.AdvancedMarkerElement) {
                destMarkerRef.current = new maps.marker.AdvancedMarkerElement({
                    map: mapInstance.current,
                    position: place.geometry.location,
                    title: place.name,
                });
            }

            // Route
            directionsRendererRef.current.setMap(mapInstance.current);
            directionsServiceRef.current.route(
                {
                    origin: userLocation,
                    destination: place.geometry.location,
                    travelMode: maps.TravelMode.WALKING,
                },
                (result, status) => {
                    if (status === 'OK') {
                        directionsRendererRef.current.setDirections(result);
                        const leg = result.routes[0].legs[0];
                        setRouteInfo({
                            distance: leg.distance.text,
                            duration: leg.duration.text,
                            end_address: leg.end_address,
                        });
                    } else {
                        setRouteInfo(null);
                    }
                }
            );
        });
    }, [userLocation]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
            <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-6">
                <h1 className="text-4xl font-bold text-white text-center">Navigation</h1>
                <p className="text-gray-300 text-center mt-2">Search for a place and see the path from your location.</p>
            </div>
            <div className="flex h-screen">
                <div className="w-1/3 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto flex flex-col">
                    <h2 className="text-2xl font-bold text-white mb-6">Search Place</h2>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a place..."
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {routeInfo && (
                        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-400/30 rounded-xl">
                            <h3 className="text-white font-semibold mb-2">Route Information</h3>
                            <p className="text-gray-300 text-sm">Destination: {routeInfo.end_address}</p>
                            <p className="text-gray-300 text-sm">Distance: {routeInfo.distance}</p>
                            <p className="text-gray-300 text-sm">Walking time: {routeInfo.duration}</p>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
                </div>
            </div>
        </div>
    );
};
export default Navigation;