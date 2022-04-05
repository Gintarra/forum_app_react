import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import http from '../plugins/http';
import OneTopic from './OneTopic';

const Favorites = () => {
  const { allFavorites, setAllFavorites } = useContext(UserContext)
  const favoritesIndex = JSON.parse(localStorage.favorites)
  const nav = useNavigate()
  useEffect(() => {
    http.post({ favoritesIndex }, 'favorites').then((res) => {
      if (res.success) {
        setAllFavorites(res.data)
      }
    })
  }, [favoritesIndex, allFavorites])

  return (
    <div className='d-flex flex-column align-items-center p-5 fav-box'>
      {allFavorites.length === 0 && <div className='text-center'>Pridėkite mėgstamiausias temas:
        <div className='link-topic' onClick={() => nav('/')} ><b>Visos temos</b></div> </div>}
      {allFavorites.length > 0 && allFavorites.map((x, i) => <OneTopic key={i} topic={x} />)}
    </div>
  );
};

export default Favorites;