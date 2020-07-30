import React from 'react';
import { Label, List, Icon } from 'semantic-ui-react';

export default props => (
  <List.Item>
    <List.Content>
      <List.Header as='h4'>
        <Label color={props.good ? 'green' : 'red'}>
          <Icon name={props.good ? 'thumbs up outline' : 'thumbs down outline'} />
          Karma
          <Label.Detail>{props.karma}</Label.Detail>
        </Label>
      </List.Header>
      <List.Description>
        <p>{props.date}</p>
        <p>{props.action}</p>
        {props.remarks && <p>{props.remarks}</p>}
      </List.Description>
    </List.Content>
  </List.Item>
);
