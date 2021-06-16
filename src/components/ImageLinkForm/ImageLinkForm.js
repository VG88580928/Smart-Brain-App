import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange,onPictureSubmit,onKeyboardSubmit }) => {
    return (
        <div>
            <p className='f3'>
              {'This Magic Brain will detect faces in your picture!'}
            </p>
            <div className='center'>
                <div className='center pa3 br4 shadow-2 wd'>
                    <input className='f4 pa2 center w-70' onChange={onInputChange} onKeyPress={onKeyboardSubmit}/>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib  bg-light-pink' 
                        onClick={onPictureSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;