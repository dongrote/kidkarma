import React from 'react';
import { Grid, Icon, Header, Statistic } from 'semantic-ui-react';

export default props => (
  <Grid textAlign='center'>
    <Grid.Row columns={1}>
      <Header as='h1' content={`${props.name}'s Karma Today`} />
    </Grid.Row>
    <Grid.Row columns={3}>
      <Grid.Column>
        {props.loading ? <Icon size='huge' name='spinner' loading /> : <Statistic label='Good Karma' value={props.goodKarma} />}
      </Grid.Column>
      <Grid.Column>
        {props.loading ? <Icon size='huge' name='spinner' loading /> : <Statistic label='Bad Karma' value={props.badKarma} />}
      </Grid.Column>
      <Grid.Column>
      {props.loading ? <Icon size='huge' name='spinner' loading /> : <Statistic color={props.netKarma < 0 ? 'red' : undefined} label='Net Karma' value={props.netKarma} />}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
