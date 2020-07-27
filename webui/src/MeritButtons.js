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
          content='Merit'
          onClick={() => props.onChange('merit')}
        />
      </Grid.Column>
      <Grid.Column>
        <Button
          fluid
          negative
          icon='minus'
          content='Demerit'
          onClick={() => props.onChange('demerit')}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
