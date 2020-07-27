import React from 'react';
import { Label, List, Icon } from 'semantic-ui-react';

export default props => (
  <List.Item>
    <List.Content>
      <List.Header as='h4'>
        <Icon
          link
          circular
          disabled={!props.upvoted}
          color={props.upvoted ? 'orange' : 'black'}
          name='arrow up'
        />
        {props.voteCount}
        <Icon
          link
          circular
          disabled={!props.downvoted}
          color={props.downvoted ? 'red' : 'black'}
          name='arrow down'
        />
        <Label color={props.merit ? 'green' : 'red'}>
          <Icon name={props.merit ? 'thumbs up outline' : 'thumbs down outline'} />
          Karma
          <Label.Detail>{props.karma}</Label.Detail>
        </Label>
      </List.Header>
      <List.Description>
        <p>July 12, 2020, 8:53 AM</p>
        <p>{props.action}</p>
      </List.Description>
    </List.Content>
  </List.Item>
);
