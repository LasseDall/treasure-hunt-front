import { useEffect, useState } from "react";
import { unlockCode } from '../lib/data';
import styles from '../ui/home.module.css';

export default function TextRiddle({ fetchData }: { fetchData: () => void }) {

    const [codeValue, setCodeValue] = useState('');
    const [codeAccepted, setCodeAccepted] = useState(false);
    
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
        if (codeAccepted) {
            fetchData();
        }
    }, [codeAccepted]);

    return (  
        <div>
            <input 
                type="text" 
                value={codeValue} 
                onChange={handleCodeChange} 
                placeholder="Enter code" 
            /><br />
            <button className={styles.button} onClick={() => handleUnlock()}>Svar</button>
        </div>
    )
}
