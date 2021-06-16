import React from 'react';

const Navigation = ({ onRouteChange, isSignIn }) => {
    return (
        isSignIn === 'home'
        ?  
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim pa3 black underline pointer'>Sign Out</p>
        </nav>
        :  
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim pa3 black underline pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim pa3 black underline pointer'>Register</p>
        </nav>

    )
}

export default Navigation;