import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from 'react-bootstrap';

const SIGN_IN = gql`
  mutation signin($username: String!, $password: String!) {
    signin(username: $username, password: $password)
  }
`;

const LoginPage = (props) => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const signin = useMutation(SIGN_IN);

  return (
    <div className="Login">
      <FormGroup controlId="email">
        <FormLabel>Username</FormLabel>
        <FormControl
          autoFocus
          type="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <FormLabel>Password</FormLabel>
        <FormControl
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <FormLabel></FormLabel>
        <Button
          block
          type="button"
          onClick={async () =>{
            const ret = await signin({ variables: { username, password } });
            if (ret && ret.data && ret.data.signin) {
              localStorage.setItem('token', `Bearer ${ret.data.signin}`);
              if (props.location && props.location.state && props.location.state.from) {
                window.location.href = props.location.state.from.pathname;
              } else {
                window.location.href = '/';
              }
            }
          }}
        >
          Login
        </Button>
      </FormGroup>
      <div>Try linkme / linkme</div>
    </div>
  )
};

export default LoginPage;