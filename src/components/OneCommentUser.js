import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OneCommentUser = ({ x, topics }) => {
    const nav = useNavigate()
    function displayDate(timestamp) {
        const date = new Date(timestamp);
        return (
            <div>{date.toLocaleDateString("lt-LT")} {date.toLocaleTimeString("lt-LT")}</div>
        )
    }
    function getTopic() {
      let topInd =  topics.find(y => y._id === x.topicID)
        return <p>{topInd.title}</p>
    }
    function goToSinglePage(){
        nav('/tema/' + x.topicID)
    }
    return (
        <div className='user-comment-container d-flex'>
            <div className='comment-box text-break'>
               <div className='link-topic' onClick={goToSinglePage}><b>Tema:{getTopic()}</b> </div> 
                {displayDate(x.createdTimestamp)}
                {x.text}
            </div>

            {/* <button onClick={validate}>Validate fdd</button> */}
        </div>
    );
};

export default OneCommentUser;