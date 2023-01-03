import * as React from 'react';
import { Button } from '@patternfly/react-core';
import '@patternfly/react-core/dist/styles/base.css';
import env from "ts-react-dotenv";

const Login: React.FunctionComponent = () => {

  const handleLogin = async () => {
    try {
      // Attempt login here
      console.log(env.CLIENT_ID);
    } catch (e) {
      console.log(e);
    }
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
