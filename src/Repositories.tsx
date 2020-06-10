import React, { ReactElement } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const REPOSITORIES_QUERY = gql`
    query getRepositories {
        viewer {
            repositories (last: 100, isFork: false) {
                nodes {
                    name
                    description
                    url
                    languages(first: 5) {
                        nodes {
                            color
                            name
                        }
                    }
                }
            }
        }
    }
`;

const Repositories:React.FC = ():React.ReactElement => {

  const { loading, error, data } = useQuery(REPOSITORIES_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {JSON.stringify(error)}</div>;

  return (
    <div>
      { JSON.stringify(data) }
    </div>
  );
};

export default Repositories;
