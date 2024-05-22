import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../lib/definitions';

interface BoardSquareProps {
    x: number;
    y: number;
    onDrop: (x: number, y: number) => void;
    children: React.ReactNode;
  }
  
  const BoardSquare: React.FC<BoardSquareProps> = ({ x, y, onDrop, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.PIECE,
      drop: (item: { x: number; y: number; type: string }) => {
        onDrop(item.x, item.y); // Kald onDrop med x og y koordinater
        return { x, y }; // Returner et objekt som drop result
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    const black = (x + y) % 2 === 1;
    const backgroundColor = black ? 'black' : 'white';
  
    return (
      <div
        ref={drop}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor,
        }}
      >
        {children}
      </div>
    );
  };
  
  export default BoardSquare;