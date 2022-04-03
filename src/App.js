import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from './context/UserContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Toolbar from './components/Toolbar';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import ForumPage from './pages/ForumPage';
import TopicPage from './pages/TopicPage';
import Logout from './components/Logout';


function App() {
  const [getUser, setUser] = useState(null)
  const [allFavorites, setAllFavorites] = useState([])
  const [favoritesAmount, setFavoritesAmount] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.favorites).length : 0)
  if (!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', JSON.stringify([]));
  }
  return (
    <div >
      <BrowserRouter>
        <UserContext.Provider value={{ getUser, setUser, allFavorites, setAllFavorites, favoritesAmount, setFavoritesAmount }}>
          <Toolbar />
          <Routes>

            <Route path='/registruotis' element={<RegisterPage />} />
            <Route path='/prisijungti' element={<LoginPage />} />
            <Route path='/profilis' element={<ProfilePage />} />
            <Route path='/' element={<ForumPage />} />
            <Route path='/megstamiausi' element={<FavoritesPage />} />
            <Route path='/tema/:id' element={<TopicPage />} />
            <Route path='/atsijungti' element={<Logout />} />

          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
