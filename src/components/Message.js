import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useSubscription } from 'react-apollo-hooks';
import Alert from 'react-bootstrap/Alert'
import { UserContext } from '../components/RootContext';

const UPLOAD_SUB = gql`
  subscription latestUpload($username: String!) {
    latestUpload(username: $username) {
      success
      username
    }
  }
`;

const MessageBox = () => {
  const { username } = useContext(UserContext);
  const { data, error, loading } = useSubscription(UPLOAD_SUB, {
    variables: {
      username,
    },
  });

  if (loading) {
    return null;
  }

  if (data && data.latestUpload && data.latestUpload.success) {
    // TODO gestione errori
    return (
      <Alert variant="success" dismissible>
        <Alert.Heading>Upload done!</Alert.Heading>
      </Alert>
    );
  } else {
    return null;
  }
  
}

export default MessageBox; 