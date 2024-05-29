'use client'

import { useState, useEffect } from 'react';
import { getClues, logout } from '../lib/data';
import { ToastContainer } from 'react-toastify';
import { Clue } from '../lib/definitions';
import Popup from './popup';
import 'leaflet/dist/leaflet.css';
import styles from '../ui/home.module.css';

export default function CluePage() {

    const [clues, setClues] = useState<Clue[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [componentName, setComponentName] = useState('');

    const handleOpenPopup = (component: string) => {
      setComponentName(component);
      setIsPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setIsPopupOpen(false);
      setComponentName('');
    };

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
        <main className={styles.body}>
            <ToastContainer />
            <button className={`${styles.buttonImage} ${styles.button1}`} onClick={() => handleOpenPopup("chess-board")}>
                <img src="/assets/chess.png" alt="Button 1" />
            </button>
            <button className={`${styles.buttonImage} ${styles.button2}`} onClick={() => handleOpenPopup("map")}>
                <img src="/assets/map.png" alt="Button 2" />
            </button>
            <button className={`${styles.buttonImage} ${styles.button3}`} onClick={() => handleOpenPopup("text-riddle")}>
                <img src="/assets/stickies.png" alt="Button 3" />
            </button>
            <button className={`${styles.buttonImage} ${styles.button4}`} onClick={() => handleOpenPopup("grid-chart")}>
                <img src="/assets/quilt.png" alt="Button 4" />
            </button>
            <button className={`${styles.buttonImage} ${styles.button5}`} onClick={() => logout()}>
                <img src="/assets/exit.png" alt="Button 5" />
            </button>
            <button className={`${styles.buttonImage} ${styles.button6}`} onClick={() => handleOpenPopup("clue-chart")}>
                <img src="/assets/magnifying-glass.png" alt="Button 6" />
            </button>
            <button className={`${styles.buttonImage} ${styles.button7}`} onClick={() => handleOpenPopup("notes")}>
                <img src="/assets/memo.png" alt="Button 6" />
            </button>

            <Popup isOpen={isPopupOpen} onClose={handleClosePopup} componentName={componentName} clues={clues} fetchData={fetchData} />
        </main>
    );
}