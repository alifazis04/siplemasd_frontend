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