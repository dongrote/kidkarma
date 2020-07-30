import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default props => (
  <Grid>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Button
          fluid
          positive
          icon='plus'
          content='Good Karma'
          onClick={() => props.onChange('good')}
        />
      </Grid.Column>
      <Grid.Column>
        <Button
          fluid
          negative
          icon='minus'
          content='Bad Karma'
          onClick={() => props.onChange('bad')}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
