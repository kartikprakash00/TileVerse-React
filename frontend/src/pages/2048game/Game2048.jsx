import React, { useContext, useEffect, useState } from 'react'
import './Game2048.css'
import { GameContext } from '../../context/GameContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Game2048 = () => {
    const { token, backendUrl } = useContext(GameContext);
    const [board, setBoard] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const rows = 4;
    const columns = 4;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const updateHighScore = async (score) => {
        try {

            const userId = localStorage.getItem('userId');

            if (token) {
                const response = await axios.post(backendUrl + '/api/user/highscore2048', { userId, score }, { headers: { token } })

                if (response.data.success) {
                    console.log(response.data.highscore2048)
                } else {
                    console.log('Failed to update high score:', response.data.message);
                }
            } else {
                console.log('Token not found, cannot update score.');
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }

    const handleTouchMove = (e) => {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
    }

    const handleTouchEnd = () => {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50) {
                slideRight();
            } else if (deltaX < -50) {
                slideLeft();
            }
        } else {
            if (deltaY > 50) {
                slideDown()
            } else if (deltaY < -50) {
                slideUp();
            }
        }

        if (!canMove()) {
            setGameOver(true)
        }
    }

    useEffect(() => {
        setGame();
    }, [])

    useEffect(() => {

        const handleKeyPress = (e) => {

            if (gameOver) return;

            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
                e.preventDefault();
            }

            switch (e.code) {
                case 'ArrowLeft':
                    slideLeft();
                    break;
                case 'ArrowRight':
                    slideRight();
                    break;
                case 'ArrowUp':
                    slideUp()
                    break;
                case 'ArrowDown':
                    slideDown();
                    break;
                default:
                    break;
            }


            if (!canMove()) {
                setGameOver(true);
            }
        }

        window.addEventListener("keyup", handleKeyPress);
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("keyup", handleKeyPress);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        }
    }, [board, gameOver]);

    useEffect(() => {
        if (!canMove() && !hasEmptyTile(board)) {
            document.getElementById('gameOverOverlay').style.display = 'flex';
            setGameOver(true);
        }
    }, [board])

    useEffect(() => {
        if (gameOver) {
            updateHighScore(score);
        }
    }, [gameOver, score])


    const setGame = () => {
        let newBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        setTwo(newBoard);
        setBoard((prevBoard) => {
            const updateBoard = [...prevBoard.map(row => [...row])];
            setTwo(updateBoard);
            return updateBoard;
        })
    }

    const hasEmptyTile = (board) => {
        return board.flat().includes(0);
    }

    const setTwo = (board) => {
        if (!hasEmptyTile(board)) {
            return;
        }

        let found = false;
        while (!found) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * columns);

            if (board[r][c] === 0) {
                const newBoard = [...board.map(row => [...row])];
                newBoard[r][c] = 2;
                setBoard(newBoard);
                found = true;
            }
        }
    }

    const slide = (row) => {
        let merged = [];
        row = row.filter((num) => num !== 0);

        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1] && !merged.includes(i)) {
                row[i] *= 2;
                row[i + 1] = 0;
                merged.push(i);
                setScore((prev) => prev + row[i]);
            }
        }

        row = row.filter((num) => num !== 0);
        while (row.length < columns) {
            row.push(0);
        }

        return [...row];
    }

    const arraysEqual = (a, b) => {
        return a.length === b.length && a.every((row, rowIndex) => row.every((tile, colIndex) => tile === b[rowIndex][colIndex]));
    }

    const slideLeft = () => {
        const newBoard = board.map((row) => slide([...row]));
        if (!arraysEqual(newBoard, board)) {
            setBoard(newBoard);
            setTwo(newBoard);
        }
    }

    const slideRight = () => {
        const newBoard = board.map((row) => slide([...row].reverse()).reverse());  // Copy and reverse each row
        if (!arraysEqual(newBoard, board)) {
            setBoard(newBoard);  // Update state
            setTwo(newBoard);    // Now add a new tile
        }
    }

    const slideUp = () => {
        const newBoard = [];
        for (let c = 0; c < columns; c++) {
            let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
            const newCol = slide([...col]);
            for (let r = 0; r < rows; r++) {
                newBoard[r] = newBoard[r] || [];
                newBoard[r][c] = newCol[r];
            }
        }
        if (!arraysEqual(newBoard, board)) {
            setBoard(newBoard);
            setTwo(newBoard);
        }
    }

    const slideDown = () => {
        const newBoard = [];
        for (let c = 0; c < columns; c++) {
            let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
            const newCol = slide([...col].reverse()).reverse();
            for (let r = 0; r < rows; r++) {
                newBoard[r] = newBoard[r] || [];
                newBoard[r][c] = newCol[r];
            }
        }
        if (!arraysEqual(newBoard, board)) {
            setBoard(newBoard);
            setTwo(newBoard);
        }
    }


    const canMove = () => {

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (board[r][c] === 0 ||
                    (c < columns - 1 && board[r][c] === board[r][c + 1]) ||
                    (r < rows - 1 && board[r][c] === board[r + 1][c])) {
                    return true;
                }
            }
        }
        return false;
    }

    const restartGame = () => {
        setScore(0);
        setGame();
        document.getElementById('gameOverOverlay').style.display = 'none'
        setGameOver(false);
    }


    return (
        <div className='game'>
            <h1 className='game-2048'>2048</h1>
            <hr />
            <h2>Score: <span id='score'>{score}</span></h2>
            <div className='brd' id='board'>
                {board.map((row, r) => row.map((tile, c) => (
                    <div key={`${r}-${c}`} id={`${r}-${c}`} className={`tile ${tile !== 0 ? `x${tile}` : 'x0'}`} >
                        {tile !== 0 ? tile : ""}
                    </div>
                )))}
            </div>
            {(
                <div id='gameOverOverlay' className='overlay'>
                    <div className='overlay-content'>
                        <h1>Game Over!</h1>
                        <h2>Score: {score}</h2>
                        <button onClick={restartGame}>Restart</button>
                        <button onClick={() => (window.location.href = "/")}>Main Menu</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Game2048
