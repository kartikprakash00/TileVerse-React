import React, { useContext } from 'react'
import './Home.css'
import { GameContext } from '../../context/GameContext'

const Home = () => {

    const { navigate } = useContext(GameContext)

    return (
        <div className='home'>
            <div className='home-content'>
                <div className='title'>
                    <h1>Welcome to TileVerse</h1>
                </div>
                <hr />
                <div className='start'>
                    <button onClick={() => navigate('/mode')}>Start Game</button>
                </div>
            </div>
        </div>
    )
}

export default Home
