import styles from '../ui/home.module.css';
import { useEffect, useState } from "react";
import { unlockCode } from '../lib/data';

export default function GridChart({ fetchData }: { fetchData: () => void }) {

    const [visibleCells, setVisibleCells] = useState(Array(49).fill(false));
    const [cellCode, setCellCode] = useState<number[]>([]);
    const [codeAccepted, setCodeAccepted] = useState(false);

    const handleMouseOver = (index: number) => {
        setVisibleCells(prevCells => {
            const updatedCells = [...prevCells];
            updatedCells[index] = true;
            setCellCode(prevCodes => {
                if (!prevCodes.includes(index)) {
                  return [...prevCodes, index];
                }
                return prevCodes;
            });          
            return updatedCells;
        });
    };

    useEffect(() => {
        if (codeAccepted) {
            fetchData();
        }
    }, [codeAccepted]);



    const reset = () => {
        setVisibleCells(Array(49).fill(false));
        setCellCode([]);
    }
   
    return (
        <div className={styles.gridDiv}>
        <div className={styles.gridContainer} onMouseLeave={async () => setCodeAccepted(await unlockCode('grids', cellCode.join('')))}>
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
        <button className={styles.button} onClick={() => reset()}>Nulstil</button>
        </div>
    )
}