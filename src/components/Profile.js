import React, { useRef } from 'react';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import ModalChangeImage from './ModalChangeImage';
import http from '../plugins/http';
import OneTopic from './OneTopic';
import OneCommentUser from './OneCommentUser';
import {FaCommentSlash, FaThList} from 'react-icons/fa'

const Profile = () => {
    const { getUser, setUser } = useContext(UserContext)
    const [getModal, setModal] = useState(false)
    const [getTopics, setTopics] = useState([])
    const [getAllTopics, setAllTopics] = useState([])
    const [getComments, setComments] = useState([])

    useEffect(() => {
        http.get("myTopics").then(res => {
            if (res.success) {
                setTopics(res.data)
                setComments(res.data2)
                setAllTopics(res.data3)
            } else {

            }
        })
        http.get("getUser").then(res => {
            if (res.success) {
                setUser(res.data)
                console.log(res.data, "user")
            } else {

            }
        })
    }, [])
    function displayDate(timestamp) {
        const date = new Date(timestamp);
        return (
            <div>{date.toLocaleDateString("lt-LT")} {date.toLocaleTimeString("lt-LT")}</div>
        )
    }
    function changeImage() {
        setModal(true)
    }
    return (
        <>
            {getUser && <div>
                <div className='user-container sm-column d-flex align-items-center justify-content-center'>
                    <div onClick={changeImage} className='user-image' style={{ backgroundImage: `url(${getUser.image})` }} >
                    </div>
                    <div className='user-info'>
                        <p className='my-1'> {getUser.username}</p>
                        <p className='my-1'>Registruotas nuo: {displayDate(getUser.registerTimestamp)}</p>
                        <p className='my-1'>Parašytų komentarų kiekis: {getUser.commentsAmount} </p>
                    </div>
                </div>
                {getModal && <ModalChangeImage setModal={setModal} getUser={getUser} setUser={setUser} />}
                <div className='p-3 d-flex flex-column align-items-center'>
                    <h6>Mano sukurtos temos:</h6>
                    {getTopics.length === 0 && <div className='d-flex flex-column align-items-center mt-2'><FaThList style={{fontSize: '60px'}}/>
                    <div>Temų neturite</div></div>}
                    {getTopics.length > 0 && getTopics.map((x, i) => <OneTopic key={i} topic={x} />)}
                </div>
                <div className='p-3 d-flex flex-column align-items-center'>
                    <h6>Mano komentarai:</h6>
                    {getComments.length === 0 && <div className='d-flex flex-column align-items-center mt-2'><FaCommentSlash style={{fontSize: '60px'}}/>
                    <div>Komentarų neturite</div></div>}
                    {getComments.length > 0 && getComments.map((x, i) => <OneCommentUser key={i} x={x} topics={getAllTopics} />)}
                </div>
            </div>}
        </>
    );
};

export default Profile;