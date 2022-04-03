import React from 'react';
import { validLink } from './Regex'
import { validImg } from './RegexImg';
import Video from './Video';

const OneComment = ({ x }) => {
    function validate(text) {
        let link = ''
        let imgLink = ''
        let str = text.split(' ');
        str.map(x => validLink.test(x) ? link = x : null)
        str.map(x => validImg.test(x) ? imgLink = x : null)
        let newText = text.replace(link, '').replace(imgLink, '')
        let url = link.replace("watch?v=", "embed/");
        return <div className='md-flex md-column md-align-center'>{newText} <div>{imgLink !== '' && <img src={imgLink} alt='' />}</div> <div><a href={link}>{link}</a></div>  <div className='md-flex md-j-center md-align-center'> {url !== '' && <Video videoLink={url} />} </div> </div>

    }
    function displayDate(timestamp) {
        const date = new Date(timestamp);
        return (
            <div>{date.toLocaleDateString("lt-LT")} {date.toLocaleTimeString("lt-LT")}</div>
        )
    }
    return (
        <div className='comment-container d-flex md-column '>
            <div className='flex1 user-box d-flex flex-column align-items-center justify-content-center'>
                <img src={x.imageUser} alt="" />
                <div> <b>{x.owner}</b></div>
                <div>Užsiregistravo: </div>
                <div>{displayDate(x.registeredUserTimestamp)}</div>
            </div>
            <div className='flex4 comment-box text-break'>
                {displayDate(x.createdTimestamp)}
                {validate(x.text)}
            </div>
        </div>
    );
};

export default OneComment;
