import React from 'react';
import { List, Button } from 'semantic-ui-react';
import EntryForm from './EntryForm';

export default props => (
  <List divided relaxed>
    <List.Item>
      <Button fluid content='Lied' />
    </List.Item>
    <List.Item>
      <Button fluid content='Tantrum' />
    </List.Item>
    <List.Item>
      <Button fluid content='Bad Behavior' />
    </List.Item>
    <List.Item>
    <EntryForm
      label='Demerit'
      placeholder='Example: stole money'
      onCancel={props.onCancel}
      karma={props.karma}
      karmaOperation={(x,y) => x - y}
    />;
    </List.Item>
  </List>
)
