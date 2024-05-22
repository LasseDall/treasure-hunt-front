'use client'

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../ui/home.module.css';

interface Pin {
  lat: number;
  lng: number;
}

const greenIcon = L.icon({
  iconUrl: '/map-needle.png', 
  iconSize: [35, 70],
  iconAnchor: [22, 75], 
  popupAnchor: [5, -68] 
});

export default function Map() {
  const [pins, setPins] = useState<Pin[]>([]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPins(prevPins => [...prevPins, { lat, lng }]);
        console.log(lat);
        console.log(lng);
      }
    });
    return null;
  };

  const removePin = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPins(prevPins => prevPins.filter((_, i) => i !== index));
  };

  return (
    <MapContainer className={styles.map} center={[56.2, 11.2]} zoom={7.2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pins.map((pin, index) => (
        <Marker key={index} position={[pin.lat, pin.lng]} icon={greenIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            <button onClick={(event) => removePin(index, event)}>Remove Pin</button>
          </Popup>
        </Marker>
      ))}
      <MapEvents />
    </MapContainer>
  );
};