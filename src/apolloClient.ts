import ApolloClient from 'apollo-boost';

const createClient = () => {
  return new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: async (operation) => {
      operation.setContext({
        headers: {
          authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        }
      });
    },
    onError: ({ graphQLErrors, networkError, operation }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
        );
      }

      if (networkError) {
        console.log(
          `[Network error ${operation.operationName}]: ${networkError.message}`
        );
      }
    },
  });
};

export default createClient;
