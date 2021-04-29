import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const Landing = props => {

    return (
        <Fragment>
            <div className='landing'>
                <Link to='/onboarding'>
                    <button className='btn-start' onClick={() => console.log('clicked')}>Start Game </button>
                </Link>
            </div>
        </Fragment>
    )
}

export default Landing;
