import React from 'react';
import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../plugins/http';
import UserContext from '../context/UserContext';


const Login = () => {
    const nav = useNavigate()
    const { setUser } = useContext(UserContext)
    const [getError, setError] = useState(null)
    const inp = {
        username: useRef(),
        pass: useRef()
    }
    async function login() {
        const user = {
            username: inp.username.current.value,
            password: inp.pass.current.value,
        }
        http.post(user, "login").then(res => {
            if (res.success) {
                inp.username.current.value = ""
                inp.pass.current.value = ""
                setError(null)
                setUser(res.data)
                nav('/')
            } else {
                setError(res.message)
            }
        })
    }

    return (
        <div className='d-flex flex-column align-items-center reg-log-container'>
            <div>Prisijunkite:</div>
            <input className='input' type="text" placeholder='Įveskite slapyvardį' ref={inp.username} />
            <input className='input' type="password" placeholder='Įveskite slaptažodį' ref={inp.pass} />
            <button className='btn' onClick={login}>Prisijungti</button>
            {getError && <div className='d-flex justify-content-center '>{getError}</div>}
        </div>
    );
};

export default Login;