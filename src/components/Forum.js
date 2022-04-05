import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import http from '../plugins/http';
import Loader from './Loader';
import ModalTopic from './ModalTopic';
import OneTopic from './OneTopic';

const Forum = () => {
    const { getUser } = useContext(UserContext)
    const [getModal, setModal] = useState(false)
    const [getLoader, setLoader] = useState(true)
    const [getTopics, setTopics] = useState([])
    useEffect(() => {
        http.get("allTopics").then(res => {
            if (res.success) {
                setTopics(res.data)
                setLoader(false)
            } else {

            }
        })
    }, [getModal])

    return (
        <div className='d-flex flex-column p-4 forum-box '>
            {getModal && <ModalTopic setModal={setModal} />}
            {getUser && <button className='btn-modal align-self-end' onClick={() => setModal(true)}>Sukurti naują temą</button>}
            <div className='d-flex align-items-center flex-column'>
                {getTopics.length !== 0 && <div className='d-flex text-center p-3 title sm-column'>
                    <div className='flex4'><b>Temos pavadinimas</b></div>
                    <div className='flex1'>Žinučių kiekis</div>
                    <div className='flex2'>Paskutinis postas</div>
                </div>}
                {getLoader && <Loader />}
                {getTopics.length === 0 && !getLoader && <div className='my-3'>Temų dar nėra, sukurkite naują</div>}
                {getTopics.length > 0 && getTopics.map((x, i) => <OneTopic key={i} topic={x} />)}
            </div>
        </div>
    );
};

export default Forum;