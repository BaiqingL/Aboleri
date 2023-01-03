import * as React from 'react';
import {
    TextInput,
    Button,
    Form,
    FormGroup,
    FormHelperText,
    Card,
    CardBody,
    PageSection,
    PageSectionVariants,
    TextContent,
    Text,
    Title,
  } from '@patternfly/react-core';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

interface LoginState {
  username: string;
  password: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onUsernameChange = (value: string) => {
    this.setState({ username: value });
  };

  onPasswordChange = (value: string) => {
    this.setState({ password: value });
  };

  onLogin = () => {
    this.props.onLogin(this.state.username, this.state.password);
  };

  render() {
    return (
      <PageSection variant={PageSectionVariants.light}>
        <Card>
          <CardBody>
            <TextContent>
              <Title size="2xl" headingLevel='h1'>Login</Title>
              <Text component="p">
                Please enter your username and password to log in to Spotify.
              </Text>
            </TextContent>
            <Form>
              <FormGroup
                label="Username"
                isRequired
                fieldId="username"
                helperTextInvalid="Please enter a valid username"
                validated={this.state.username ? 'default' : 'error'}
              >
                <TextInput
                  isRequired
                  type="text"
                  id="username"
                  name="username"
                  aria-describedby="username-helper"
                  value={this.state.username}
                  onChange={this.onUsernameChange}
                  placeholder="Username"
                />
                <FormHelperText id="username-helper">
                  Enter your Spotify username
                </FormHelperText>
              </FormGroup>
              <FormGroup
                label="Password"
                isRequired
                fieldId="password"
                helperTextInvalid="Please enter a valid password"
                validated={this.state.password ? 'default' : 'error'}
              >
                <TextInput
                  isRequired
                  type="password"
                  id="password"
                  name="password"
                  aria-describedby="password-helper"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  placeholder="Password"
                />
                <FormHelperText id="password-helper">
                  Enter your Spotify password
                </FormHelperText>
              </FormGroup>
              <Button onClick={this.onLogin}>Log in</Button>
            </Form>
          </CardBody>
        </Card>
      </PageSection>
    );
  }
}

export default Login;