import React from 'react';
import { validLink } from './Regex'

const OneComment = ({ x }) => {
    function validate() {
        if (validLink.test(x.text)) {
            console.log('radau!')
        } else {
            console.log("neee :/")
        }
    }
    function displayDate(timestamp) {
        const date = new Date(timestamp);
        return (
            <div>{date.toLocaleDateString("lt-LT")} {date.toLocaleTimeString("lt-LT")}</div>
        )
    }
    return (
        <div className='comment-container d-flex md-column '>
            <div className='flex1 user-box d-flex flex-column align-items-center'>
                <img src={x.imageUser} alt="" />
                <div> <b>{x.owner}</b></div>
                <div>Užsiregistravo: </div>
                <div>{displayDate(x.registeredUserTimestamp)}</div>
            </div>
            <div className='flex4 comment-box text-break'>
                {displayDate(x.createdTimestamp)}
                {x.text}
            </div>

            {/* <button onClick={validate}>Validate fdd</button> */}
        </div>
    );
};

export default OneComment;
