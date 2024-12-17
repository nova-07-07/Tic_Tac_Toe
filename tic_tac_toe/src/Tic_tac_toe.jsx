import { useState } from 'react';
import './App.css';
import Size from './Size';
import Box from './Box';

function TicTacToe() {
  const [symbol, setSymbol] = useState('X'); 
  const [size, BoardSize] = useState('');
  const [boxDisplay, setBoxDisplay] = useState(false);
  const [ReLoad_Count, setcount] = useState(0);

  function switchPlayer() {
    setSymbol(symbol === 'X' ? 'O' : 'X');
  }

  function setSize(size) {
    BoardSize(size);
    setBoxDisplay(true);
  }

  function reload() {
    setSymbol('X');
    setcount(ReLoad_Count + 1);
  }

  return (
    <>
      {boxDisplay ? (
        <>
          <div className="head_div">
            <center>
            <h1 className="current_player">Current player: {symbol} <span className="Reset" onClick={reload}>
              <b>Reset</b>
            </span></h1>
            </center>
          </div>
          <center>
            <Box size={size} ReLoad_Count={ReLoad_Count} symbol={symbol} switchPlayer={switchPlayer}/>
          </center>
        </>
      ) : (
        <Size setSize={setSize} />
      )}
    </>
  );
}

export default TicTacToe;
