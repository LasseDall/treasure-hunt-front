import { Clue } from "../lib/definitions";
import styles from '../ui/home.module.css';
import ImageComponent from "./image-component";

export default function ClueChart({ clues }: { clues: Clue[] }) {

    return (
        <ul>
            {clues.map((clue: Clue) => (
                <li key={clue.id} className={styles.listNews}>
                    <ImageComponent imageData={clue.image} />
                    <div className={styles.articleContainer}>
                        <p>{clue.text}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}
