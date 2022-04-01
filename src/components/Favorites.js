import React, { useEffect } from 'react';
import { useState } from 'react';
import http from '../plugins/http';
import OneTopic from './OneTopic';

const Favorites = () => {
    const [allFavorites, setAllFavorites] = useState([])
    const favoritesIndex = JSON.parse(localStorage.favorites)
    useEffect(() => {
       // console.log(favoritesIndex)
        http.post({favoritesIndex}, 'favorites').then((res) => {
            if (res.success) {
                setAllFavorites(res.data)
            }
        })
    }, [localStorage.favorites])
    return (
        <div>
            {allFavorites.length > 0 && allFavorites.map((x, i) => <OneTopic key={i} topic={x} />)}
        </div>
    );
};

export default Favorites;