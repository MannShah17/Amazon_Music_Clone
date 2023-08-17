import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/navigationBar';
import Home from './components/home';
import MusicPlayer from './components/musicPlayer';
import SongDetailPage from './components/songDetailPage';
import LoginPage from './components/loginPage';
import SignupPage from './components/signupPage';
import SubscriptionPage from './components/subscriptionPage';
// import FavoriteSongsPage from './components/favouriteSongPage';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSongChange = (songId) => {
    setCurrentSongId(songId);
    setIsPlaying(true);
  };

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route
          path='/'
          element={<Home searchTerm='' onSongChange={handleSongChange} />}
        />
        <Route
          path='/search/:searchTerm'
          element={({ match }) => <Home searchTerm={match.params.searchTerm} />}
        />
        <Route
          path='/song/:id'
          element={<SongDetailPage onSongChange={handleSongChange} />}
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/subscription' element={<SubscriptionPage />} />
        {/* <Route path='/favorites' element={<FavoriteSongsPage />} /> */}
      </Routes>
      {currentSongId && (
        <MusicPlayer
          songId={currentSongId}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      )}
    </>
  );
}

export default App;
