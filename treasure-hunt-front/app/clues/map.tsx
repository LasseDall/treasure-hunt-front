'use client'

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../ui/home.module.css';
import { unlockCode } from '../lib/data';

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
  const [pinCode, setPinCode] = useState<string[]>([]);
  const [codeAccepted, setCodeAccepted] = useState(false);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPins(prevPins => [...prevPins, { lat, lng }]);
        
        const latLngString = `${lat.toFixed(1)}${lng.toFixed(1)}`;
        
        setPinCode(prevCodes => {
          if (!prevCodes.includes(latLngString)) {
            return [...prevCodes, latLngString];
          }
          return prevCodes;
        });
      }
    });
    return null;
  };

  const removePin = (index: number, event: React.MouseEvent<HTMLButtonElement>, lat: number, lng: number) => {
    event.stopPropagation();
    setPins(prevPins => prevPins.filter((_, i) => i !== index));
    setPinCode(prevCodes => prevCodes.filter(code => code !== `${lat.toFixed(1)}${lng.toFixed(1)}`));
  };

  return (
    <div>
    <MapContainer className={styles.map} center={[56.2, 11.2]} zoom={7.2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pins.map((pin, index) => (
        <Marker key={index} position={[pin.lat, pin.lng]} icon={greenIcon}>
          <Popup>
            <p>Spændende valg...</p>
            <p>Koordinaterne for dette sted er: {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}</p>
            <button className={styles.button} onClick={(event) => removePin(index, event, pin.lat, pin.lng)}>Fjern markering</button>
          </Popup>
        </Marker>
      ))}
      <MapEvents />
    </MapContainer>
    <button className={styles.button} onClick={() => unlockCode("map", pinCode.join(''))}>Prøv svar</button>
    </div>
  );
};