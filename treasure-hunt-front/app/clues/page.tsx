'use client'

import { useState, useEffect, ChangeEventHandler } from 'react';
import { getClues } from '../lib/data';
import { ToastContainer } from 'react-toastify';
import { Clue } from '../lib/definitions';
import ClueChart from './clue-chart';
import GridChart from './grid-chart';
import Map from './map';
import Chessboard from './chess-board';
import 'leaflet/dist/leaflet.css';
import { unlockCode } from '../lib/data';
import styles from '../ui/home.module.css';

export default function CluePage() {

    const [clues, setClues] = useState<Clue[]>([]);
    const [codeValue, setCodeValue] = useState('');
    const [codeAccepted, setCodeAccepted] = useState(false);

    useEffect(() => {
        if (codeAccepted) {
            fetchData();
        }
      }, [codeAccepted]);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodeValue(e.target.value);
    };

    const handleUnlock = async () => {
        const accepted = await unlockCode("første", codeValue);
        if (accepted === true) {
            setCodeAccepted(true);
        }
    }

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (!username) {
            window.location.href = '/login';
        } else {
            fetchData();
        }
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
            <Map fetchData={fetchData}/>
            <Chessboard fetchData={fetchData}/>
            <div>
                <input 
                    type="text" 
                    value={codeValue} 
                    onChange={handleCodeChange} 
                    placeholder="Enter code" 
                /><br />
                <button className={styles.button} onClick={() => handleUnlock()}>Svar</button>
            </div>
        </main>
    );
}