import gql from "graphql-tag";

export const languageFragment = gql`
  fragment Language on LanguageConnection {
    nodes {
      id
      color
      name
    }
  }
`;
