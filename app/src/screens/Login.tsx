import * as React from 'react';
import { Button } from '@patternfly/react-core';
import '@patternfly/react-core/dist/styles/base.css';
import env from "ts-react-dotenv";

const Login: React.FunctionComponent = () => {

  const handleLogin = async () => {
    const login = `https://accounts.spotify.com/authorize?client_id=${env.CLIENT_ID}&response_type=code&redirect_uri=${env.REDIRECT_URI}`;
    // Open the login page in a new window
    window.open(login, "_self");
  };

  return (
  <div className="Center">
    <div>
      <h1>Welcome to Aboleri</h1>
      <p>To get started, please log in with your Spotify account.</p>
    </div>
    <Button variant="primary" onClick={handleLogin}>
      Log in with Spotify
    </Button>
  </div>
  );
};

export default Login;
