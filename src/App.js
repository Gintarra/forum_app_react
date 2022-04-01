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
  return (
    <div >
      <BrowserRouter>
      <UserContext.Provider value={{getUser, setUser}}>
        <Toolbar />
        <Routes>

          <Route path='/registruotis' element={<RegisterPage />} />
          <Route path='/prisijungti' element={<LoginPage />} />
          <Route path='/profilis' element={<ProfilePage />} />
          <Route path='/' element={<ForumPage />} />
          <Route path='/megstamiausi' element={<FavoritesPage />} />
          <Route path='/tema/:id' element={<TopicPage />} />
          {/* <Route path='/create' element={<CreateAuctionPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/auction/:id' element={<Auction />} /> */}
          <Route path='/atsijungti' element={<Logout />} />

        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
