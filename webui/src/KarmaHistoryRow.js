import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import moment from 'moment';

const dateFormat = 'h:mm A; ddd, MMM D, YYYY';

export default props => (
  <Feed.Event>
    <Feed.Label>
      <Icon name={`thumbs ${props.good ? 'up' : 'down'}`} color={props.good ? 'green' : 'red'} />
    </Feed.Label>
    <Feed.Content>
      <Feed.Date content={moment(props.date).format(dateFormat)} />
      <Feed.Extra>{props.action}</Feed.Extra>
      <Feed.Summary>
        <Feed.Meta>{props.remarks}</Feed.Meta>
      </Feed.Summary>
    </Feed.Content>
  </Feed.Event>
);
