import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Piece from './chess-piece'
import BoardSquare from './board-square';
import { useState } from 'react';
import styles from '../ui/home.module.css';
import { unlockCode } from '../lib/data';

export default function Chessboard({ fetchData }: { fetchData: () => void }) {
    const [pieces, setPieces] = useState<{ x: number; y: number; type: string; color: 'brown' | 'gray' | 'rainbow' }[]>([
        { x: 0, y: 0, type: 'rook', color: 'brown' },
        { x: 1, y: 0, type: 'knight', color: 'gray' },
        { x: 2, y: 0, type: 'bishop', color: 'rainbow' },
        { x: 3, y: 0, type: 'queen', color: 'brown' },
        { x: 4, y: 0, type: 'king', color: 'gray' },
        { x: 5, y: 0, type: 'bishop', color: 'rainbow' },
        { x: 6, y: 0, type: 'knight', color: 'brown' },
        { x: 7, y: 0, type: 'rook', color: 'gray' },
        { x: 0, y: 1, type: 'pawn', color: 'rainbow' },
        { x: 1, y: 1, type: 'pawn', color: 'brown' },
        { x: 2, y: 1, type: 'pawn', color: 'gray' },
        { x: 3, y: 1, type: 'pawn', color: 'rainbow' },
        { x: 4, y: 1, type: 'pawn', color: 'brown' },
        { x: 5, y: 1, type: 'pawn', color: 'gray' },
        { x: 6, y: 1, type: 'pawn', color: 'rainbow' },
        { x: 7, y: 1, type: 'pawn', color: 'brown' },
      ]);

      const [chessCode, setChessCode] = useState<string[]>([]);
      const [codeAccepted, setCodeAccepted] = useState(false);

      useEffect(() => {
        if (codeAccepted) {
            fetchData();
        }
      }, [codeAccepted]);

      const handleUnlock = async () => {
        const accepted = await unlockCode("chess", chessCode.join(''));
        if (accepted === true) {
            setCodeAccepted(true);
        }
      }

      function reset() {
        setPieces([
          { x: 0, y: 0, type: 'rook', color: 'brown' },
          { x: 1, y: 0, type: 'knight', color: 'gray' },
          { x: 2, y: 0, type: 'bishop', color: 'rainbow' },
          { x: 3, y: 0, type: 'queen', color: 'brown' },
          { x: 4, y: 0, type: 'king', color: 'gray' },
          { x: 5, y: 0, type: 'bishop', color: 'rainbow' },
          { x: 6, y: 0, type: 'knight', color: 'brown' },
          { x: 7, y: 0, type: 'rook', color: 'gray' },
          { x: 0, y: 1, type: 'pawn', color: 'rainbow' },
          { x: 1, y: 1, type: 'pawn', color: 'brown' },
          { x: 2, y: 1, type: 'pawn', color: 'gray' },
          { x: 3, y: 1, type: 'pawn', color: 'rainbow' },
          { x: 4, y: 1, type: 'pawn', color: 'brown' },
          { x: 5, y: 1, type: 'pawn', color: 'gray' },
          { x: 6, y: 1, type: 'pawn', color: 'rainbow' },
          { x: 7, y: 1, type: 'pawn', color: 'brown' },
        ]);
        setChessCode([]);
      }

      const handleDrop = (startX: number, startY: number, endX: number, endY: number) => {
        const codeString = `${startX}${startY}${endX}${endY}`;
        setChessCode(prevCodes => {
          if (!prevCodes.includes(codeString)) {
            return [...prevCodes, codeString];
          }
          return prevCodes;
        });          
        setPieces(prevPieces =>
            prevPieces.map(piece =>
                piece.x === startX && piece.y === startY ? { ...piece, x: endX, y: endY } : piece
            )
        );
      };
    
      const renderSquare = (i: number) => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        return (
          <div key={i} className={styles.square}>
            <BoardSquare x={x} y={y} onDrop={(endX, endY) => handleDrop(endX, endY, x, y)}>
              {renderPiece(x, y)}
            </BoardSquare>
          </div>
        );
      };
    
      const renderPiece = (x: number, y: number) => {
        const piece = pieces.find(p => p.x === x && p.y === y);
        if (piece) {
          return <Piece type={piece.type} x={x} y={y} color={piece.color} />;
        }
        return null;
      };
    
      const squares = [];
      for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i));
      }
    
      return (
        <DndProvider backend={HTML5Backend}>
          <div className={styles.gridDiv}>
          <div className={styles.chessBoard}>
            {squares}
          </div>
          <div className={styles.buttonDiv}>
          <button className={styles.button} onClick={() => reset()}>Nulstil</button>
          <button className={styles.button} onClick={() => handleUnlock()}>Prøv</button>
          </div>
          </div>
        </DndProvider>
      );
};
    