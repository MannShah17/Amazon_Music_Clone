import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AlbumDetailPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetch(`https://academics.newtonschool.co/api/v1/music/album/${id}`, {
      headers: {
        projectId: 'fd4c0stueyxj',
      },
    })
      .then((response) => response.json())
      .then((data) => setAlbum(data))
      .catch((error) => console.error('Error fetching album details:', error));
  }, [id]);

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{album.title}</h2>
      <p>Artist: {album.artist}</p>
      <p>Number of Songs: {album.numberOfSongs}</p>
      <p>Duration: {album.duration}</p>
      {/* Display track list and playback controls here */}
      {/* Heart Symbol button for adding to favorites */}
    </div>
  );
}

export default AlbumDetailPage;
