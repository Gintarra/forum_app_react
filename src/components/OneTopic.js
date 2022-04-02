import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr'
import { FaHeart } from 'react-icons/fa'
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const OneTopic = ({ topic }) => {
  // console.log(topic)
  const { getUser } = useContext(UserContext)
  const [getNew, setNew] = useState(false)
  const [getFavouriteIndex, setFavouriteIndex] = useState([])

  const [getState, setState] = useState(JSON.parse(localStorage.favorites).find((x) => x === topic._id))
  const nav = useNavigate()

  function goToSinglePage(x) {
    nav('/tema/' + x._id)
  }
  useEffect(() => {
    setState(
      JSON.parse(localStorage.favorites).find((x) => x === topic._id)
    );
    if (getUser && getUser.notification) {
      getUser.notification.find(y => y === topic._id && setNew(true))
    }
  }, [ topic, getState, getUser]);
  function changeFavorites() {
    let favorites = JSON.parse(localStorage.favorites);
    // console.log(getState, "state")
    setState(!getState);
    if (!getState) {
      favorites.push(topic._id);
    } else {
      favorites = favorites.filter((x) => x !== topic._id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    //  console.log(favorites)
    // setFavoritesCounter(JSON.parse(localStorage.favorites).length);
  }
  return (
    <div className='topic-card d-flex align-items-center sm-column'>
      <div onClick={() => goToSinglePage(topic)} className='flex4 topic-onclick'><b>{topic.title}</b> by {topic.owner}</div>
      <div className='flex1  text-center'><span className={getNew ? 'badge1' : ''}>{topic.commentsAmount}</span></div>
      <div className='flex2  text-center'>{topic.lastCommentBy && <div>by {topic.lastCommentBy}</div>}</div>
      <div className='topic-onclick' onClick={changeFavorites} > {getState ? <FaHeart /> : <GrFavorite />}
      </div>
    </div>
  );
};

export default OneTopic;