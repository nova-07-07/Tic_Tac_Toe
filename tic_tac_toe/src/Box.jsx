import { useState, useEffect } from "react";
import './App.css';

function Box({ size, ReLoad_Count, symbol, switchPlayer }) {
    const [Board, SetBoard] = useState([]);
    const [reload_count, set_reload_count] = useState(-1);
    const [win, setWin] = useState(false);
    const [tie, setTie] = useState(false);

    useEffect(() => {
        if (reload_count < ReLoad_Count) {
            set_reload_count(ReLoad_Count);
            initializeBoard();
        }
    }, [ReLoad_Count]);

    function initializeBoard() { 
        let temp1 = []; 
        let temp2 = []; 
        for (let index = 0; index < size; index++) { 
            temp1.push(' '); 
        } 
        for (let index = 0; index < size; index++) { 
            temp2.push([...temp1]); 
        } 
        SetBoard(temp2);
        setWin(false);
    }

    function handleClick(i, j) {
        if (Board[i][j] === ' ' && !win) {
            const newBoard = Board.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                    rowIndex === i && colIndex === j ? symbol : cell
                )
            );
            SetBoard(newBoard);
            if (checkWin(newBoard, i, j)) {
                setWin(true);
            } else {
                switchPlayer();
            }
        }
    }

    function checkWin(board, i, j) {
        const directions = [
            [1, 1], [1, -1], [-1, -1], [-1, 1],
            [0, 1], [0, -1], [1, 0], [-1, 0]   
        ];
        const currentSymbol = board[i][j];

        for (let [dx, dy] of directions) {
            let count = 1;
            for (let step = 1; step < 2; step++) {
                const x = i + step * dx;
                const y = j + step * dy;
                if (x >= 0  && y >= 0 && x < board.length && y < board[0].length && board[x][y] === currentSymbol) {
                    count++;
                } else {
                    break;
                }
            }

            for (let step = 1; step < 2; step++) {
                const x = i - step * dx;
                const y = j - step * dy;
                if (x >= 0 && y >= 0 && x < board.length  && y < board[0].length && board[x][y] === currentSymbol) {
                    count++;
                } else {
                    break;
                }
            }

            if (count >= 3) {
                return true;
            }
        }

        return false;
    }
    
    return (
        <>
            <div className="board">
                {Board.map((row, i) => (
                    <div key={i} className="board-row">
                        {row.map((cell, j) => (
                            <button
                                key={j}
                                className="btns"
                                onClick={() => handleClick(i, j)}
                            >
                                {cell}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            {win && <h2>Player {symbol} Wins!</h2>}
            {tie && <h2>It tie</h2>}
        </>
    );
}

export default Box;
