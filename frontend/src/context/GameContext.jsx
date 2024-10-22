import { createContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

export const GameContext = createContext();

const GameContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        backendUrl, token, setToken, navigate
    }

    return (
        <GameContext.Provider value={value}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContextProvider;