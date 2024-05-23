import { Clue } from "../lib/definitions";
import styles from '../ui/home.module.css';
import ImageComponent from "./image-component";
import { useState, useEffect } from "react";

export default function ClueChart({ clues }: { clues: Clue[] }) {

    const [visibleCells, setVisibleCells] = useState(Array(100).fill(true));

    useEffect(() => {
        let rounds = 0;
        const interval = setInterval(() => {
          setVisibleCells(prev => {
            const newVisibleCells = [...prev];
            let randomIndex;
            do {
              randomIndex = Math.floor(Math.random() * newVisibleCells.length);
            } while (!newVisibleCells[randomIndex]); 
    
            newVisibleCells[randomIndex] = false;
            return newVisibleCells;
          });
          rounds++;
          if (rounds >= 100) {
            clearInterval(interval);
          }
        }, 50); 
    
        return () => clearInterval(interval);
    }, []);

    return (
        <ul>
            {clues.map((clue: Clue) => (
                <li key={clue.id} className={styles.listClues}>
                    <div className={styles.clueContainer}>
                        <ImageComponent imageData={clue.image} />
                        <p className={styles.clueText}>{clue.text}</p>
                        <div className={styles.gridOverlay}>
                            {visibleCells.map((visible, index) => (
                                <div
                                    key={index}
                                    className={`${styles.gridCell} ${visible ? styles.visible : styles.hidden}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                  </li>
            ))}
        </ul>
    )
}