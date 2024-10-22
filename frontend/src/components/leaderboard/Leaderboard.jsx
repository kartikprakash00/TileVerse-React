import React, { useContext, useEffect, useState } from 'react'
import './Leaderboard.css'
import { GameContext } from '../../context/GameContext'
import axios from 'axios';
import { toast } from 'react-toastify'

const Leaderboard = () => {

    const { backendUrl } = useContext(GameContext);
    const [leaderboard2048, setLeaderboard2048] = useState([]);
    const [leaderboard2187, setLeaderboard2187] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {

                const response2048 = await axios.get(backendUrl + '/api/user/leaderboard2048')
                const response2187 = await axios.get(backendUrl + '/api/user/leaderboard2187')

                if (response2048.data.success) {
                    setLeaderboard2048(response2048.data.leaderboard);
                }
                if (response2187.data.success) {
                    setLeaderboard2187(response2187.data.leaderboard);
                }


            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }

        fetchLeaderboard();

    }, [backendUrl])

    return (
        <div className='leaderboard'>
            <div id='leaderboardOverlay' className='leader-box'>
                <div className='leader-content'>
                    <h1>Leaderboard</h1>
                    <div className='leader-games'>
                        <div className='leader-game'>
                            <h2>2048</h2>
                            <ul>
                                {
                                    leaderboard2048.map((user, index) => (
                                        <li key={index}>{user.name}: <span>{user.highscore2048}</span></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='vl'></div>
                        <hr className='hrshow' />
                        <div className='leader-game'>
                            <h2>2187</h2>
                            <ul>
                                {
                                    leaderboard2187.map((user, index) => (
                                        <li key={index}>{user.name}: <span>{user.highscore2187}</span></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <button onClick={() => document.getElementById('leaderboardOverlay').style.display = 'none'}>Close</button>
                </div>
            </div>

        </div>
    )
}

export default Leaderboard
