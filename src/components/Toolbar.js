import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { IoMdLogOut } from 'react-icons/io'
import { TiThMenu } from 'react-icons/ti'



const Toolbar = () => {
    const { getUser, allFavorites } = useContext(UserContext)
    const [menuActive, setMenuActive] = useState(false)
    const [getCount, setCount] = useState(JSON.parse(localStorage.favorites).length)
    function handleMenu() {
        setMenuActive(!menuActive)
    }
    useEffect(()=>{
        function checkFavorite() {

               let favorites = localStorage.getItem('favorites');
               console.log(favorites)
        setCount(favorites.length)
        }
     

        window.addEventListener('storage', checkFavorite)

        return () => {
          window.removeEventListener('storage', checkFavorite)
        }
    }, [])

    return (
        <div className='d-flex justify-content-evenly align-items-center sm-toolbar'>
            <TiThMenu onClick={handleMenu} className='sm-flex none menu-icon' style={{ fontSize: "2rem" }} />
            <div className={menuActive ? 'sm-flex sm-column sm-toolbar-box' : 'toolbar dis-flex sm-none justify-content-evenly align-items-center'}>
                {!getUser && <Link className='link' to="/registruotis" onClick={() => setMenuActive(false)} >Registruotis</Link>}
                {!getUser && <Link className='link' to="/prisijungti" onClick={() => setMenuActive(false)} >Prisijungti </Link>}
                {getUser && <Link className='link' to="/profilis" onClick={() => setMenuActive(false)} >
                    Profilis
                    <span className={getUser.notification.length > 0 ? 'badge' : ''}>{getUser.notification.length > 0 && getUser.notification.length}</span>
                </Link>}
                <Link className='link' to="/" onClick={() => setMenuActive(false)} >Forumas</Link>
                <Link className='link' to="/megstamiausi" onClick={() => setMenuActive(false)} >
                    Mėgstamiausi
                    <span className={allFavorites.length > 0 ? 'badge' : ''}>{allFavorites.length > 0 && getCount}</span>
                </Link>
                {getUser && <Link className='link' to='/atsijungti' onClick={() => setMenuActive(false)} >Atsijungti<IoMdLogOut className='mx-2' style={{ fontSize: '20px' }} /></Link>}
            </div>

        </div>
    );
};

export default Toolbar;