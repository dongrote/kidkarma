import React from 'react';
import { List, Button } from 'semantic-ui-react';
import EntryForm from './EntryForm';

export default props => (
  <List divided relaxed>
    <List.Item>
      <Button fluid content='Took out trash' />
    </List.Item>
    <List.Item>
      <Button fluid content='Walked the yard' />
    </List.Item>
    <List.Item>
      <Button fluid content='Good behavior' />
    </List.Item>
    <List.Item>
      <EntryForm
        label='Merit'
        placeholder='Example: walked the yard'
        onCancel={props.onCancel}
        karma={props.karma}
        karmaOperation={(x,y) => x + y}
      />;
    </List.Item>
  </List>
)
