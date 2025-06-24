import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

export default client;

// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const ADD_REPORT = gql`
  mutation AddReport($title: String!, $description: String!) {
    addReport(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;