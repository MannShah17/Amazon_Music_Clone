import React, { useState, useEffect, useRef } from 'react';
import '../cssComponents/musicPlayer.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

function MusicPlayer({ songId }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetch(`https://academics.newtonschool.co/api/v1/music/song/${songId}`, {
      headers: {
        projectId: 'fd4c0stueyxj',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentSong(data.data);
      })
      .catch((error) => console.error('Error fetching current song:', error));
  }, [songId, user, navigate]);

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    const updateProgress = () => {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const newProgress = (currentTime / duration) * 100;
      setProgress(newProgress);
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener('timeupdate', updateProgress);

    return () => {
      audioElement.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentSong]);

  const handlePlayPause = () => {
    if (!currentSong) return;

    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    audioRef.current.volume = newVolume;
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
  };

  return (
    <div className='music-player'>
      {currentSong ? (
        <>
          <div className='album-art'>
            <img src={currentSong.thumbnail} alt={currentSong.title} />
          </div>
          <div className='song-details'>
            <h3>{currentSong.title}</h3>
            <p>{currentSong.artist}</p>
          </div>
          <div className='controls'>
            <button className='control-button' onClick={handlePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <input
              type='range'
              className='volume-slider'
              min='0'
              max='100'
              value={100}
              onChange={handleVolumeChange}
            />
          </div>
          <audio
            ref={audioRef}
            src={currentSong.audio_url}
            onEnded={handleSongEnd}
          />
          <div className='progress-bar'>
            <div className='progress' style={{ width: `${progress}%` }}></div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MusicPlayer;
