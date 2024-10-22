import React, { useContext } from 'react'
import './Mode.css'
import game1 from '../../assets/2048.png'
import game2 from '../../assets/2187.png'
import { GameContext } from '../../context/GameContext'

const Mode = () => {

    const { navigate } = useContext(GameContext);

    return (
        <div className='mode'>
            <h1 className='title'>Choose Mode</h1>
            <hr className='hrline' />
            <div className="choose">
                <button onClick={() => navigate('/2048')}><img src={game1} alt="" />2048</button>
                <button onClick={() => navigate('/2187')}><img src={game2} alt="" />2187</button>
            </div>
        </div>
    )
}

export default Mode
