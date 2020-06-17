import gql from "graphql-tag";

import { repositoryFragment } from './repository.fragment';

export const repositoriesQuery = gql`
  query getRepositories($last: Int, $isFork: Boolean, $privacy: RepositoryPrivacy) {
    viewer {
      repositories (last: $last, isFork: $isFork, privacy: $privacy) {
        ...Repositories
      }
    }
  }
  ${repositoryFragment}
`;
