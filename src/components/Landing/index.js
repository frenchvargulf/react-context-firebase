import React from 'react';
import Container from '@material-ui/core/Container';
import Skeleton from './Skeleton';

const LandingPage = () => (
  <div>
    <Container maxWidth="xl">
      <Skeleton />
    </Container>
  </div>
);

export default LandingPage;