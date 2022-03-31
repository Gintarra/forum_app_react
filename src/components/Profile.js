import React, { useRef } from 'react';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import ModalChangeImage from './ModalChangeImage';
import http from '../plugins/http';
import OneTopic from './OneTopic';

const Profile = () => {
    const { getUser, setUser } = useContext(UserContext)
    const [getModal, setModal] = useState(false)
    const [getTopics, setTopics] = useState([])

    useEffect(() => {
        http.get("myTopics").then(res => {
            if (res.success) {
                setTopics(res.data)
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
                    <div>
                        <h4> {getUser.username}</h4>
                        <h5>Registruotas nuo: {displayDate(getUser.registerTimestamp)}</h5>
                        <h5>Parašytų komentarų kiekis: {getUser.commentsAmount} </h5>
                    </div>
                </div>
                {getModal && <ModalChangeImage setModal={setModal} getUser={getUser} setUser={setUser}/>}
         <div>Mano sukurtos temos:</div>
           {getTopics.length > 0 && getTopics.map((x,i) => <OneTopic key={i} topic={x}/>)}
           <div>Mano komentarai</div>
            </div>}
        </>
    );
};

export default Profile;