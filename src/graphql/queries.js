import { gql } from '@apollo/client';

export const GET_REPORTS = gql`
  query GetReports {
    getReports {
      id
      title
      description
      createdAt
    }
  }
    
`;