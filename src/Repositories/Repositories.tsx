import { Alert, Card, Col, Row, Skeleton } from 'antd';
import React from 'react';
import { useGetRepositoriesQuery } from '../generated/graphql';
import classes from './Repositories.module.css';
import Languages from './Languages/Languages';
import { repositoriesQuery } from '../graphql/repositories/repositories.query';

const Repositories:React.FC = ():React.ReactElement => {
  const {  loading, error, data } = useGetRepositoriesQuery({
    query: repositoriesQuery,
    variables: {last: 100, isFork: false, privacy: 'PUBLIC'}
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
