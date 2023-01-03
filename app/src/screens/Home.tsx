import * as React from 'react';
import { useLocation } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import env from "ts-react-dotenv";

const Home: React.FC = () => {
  const location = useLocation();
  const code = location.state?.code;
  var spotifyApi = new SpotifyWebApi({
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    redirectUri: env.REDIRECT_URI
  });
  console.log(env.CLIENT_ID);
    console.log(env.CLIENT_SECRET);
    console.log(env.REDIRECT_URI);
  spotifyApi.setAccessToken(code);

  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data) {
      console.log('Artist albums', data.body);
    },
    function(err) {
      console.error(err);
    }
);
  return (
    <div>
      <h1>Home</h1>
      <p>Code: {code}</p>
    </div>
  );
};

export default Home;