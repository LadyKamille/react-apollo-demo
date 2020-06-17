import { Alert, Card, Col, Row, Skeleton } from 'antd';
import React from 'react';
import gql from 'graphql-tag';
import { useGetRepositoriesQuery } from '../generated/graphql';
import classes from './Repositories.module.css';
import Languages from './Languages/Languages';

const REPOSITORY_FRAGMENT = gql`
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
`;

const LANGUAGES_FRAGMENT = gql`
  fragment Language on LanguageConnection {
    nodes {
      id
      color
      name
    }
  }
`;

const REPOSITORIES_QUERY = gql`
  query getRepositories {
    viewer {
      repositories (last: 100, isFork: false, privacy: PUBLIC) {
        ...Repositories
      }
    }
  }
`;

const Repositories:React.FC = ():React.ReactElement => {
  const {  loading, error, data } = useGetRepositoriesQuery({
    query: REPOSITORIES_QUERY,
  });
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
      if (repo) {
        return (
          <Col span={ 8 } key={ repo.name }>
            <Card title={ repo.name } bordered={ false }>
              <p>{ repo.description }</p>
              <p>
                <a
                  href={ repo.url }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  { repo.url }
                </a>
              </p>
              <Languages languages={ repo.languages }/>
            </Card>
          </Col>
        )
      }
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
