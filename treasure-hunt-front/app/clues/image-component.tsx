import { useEffect, useState } from 'react';
import styles from '@/app/ui/home.module.css';

export default function ImageComponent({ imageData }: { imageData: string; }) {
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      if (imageData) {
        const url = `data:image/jpeg;base64,${imageData}`;
        setImageUrl(url);
      }
    }, [imageData]);
  
    return (
      <div className={styles.clueImage}>
        {imageUrl && <img src={imageUrl} alt="image" />}
      </div>
    );
  }