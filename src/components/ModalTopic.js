import React from 'react';
import { useState, useRef } from 'react';
import { CloseButton } from "react-bootstrap";
import http from '../plugins/http';

const ModalTopic = ({ setModal, getUser}) => {
    const [getError, setError] = useState(null)
    const newTopic = useRef()
    function closeModal() {
        document.body.style.overflow = 'visible'
        setModal(false)
    }
    function createTopic() {
        const topic = {
            newTopic: newTopic.current.value
        }
        http.post(topic, 'createTopic').then(res => {
            if (res.success) {
                newTopic.current.value = ""
                setError(null)
                closeModal()
            } else {
                setError(res.message)
            }
        })
    }
    return (
        <div>
            <div onClick={closeModal} className="modal-window d-flex justify-content-center align-items-center">
                <div onClick={(e) => e.stopPropagation()} className="modal-main d-flex  justify-content-around">
                    <CloseButton
                        onClick={closeModal}
                        className="close-button"
                    />
                    <div className="d-flex flex-column">
                        <input ref={newTopic}
                            placeholder="Įrašykite temos pavadinimą"
                        />
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <div>{getError}</div>
                            <button className="btn-modal" onClick={createTopic}>Sukurti temą</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalTopic;