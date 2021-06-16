import React from 'react';


const Rank = ({ loadUser }) => {
    return (
        <div>
            <div className='f3 b'>
                {`${loadUser.name}, your current entry count is ...`}
            </div>
            <div className='f1 b'>
                {`${loadUser.entries}`}
            </div>
        </div>
    )
}

export default Rank;