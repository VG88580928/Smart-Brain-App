import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, boxes }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='image' src={ imageURL } alt='' width='500px' height='auto'/>
                {
                    boxes.map((boxRegion, i) => {
                        return (
                            <div 
                            className='bounding-box' 
                            key={i}
                            style={{top:boxRegion.toprow, right:boxRegion.rightcol, bottom:boxRegion.bottomrow, left:boxRegion.leftcol }}>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;

