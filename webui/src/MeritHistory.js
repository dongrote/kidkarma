import React from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import MeritHistoryRow from './MeritHistoryRow';

export default () => (
  <Container fluid>
    <Header as='h2' content='Merit History' />
    <List divided relaxed>
      <MeritHistoryRow
        merit
        upvoted={true}
        voteCount={3}
        karma={5}
        action='did the good thing'
      />
      <MeritHistoryRow
        voteCount={1}
        merit={false}
        karma={-8}
        action='did the not good thing'
      />
      <MeritHistoryRow
        merit
        downvoted={true}
        voteCount={1}
        karma={5}
        action='did the good thing again'
      />
    </List>
  </Container>
);
