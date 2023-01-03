import * as React from 'react';
import { Button, Card, CardBody, CardFooter } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import '@patternfly/react-core/dist/styles/base.css';

const Login: React.FunctionComponent = () => {
  const [loggingIn, setLoggingIn] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = async () => {
    setLoggingIn(true);
    setError('');
    try {
      // Attempt login here
      console.log(loggingIn);
    } catch (err) {
      setError("Error");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="Center">
      <Card>
        <CardBody>
          <div>
            <h1>Welcome to Aboleri</h1>
            <p>To get started, please log in with your Spotify account.</p>
            {error && (
              <div>
                <ExclamationCircleIcon /> {error}
              </div>
            )}
          </div>
        </CardBody>
        <Button variant="primary" onClick={handleLogin}>
          Log in
        </Button>
      </Card>
    </div>
  );
};

export default Login;
