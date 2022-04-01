import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr'
import {FaHeart} from 'react-icons/fa'

const OneTopic = ({ topic }) => {
    const [getFavouriteIndex, setFavouriteIndex] = useState([])

    const [getState, setState] = useState( JSON.parse(localStorage.favorites).find((x) => x === topic._id))
    const nav = useNavigate()
   
    function goToSinglePage(x) {
        nav('/tema/' + x._id)
    }
    useEffect(() => {
        setState(
          JSON.parse(localStorage.favorites).find((x) => x === topic._id)
        );
      }, [ localStorage.favorites, topic]);
    function changeFavorites(){
        let favorites = JSON.parse(localStorage.favorites);
        console.log(getState, "state")
        setState(!getState);
        if (!getState) {
          favorites.push(topic._id);
        } else {
          favorites = favorites.filter((x) => x !== topic._id);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log(favorites)
       // setFavoritesCounter(JSON.parse(localStorage.favorites).length);
    }
    return (
        <div className='topic-card d-flex align-items-center sm-column'>
            <div onClick={() => goToSinglePage(topic)} className='flex4'><b>{topic.title}</b> by {topic.owner}</div>
            <div className='flex1  text-center'>34</div>
            <div className='flex2  text-center'>last post</div>
            <div onClick={changeFavorites} > {getState ?  <FaHeart/>:<GrFavorite /> }
              
            </div>
        </div>
    );
};

export default OneTopic;