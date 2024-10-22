import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify';
import { GameContext } from '../../context/GameContext';
import axios from 'axios';

const Login = () => {

    const [currentState, setCurrentState] = useState('Login');
    const { token, setToken, navigate, backendUrl } = useContext(GameContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {

            if (currentState === 'Register') {
                if (password !== confirmPassword) {
                    toast.error('Passwords do not match!');
                    return;
                }
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('userId', response.data.userId);
                }
                else {
                    toast.error(response.data.message)
                }
            }
            else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password })
                console.log(response.data)
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                    const userId = response.data.userId;
                    console.log('Logged in successfully, userId:', userId);
                    localStorage.setItem('userId', userId);
                }
                else {
                    toast.error(response.data.message)
                }
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <div className='login'>
            <div className='login-box'>
                <form onSubmit={onSubmitHandler}>
                    <div className='title-state'>
                        <h1>{currentState}</h1>
                        <hr />
                    </div>
                    {currentState === 'Login' ? '' :
                        <div className='input-box'>
                            <span className='icon'><ion-icon name="person"></ion-icon></span>
                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" required />
                            <label>Full Name</label>
                        </div>}
                    <div className='input-box'>
                        <span className='icon'><ion-icon name="mail"></ion-icon></span>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />
                        <label>Password</label>
                    </div>
                    {currentState === 'Login' ? '' :
                        <div className="input-box">
                            <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" required />
                            <label>Confirm Password</label>
                        </div>
                    }
                    {currentState === 'Login' ?
                        <div className="remember">
                            <label><input type="checkbox" />Remember me</label>
                            <p>Forgot Password?</p>
                        </div> :
                        <div className="remember">
                            <label><input type="checkbox" required />Agree to the Terms & Conditions</label>
                        </div>
                    }
                    <button>{currentState === 'Login' ? 'Login' : 'Register'}</button>
                    {currentState === 'Login' ?
                        <div className='register'>
                            <p>Don't have an account? <span onClick={() => setCurrentState('Register')}>Register</span></p>
                        </div> :
                        <div className='register'>
                            <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login</span></p>
                        </div>
                    }

                </form>
            </div>
        </div>
    )
}

export default Login
