import React from 'react';
import { useState, useRef } from 'react';
import { CloseButton } from "react-bootstrap";
import http from '../plugins/http';

const ModalChangeImage = ({ setModal, getUser, setUser }) => {
    const [getError, setError] = useState(null)
    const newImage = useRef()
    function closeModal() {
        document.body.style.overflow = 'visible'
        setModal(false)
    }
    function changeImage() {
        const updatedUser = {
            newImage: newImage.current.value,
            user: getUser.username
        }
        http.post(updatedUser, 'changeImage').then(res => {
            if (res.success) {
                newImage.current.value = ""
                setUser(res.data)
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
                        <input ref={newImage}
                            placeholder="Nukopijuokite nuotraukos url."
                        />
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <div>{getError}</div>
                            <button className="btn-modal" onClick={changeImage}>Pakeisti nuotrauką</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalChangeImage;