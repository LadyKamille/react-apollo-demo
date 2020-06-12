import { Alert, Card, Col, Row, Skeleton } from 'antd';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { GetRepositoriesQuery } from '../generated/graphql';
import classes from './Repositories.module.css';

const REPOSITORIES_QUERY = gql`
  query getRepositories {
    viewer {
      repositories (last: 100, isFork: false, privacy: PUBLIC) {
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
  const {  loading, error, data } = useQuery<GetRepositoriesQuery>(REPOSITORIES_QUERY);
  let content;

  if (loading) {
    content = (
      <Card style={{ width: 300 }} loading={loading}>
        <Skeleton />
      </Card>
    )
  }
  if (error) {
    content = (
      <Alert
        message={error}
        type="error"
        closable
      />
    );
  }

  if (data) {
    const repositories = data.viewer.repositories.nodes;
    content = repositories && repositories.map(repo => {
      return (
        <Col span={ 8 } key={repo?.name}>
          <Card title={ repo?.name } bordered={ false }>
            <p>{ repo?.description }</p>
            <p>
              <a
                href={repo?.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {repo?.url}
              </a>
            </p>
          </Card>
        </Col>
      )
    });
  }

  return (
    <div className={classes['site-card-wrapper']}>
      <Row gutter={16}>
        {content}
      </Row>
    </div>
  );
};

export default Repositories;
