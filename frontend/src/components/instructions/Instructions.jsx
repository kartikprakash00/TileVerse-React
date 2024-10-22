import React from 'react'
import './Instructions.css'

const Instructions = () => {
    return (
        <div className='nav-overlay'>
            <div id="instructionOverlay" className="instruction-Overlay">
                <div className="instruction-content">
                    <h1>TileVerse</h1>
                    <h2>How to Play!</h2>
                    <ul className="instruction">
                        <li>Use your arrow keys or swipe to move the tiles up, down, left or right.</li>
                        <li>When two tiles with the same number touch, they merge into one and multiply.</li>
                        <li>Gain points and increase your score by merging tiles.</li>
                        <li>The more tiles you merge, the higher your score will be.</li>
                    </ul>
                    <button onClick={() => document.getElementById("instructionOverlay").style.display = "none"}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Instructions
