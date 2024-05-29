import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../lib/definitions';

interface PieceProps {
  x: number;
  y: number;
  type: string; 
  color: 'brown' | 'gray' | 'rainbow';

}

const Piece: React.FC<PieceProps> = ({ x, y, type, color }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PIECE,
    item: { x, y, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getPieceSymbol = (type: string) => {
    switch (type) {
      case 'knight':
        return '♘';
      case 'rook':
        return '♖';
      case 'bishop':
        return '♗';
      case 'queen':
        return '♕';
      case 'king':
        return '♔';
      case 'pawn':
        return '♙';
      default:
        return '?';
    }
  };

  const getColorStyle = (color: string) => {
    switch (color) {
      case 'brown':
        return { color: 'brown' };
      case 'gray':
        return { color: 'gray' };
      case 'rainbow':
        return {
          background: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        };
      default:
        return { color: 'black' };
    }
  };

  const colorStyle = getColorStyle(color);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 35,
        fontWeight: 'bold',
        cursor: 'move',
        textAlign: 'center',
        ...colorStyle
      }}
    >
      {getPieceSymbol(type)}
    </div>
  );
};

export default Piece;