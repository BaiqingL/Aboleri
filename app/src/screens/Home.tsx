import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';

async function getName(API: SpotifyWebApi.SpotifyWebApiJs) {
  const data = await API.getMe();
  return data.display_name;
}

const Home: React.FC = () => {
  const [profile, setProfile] = useState('');
  const location = useLocation();
  const accessToken = location.state?.accessToken;
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  useEffect(() => {
    getName(spotifyApi).then((data) => {
        if (data) {
            setProfile(data);
            console.log(data);
        }
    });
  }, []);

  return (
    <div className="Center">
      <p>Hello, {profile}</p>
    </div>
  );
};

export default Home;