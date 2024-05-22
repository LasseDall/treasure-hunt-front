import styles from '../ui/home.module.css';
import { useState, MouseEvent } from "react";

export default function GridChart() {

    const [visibleCells, setVisibleCells] = useState(Array(49).fill(false));

    const handleMouseOver = (index: number) => {
        setVisibleCells(prevCells => {
            const updatedCells = [...prevCells];
            updatedCells[index] = true; 
            return updatedCells;
        });
    };
   
    return (
        <div className={styles.gridDiv}>
        <div className={styles.gridContainer}>
                {visibleCells.map((visible, index) => (
                    <div
                    key={index}
                    className={`${styles.cell} ${visible ? styles.green : styles.transparent}`}
                    onMouseOver={() => {
                        handleMouseOver(index);
                    }} 
                ></div>
                ))}
        </div>
        <button className={styles.button} onClick={() => setVisibleCells(Array(49).fill(false))}>Reset</button>
        </div>
    )
}