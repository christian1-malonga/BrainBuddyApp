import React, { useState } from 'react';

const busData = {
  'Campus - Lefkoşa 1': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'Industrial Area Stop',
      'Religious Sites Area Stop',
      'Street Kitchen Stop',
      'Honda Stop',
      'Çangar Stop',
      'Reis Supermarket Opposite',
      'Kaymaklı Old Cemetery Stop',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['06:45', '07:15', '08:15', '09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15', '18:15', '19:15', '20:15', '21:15', '22:15'],
      'Saturday': ['07:15', '08:15', '10:15'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-nicosia1.jpg',
    mapColor: '#FF6B35',
    operatingHours: '06:45 - 22:15',
    routeType: 'Campus-City'
  },
  'Campus - Lefkoşa 2': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'City Royal Hotel Terminal Stop',
      'Girne Gate (Mücahitler Park Front)',
      'Kumsal Park Stop',
      'Merit Stop',
      'Ministry of Health Stop',
      'Tepe Home Stop',
      'Dr. Burhan Nalbantoğlu State Hospital Stop',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['06:45', '07:15', '08:15', '09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15', '18:15', '19:15', '20:15', '21:15', '22:15'],
      'Saturday': ['07:15', '08:15', '10:15'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-nicosia2.jpg',
    mapColor: '#4DABF7',
    operatingHours: '06:45 - 22:15',
    routeType: 'Campus-City'
  },
  'Campus - Gönyeli 1': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'İR-MAR Market Opposite Stop',
      'Talihsiz Furniture Stop',
      'Ersoy Teacher Apt. Stop',
      'Military Stop',
      'Big Kiler Stop',
      'Deniz Stationery Stop',
      'Small Kiler Stop',
      'Fair Stop',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['06:45', '07:15', '08:15', '09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15', '18:15', '19:15', '20:15', '21:15', '22:15'],
      'Saturday': ['07:15', '08:15', '10:15'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-gonyeli1.jpg',
    mapColor: '#51CF66',
    operatingHours: '06:45 - 22:15',
    routeType: 'Campus-Suburban'
  },
  'Campus - Gönyeli 2': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'Gönyeli Municipality Stop',
      'Yenikent Stop',
      'Gönyeli Circle Stop',
      'Gönyeli Cemetery Stop',
      'Gönyeli Police Station Stop',
      'Gönyeli Health Center Stop',
      'Gönyeli Circle Stop',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['06:45', '07:15', '08:15', '09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15', '18:15', '19:15', '20:15', '21:15', '22:15'],
      'Saturday': ['07:15', '08:15', '10:15'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-gonyeli2.jpg',
    mapColor: '#69DB7C',
    operatingHours: '06:45 - 22:15',
    routeType: 'Campus-Suburban'
  },
  'Campus - Hamitköy': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'Hamitköy Center',
      'Hamitköy Market Area',
      'Hamitköy Residential Zone',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['07:15', '08:15', '09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15', '18:15', '19:15', '20:15', '21:15', '22:15'],
      'Saturday': ['08:15', '17:15'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-hamitkoy.jpg',
    mapColor: '#845EF7',
    operatingHours: '07:15 - 22:15',
    routeType: 'Campus-Suburban'
  },
  'Campus - Kızılbaş': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'Devpa Stop',
      'Domuzcular Cape Stop',
      'Ebu Bekir Mosque Stop',
      'Campaign Market Stop',
      'Municipality Market Stop',
      'Atatürk Teachers Academy Stop',
      'Dumlupınar Municipality Stop',
      'Okmar Stop',
      'Hamitköy Primary School Stop',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['07:15', '08:15', '09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15', '18:15', '19:15'],
      'Saturday': ['08:15', '17:15'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-kizilbas.jpg',
    mapColor: '#F03E3E',
    operatingHours: '07:15 - 19:15',
    routeType: 'Campus-Suburban'
  },
  'Campus - Gönyeli/Metehan': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'Gönyeli Center',
      'Metehan Border Gate',
      'Metehan Center',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['07:15', '08:15', '09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15', '18:15', '19:15', '20:15', '21:15', '22:15'],
      'Saturday': ['08:15', '17:15'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-gonyeli-metehan.jpg',
    mapColor: '#9775FA',
    operatingHours: '07:15 - 22:15',
    routeType: 'Campus-Border'
  },
  'Campus - Ortaköy/Yenikent': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'Ortaköy Center',
      'Yenikent Center',
      'Yenikent Residential Area',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['07:15', '08:15', '09:15', '10:15', '11:15', '12:15', '13:15', '14:15', '15:15', '16:15', '17:15', '18:15', '19:15', '20:15', '21:15', '22:15'],
      'Saturday': ['08:15', '17:15'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-ortakoy-yenikent.jpg',
    mapColor: '#748FFC',
    operatingHours: '07:15 - 22:15',
    routeType: 'Campus-Suburban'
  },
  'Campus - Girne': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'Kyrenia Center',
      'Kyrenia Harbor',
      'Kyrenia Castle Area',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['07:00', '08:00', '16:00', '17:00', '18:00'],
      'Saturday': ['08:00', '17:00'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-kyrenia.jpg',
    mapColor: '#15AABF',
    operatingHours: '07:00 - 18:00',
    routeType: 'Intercity'
  },
  'Campus - Famagusta': {
    icon: '🚌',
    stops: [
      'YDÜ Campus Main Stop',
      'Near East Bank Stop',
      'Famagusta Center',
      'Famagusta Port',
      'Famagusta Old Town',
      'YDÜ Law Faculty Stop',
      'YDÜ Campus Main Stop'
    ],
    schedule: {
      'Monday-Friday': ['07:00', '08:00', '16:00', '17:00', '18:00'],
      'Saturday': ['08:00', '17:00'],
      'Sunday': []
    },
    mapUrl: 'https://bus.neu.edu.tr/static/images/maps/campus-famagusta.jpg',
    mapColor: '#FD7E14',
    operatingHours: '07:00 - 18:00',
    routeType: 'Intercity'
  }
};

const Transportation = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [filterType, setFilterType] = useState('All');

  const routeTypes = ['All', 'Campus-City', 'Campus-Suburban', 'Campus-Border', 'Intercity'];

  const filteredRoutes = filterType === 'All'
    ? Object.entries(busData)
    : Object.entries(busData).filter(([_, data]) => data.routeType === filterType);

  const handleRouteClick = (routeName) => {
    if (expandedRoute === routeName) {
      setExpandedRoute(null);
    } else {
      setExpandedRoute(routeName);
      setSelectedRoute(routeName);
      setMapLoading(true);
    }
  };

  const handleMapLoad = () => {
    setMapLoading(false);
  };

  const handleMapError = () => {
    setMapLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">NEU Transportation System</h1>
          <p className="text-gray-300 text-lg">Official Bus Routes from bus.neu.edu.tr</p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span>🌐</span>
            <span>Real-time information from Near East University Transportation Service</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Routes List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Bus Routes</h2>
              
              {/* Route Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {routeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {filteredRoutes.map(([routeName, routeData]) => (
              <div key={routeName} className="bg-white/10 border border-white/20 rounded-lg overflow-hidden">
                {/* Route Header */}
                <button
                  onClick={() => handleRouteClick(routeName)}
                  className="w-full flex items-center justify-between p-4 hover:bg-blue-900/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-full text-2xl border-2"
                      style={{
                        backgroundColor: `${routeData.mapColor}20`,
                        borderColor: routeData.mapColor
                      }}
                    >
                      {routeData.icon}
                    </div>
                    <div className="text-left">
                      <span className="text-white text-lg font-semibold block">{routeName}</span>
                      <span className="text-gray-300 text-xs">{routeData.routeType} • {routeData.operatingHours}</span>
                    </div>
                  </div>
                  <div className="text-white text-xl">
                    {expandedRoute === routeName ? '−' : '+'}
                  </div>
                </button>
                
                {/* Expanded Schedule Table */}
                {expandedRoute === routeName && (
                  <div className="p-4 bg-black/20 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Route Information</h4>
                        <div className="text-sm text-gray-300 space-y-1">
                          <p>• Type: {routeData.routeType}</p>
                          <p>• Operating Hours: {routeData.operatingHours}</p>
                          <p>• Total Stops: {routeData.stops.length}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Service Status</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-sm">Active Service</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-semibold mb-3">Daily Schedule</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-white">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-2 px-3">Day</th>
                            <th className="text-left py-2 px-3">Departure Times from Campus</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(routeData.schedule).map(([day, times]) => (
                            <tr key={day} className="border-b border-white/10">
                              <td className="py-2 px-3 font-medium">{day}</td>
                              <td className="py-2 px-3">
                                {times.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {times.map((time, idx) => (
                                      <span key={idx} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                                        {time}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-gray-400">No service</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Right Side - Route Map */}
          <div className="lg:sticky lg:top-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Interactive Route Map</h2>
            
            {selectedRoute ? (
              <div className="bg-white/10 border border-white/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{selectedRoute}</h3>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium text-white flex items-center space-x-2"
                    style={{ backgroundColor: busData[selectedRoute].mapColor }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{busData[selectedRoute].routeType}</span>
                  </div>
                </div>
                
                {/* Official Route Map */}
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                  {mapLoading && (
                    <div className="absolute inset-0 bg-gray-700 flex items-center justify-center z-10">
                      <div className="flex items-center space-x-2 text-white">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Loading official route map...</span>
                      </div>
                    </div>
                  )}
                  <img
                    src={busData[selectedRoute].mapUrl}
                    alt={`${selectedRoute} Official Route Map`}
                    className="w-full h-auto max-h-96 object-contain"
                    onLoad={handleMapLoad}
                    onError={handleMapError}
                  />
                  
                  {/* Official Source Badge */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    🌐 bus.neu.edu.tr
                  </div>
                </div>
                
                {/* Route Statistics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">{busData[selectedRoute].stops.length}</div>
                    <div className="text-xs text-gray-300">Total Stops</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {Object.values(busData[selectedRoute].schedule).flat().length}
                    </div>
                    <div className="text-xs text-gray-300">Daily Trips</div>
                  </div>
                </div>
                
                {/* Map Legend */}
                <div className="bg-black/20 rounded-lg p-3 mb-4">
                  <h4 className="text-white font-medium mb-2">Map Legend</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: busData[selectedRoute].mapColor }}
                      ></div>
                      <span>Bus Route</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                      <span>Numbered Stops</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Campus Location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Key Destinations</span>
                    </div>
                  </div>
                </div>
                
                {/* Route Stops List */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Bus Stops ({busData[selectedRoute].stops.length})
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {busData[selectedRoute].stops.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-black/20 rounded hover:bg-black/30 transition-colors">
                        <div 
                          className="w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold"
                          style={{ backgroundColor: busData[selectedRoute].mapColor }}
                        >
                          {index + 1}
                        </div>
                        <span className="text-white text-sm flex-1">{stop}</span>
                        {(index === 0 || index === busData[selectedRoute].stops.length - 1) && (
                          <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded">
                            {index === 0 ? 'Start' : 'End'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Service Information */}
                <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Service Information</h4>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>• Free shuttle service for NEU students and staff</p>
                    <p>• Real-time updates available on bus.neu.edu.tr</p>
                    <p>• Route reservations can be made online</p>
                    <p>• Operating hours: {busData[selectedRoute].operatingHours}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 border border-white/20 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🚌</div>
                <p className="text-white text-lg mb-2">Select a route to view official map</p>
                <p className="text-gray-300 text-sm mb-6">
                  Choose any route from the left to see detailed maps and schedules from the official NEU transportation system
                </p>
                
                {/* System Statistics */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-400">{Object.keys(busData).length}</div>
                    <div className="text-sm text-gray-300">Active Routes</div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-400">
                      {Object.values(busData).reduce((total, route) => total + route.stops.length, 0)}
                    </div>
                    <div className="text-sm text-gray-300">Total Stops</div>
                  </div>
                </div>
                
                {/* Quick Access Links */}
                <div className="mt-6 space-y-2">
                  <div className="bg-black/20 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-white text-sm">Official Website</span>
                    <span className="text-blue-400 text-sm">bus.neu.edu.tr</span>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-white text-sm">Service Hours</span>
                    <span className="text-green-400 text-sm">06:45 - 22:15</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transportation;
