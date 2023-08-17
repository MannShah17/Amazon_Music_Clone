import React from 'react';
import { useAuth } from './authContext';

function FavoriteSongsPage() {
  const { user } = useAuth();

  if (!user) {
    return <p>Please log in to view your favorite songs.</p>;
  }

  const { favorites } = user;

  return (
    <div>
      <h2>Your Favorite Songs</h2>
      <ul>
        {favorites.map((song) => (
          <li key={song._id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteSongsPage;
