import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';



const Toolbar = () => {
    const { getUser } = useContext(UserContext)
    return (
        <div className='d-flex justify-content-evenly toolbar align-items-center'>
            {!getUser && <Link className='link' to="/registruotis">Registruotis</Link>}
            {!getUser && <Link className='link' to="/prisijungti">Prisijungti </Link>}
            {getUser && <Link className='link' to="/profilis">Profilis</Link>}
            <Link className='link' to="/">Forumas</Link>
            <Link className='link' to="/megstamiausi">Mėgstamiausi</Link>
            {getUser && <Link className='link' to="/profilis">Atsijungti</Link>}
        </div>
    );
};

export default Toolbar;