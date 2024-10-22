import React from 'react'
import './Footer.css'
import github_icon from '../../assets/github_icon.png'
import linkedin_icon from '../../assets/linkedin_icon.png'
import portfolio_icon from '../../assets/site_logo.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-box'>
                <div className="footer-top">
                    <div className="footer-top-left">
                        <div className="footer-logo">
                            <h2>TileVerse</h2>
                        </div>
                        <div className="footer-para">
                            <p>TileVerse is a modern take on the classic 2048 puzzle game. Merge tiles with the same number to reach the ultimate 2048 tile!
                                It also has a new game mode 2187. Plan your moves carefully, think ahead, and challenge your mind in this addictive number-matching experience.
                            </p>
                        </div>
                    </div>
                    <div className="footer-top-right">
                        <h2>Connect</h2>
                        <div className='logos'>
                            <img src={github_icon} alt="" />
                            <img src={linkedin_icon} alt="" />
                            <img src={portfolio_icon} alt="" />
                        </div>
                    </div>
                </div>
                <hr className='line' />
                <div className="footer-bottom">
                    <p>© Made by <span onClick={() => window.location.href = ''}>Kartik Prakash</span></p>
                </div>
            </div>
        </div>
    )
}

export default Footer
