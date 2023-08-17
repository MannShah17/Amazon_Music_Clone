import React, { useEffect, useState } from 'react';
import '../cssComponents/home.css';
import { Link } from 'react-router-dom';

function Home({ searchTerm }) {
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchFeaturedSongs();
  }, []);
  useEffect(() => {
    // Fetch and set songs data from your API or source
    // ...

    // Filter songs based on searchTerm
    if (searchTerm) {
      const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSongs(filteredSongs);
    }
  }, [searchTerm, songs]);

  const fetchFeaturedSongs = () => {
    fetch('https://academics.newtonschool.co/api/v1/music/song', {
      headers: {
        projectId: 'fd4c0stueyxj',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched songs:', data);
        setFeaturedSongs(data.data);
      })
      .catch((error) => console.error('Error fetching songs:', error));
  };

  const handleFilterByMood = () => {
    fetch(
      'https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}',
      {
        headers: {
          projectId: 'fd4c0stueyxj',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Filtered songs by mood:', data);
        setFeaturedSongs(data.data);
      })
      .catch((error) => console.error('Error filtering songs by mood:', error));
  };

  const handleSortByRelease = () => {
    fetch(
      'https://academics.newtonschool.co/api/v1/music/song?sort={"release":1}',
      {
        headers: {
          projectId: 'fd4c0stueyxj',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Sorted songs by release:', data);
        setFeaturedSongs(data.data);
      })
      .catch((error) =>
        console.error('Error sorting songs by release:', error)
      );
  };

  const handlePaginate = () => {
    fetch(
      'https://academics.newtonschool.co/api/v1/music/song?page=2&limit=10',
      {
        headers: {
          projectId: 'fd4c0stueyxj',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Paginated songs:', data);
        setFeaturedSongs(data.data);
      })
      .catch((error) => console.error('Error paginating songs:', error));
  };

  return (
    <div className='home-container'>
      <div className='section'>
        <h2>Featured Songs</h2>
        <div className='controls'>
          <button onClick={fetchFeaturedSongs}>Fetch Featured Songs</button>
          <button onClick={handleFilterByMood}>Filter by Mood</button>
          <button onClick={handleSortByRelease}>Sort by Release</button>
          <button onClick={handlePaginate}>Paginate</button>
        </div>
        <div className='card-container'>
          {featuredSongs.map((song) => (
            <div className='card song-card' key={song._id}>
              <Link to={`/song/${song._id}`} className='song-link'>
                <img src={song.thumbnail} alt={song.title} />
                <div className='play-button'>▶</div>
                <h3>{song.title}</h3>
                {song.artist && song.artist[0] && <p>{song.artist[0].name}</p>}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
