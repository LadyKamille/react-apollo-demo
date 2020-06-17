import gql from "graphql-tag";

import { languageFragment } from './language.fragment';

export const repositoryFragment = gql`
  fragment Repositories on RepositoryConnection {
    nodes {
      name
      description
      url
      id
      languages {
        ...Language
      }
    }
  }
  ${languageFragment}
`;
