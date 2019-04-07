import React, { createContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Table } from 'react-bootstrap';

export const UserContext = createContext();

const GET_REGISTRY = gql`
  query {
    registry {
      firstName
      lastName
      birthDate
      birthCity
      taxCode
    }
  }
`;

const RegistryPage = () => {
  const { data, error } = useQuery(GET_REGISTRY);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Birth Date</th>
          <th>Birth City</th>
          <th>Tax Code</th>
        </tr>
      </thead>
      <tbody>
        {data && data.registry &&
          data.registry.map((value, index) => {
            const date = new Date(Number(value.birthDate));

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
                <td>{date.toISOString()}</td>
                <td>{value.birthCity}</td>
                <td>{value.taxCode}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );

};

export default RegistryPage;