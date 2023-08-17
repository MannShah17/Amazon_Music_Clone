import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MusicPlayer from './musicPlayer';
import '../cssComponents/songPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

function SongDetailPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetch(`https://academics.newtonschool.co/api/v1/music/song/${id}`, {
      headers: {
        projectId: 'fd4c0stueyxj',
      },
    })
      .then((response) => response.json())
      .then((data) => setSong(data.data))
      .catch((error) => console.error('Error fetching song details:', error));
  }, [id, user, navigate]);

  if (!song) {
    return <div>Loading...</div>;
  }

  const audio = new Audio(song.audio_url);

  const handlePlayPause = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className='song-detail-container'>
      <div className='song-detail'>
        <img src={song.thumbnail} alt={song.title} className='song-thumbnail' />
        <div className='song-info'>
          <h2 className='song-title'>{song.title}</h2>
          {song.artist && song.artist.length > 0 && (
            <p className='song-artist'>
              Artist: {song.artist.map((artist) => artist.name).join(', ')}
            </p>
          )}
          <p className='song-mood'>Mood: {song.mood}</p>
          <p className='song-duration'>Duration: {song.duration}</p>
          <MusicPlayer songId={id} />
          <button onClick={handlePlayPause}>
            {audio.paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SongDetailPage;
