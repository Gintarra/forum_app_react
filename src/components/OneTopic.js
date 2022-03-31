import React from 'react';
import { useNavigate } from 'react-router-dom';
import {GrFavorite} from 'react-icons/gr'

const OneTopic = ({ topic }) => {
    const nav = useNavigate()
    function goToSinglePage(x) {
        nav('/tema/' + x._id)
    }
    return (
        <div className='topic-card d-flex align-items-center'>
            <div onClick={() => goToSinglePage(topic)} className='flex4'><b>{topic.title}</b> by {topic.owner}</div>
            <div className='flex1  text-center'>34</div>
            <div className='flex2  text-center'>last post</div>
            <GrFavorite/>
        </div>
    );
};

export default OneTopic;