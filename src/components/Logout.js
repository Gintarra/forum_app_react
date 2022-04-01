import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import http from '../plugins/http';

const Logout = () => {

    const nav = useNavigate()
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        http.get("logout").then(res => {
            if (res.success) {
                setUser(null)
                nav('/prisijungti')
            }
        })
    }, [])

    return (
        <></>
    );
};

export default Logout;