import React, { useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { GameContext } from '../../context/GameContext'
import Leaderboard from '../leaderboard/Leaderboard'
import Instructions from '../instructions/Instructions'
import menu_open from '../../assets/menu_open.svg'
import menu_close from '../../assets/menu_close.svg'

const Navbar = () => {

    const { navigate, token, setToken } = useContext(GameContext);
    const menuRef = useRef();

    const openMenu = () => {
        menuRef.current.style.right = "0";
    }

    const closeMenu = () => {
        menuRef.current.style.right = "-300px";
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setToken('')
        navigate('/login')
    }

    return (
        <div>
            <div className='navbar'>
                <div className='nav-title' onClick={() => window.location.href = "/"}>
                    <h1>TileVerse</h1>
                </div>
                <img onClick={openMenu} className='nav-mob-open' src={menu_open} alt="" />

                <div ref={menuRef} className='nav-right'>
                    <ul className='nav-list'>
                        <img onClick={closeMenu} className='nav-mob-close' src={menu_close} alt="" />
                        <NavLink to='/' className='nav-link'><li>Home</li></NavLink>
                        <li><a onClick={() => document.getElementById("instructionOverlay").style.display = "flex"}>How to Play</a></li>
                        <li><a onClick={() => document.getElementById('leaderboardOverlay').style.display = 'flex'}>Leaderboard</a></li>
                    </ul>
                    <button onClick={() => token ? logout() : navigate('/login')} className='nav-button'>{token ? 'Logout' : 'Login'}</button>
                </div>
            </div>
            <div className="instruction-container">
                <Instructions />
            </div>

            <div className='leaderboard'>
                <Leaderboard />
            </div>
        </div>
    )
}

export default Navbar
