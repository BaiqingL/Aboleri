import * as React from 'react';
import { useLocation } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';

const Home: React.FC = () => {
  const location = useLocation();
  const code = location.state?.code;
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(code);

  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
  if (err) console.error(err);
  else console.log('Artist albums', data);
  });

  return (
    <div>
      <h1>Home</h1>
      <p>Code: {code}</p>
    </div>
  );
};

export default Home;