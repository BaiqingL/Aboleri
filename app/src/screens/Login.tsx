import * as React from 'react';
import { Button, Card, CardBody } from '@patternfly/react-core';

const LoginPage: React.FunctionComponent = () => {
  const [loggingIn, setLoggingIn] = React.useState(false);

  const handleLogin = async () => {
    setLoggingIn(true);
    try {
      console.log('Logging in...');
    } catch (error) {
      // Handle login error here
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <Card>
      <CardBody>
        <p>
          Welcome to our Spotify app! To get started, please log in with your
          Spotify account.
        </p>
        <Button variant="primary" onClick={handleLogin} isDisabled={loggingIn}>
          {loggingIn ? 'Logging In...' : 'Log In with Spotify'}
        </Button>
      </CardBody>
    </Card>
  );
};

export default LoginPage;