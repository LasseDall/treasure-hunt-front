import React, { lazy, Suspense } from 'react';
import styles from '../ui/home.module.css';
import { Clue } from '../lib/definitions';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  componentName: string;
  clues?: Clue[]; 
  fetchData: () => void 
}

export default function Popup({ isOpen, onClose, componentName, clues, fetchData }: PopupProps) {
  if (!isOpen) {
    return null;
  }

  const ComponentToRender = lazy(() => import(`./${componentName}`));

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>
          <Suspense fallback={<div>Loading...</div>}>
            {componentName === 'clue-chart' ? <ComponentToRender clues={clues} fetchData={fetchData} /> : <ComponentToRender fetchData={fetchData} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};