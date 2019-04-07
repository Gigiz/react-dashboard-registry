import React, { useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { UserContext } from '../components/RootContext';

const UPLOAD_FILE = gql`
  mutation upload($file: Upload!, $username: String!) {
    upload(file: $file, username: $username)
  }
`;

const UploadPage = () => {
  const uploadTask = useMutation(UPLOAD_FILE);
  const { username } = useContext(UserContext);

  return (
    <input
      type="file"
      required
      onChange={({ target: { validity, files: [file] } }) =>{
        validity.valid && uploadTask({ variables: { file, username } })
      }
      }
    />
  )
};

export default UploadPage;