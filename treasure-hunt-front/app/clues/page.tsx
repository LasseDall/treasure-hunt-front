'use client'

import { useState, useEffect } from 'react';
import { getClues } from '../lib/data';
import { ToastContainer } from 'react-toastify';
import { Clue } from '../lib/definitions';
import ClueChart from './clue-chart';
import GridChart from './grid-chart';
import Map from './map';
import Chessboard from './chess-board';
import 'leaflet/dist/leaflet.css';

export default function CluePage() {

    const [clues, setClues] = useState<Clue[]>([]);

    useEffect(() => {    
        fetchData();
    }, []);
    
    const fetchData = async () => {
        const clues: Clue[] | undefined = await getClues();
        if (clues) {
            setClues(clues);
        }
    }

    return (
        <main>
            <ToastContainer />
            <ClueChart clues={clues} />
            <GridChart fetchData={fetchData}/>
            <Map />
            <Chessboard />
        </main>
    );
}