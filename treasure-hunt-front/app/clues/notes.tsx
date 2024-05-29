import { useEffect, useState } from "react";
import styles from '../ui/home.module.css';
import { getNotes, updateNotes } from '../lib/data';

export default function Notes() {

    const [notes, setNotes] = useState('');

    useEffect(() => {
       fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const notes = await getNotes();
        if (notes) {
            setNotes(notes);
        }
    }

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    function handleSaveNotes() {
        updateNotes(notes);
    }

    return (
        <div className={styles.gridDiv}>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            rows={15} 
            cols={110}
            className={styles.largeTextarea}
          /><br />
          <button className={styles.button} onClick={handleSaveNotes}>Save Notes</button>
        </div>
      );
}
