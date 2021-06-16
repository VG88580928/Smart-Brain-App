import React from 'react';
import Tilty from 'react-tilty'
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilty className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner pa3">
            <img src={brain} alt='logo'/>
            </div>
            </Tilty>
        </div>
    )
}

export default Logo;