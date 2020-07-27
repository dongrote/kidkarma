import React from 'react';
import { Grid, Header, Statistic } from 'semantic-ui-react';

export default props => (
  <Grid textAlign='center'>
    <Grid.Row columns={1}>
      <Header as='h1' content='Todays Karma' />
    </Grid.Row>
    <Grid.Row columns={3}>
      <Grid.Column>
        <Statistic label='Good Karma' value={props.goodKarma} />
      </Grid.Column>
      <Grid.Column>
        <Statistic label='Bad Karma' value={props.badKarma} />
      </Grid.Column>
      <Grid.Column>
        <Statistic label='Net Karma' value={props.netKarma} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
