import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import http from '../plugins/http';
import ModalTopic from './ModalTopic';
import OneTopic from './OneTopic';

const Forum = () => {
    const { getUser } = useContext(UserContext)
    const [getModal, setModal] = useState(false)
    const [getTopics, setTopics] = useState([])
    useEffect(() => {
        http.get("allTopics").then(res => {
            if (res.success) {
                setTopics(res.data)
            } else {

            }
        })
    }, [])

    return (
        <div className='d-flex flex-column'>
            {getModal && <ModalTopic setModal={setModal} getUser={getUser} />}
            {getUser && <button className='btn-modal align-self-end' onClick={() => setModal(true)}>Sukurti naują temą</button>}
            <div className='d-flex text-center p-4'>
                <div className='flex4'><b>Temos pavadinimas</b></div>
                <div className='flex1'>Žinučių kiekis</div>
                <div className='flex2'>Paskutinis postas</div>
            </div>
            {getTopics.length > 0 && getTopics.map((x, i) => <OneTopic key={i} topic={x} />)}
        </div>
    );
};

export default Forum;