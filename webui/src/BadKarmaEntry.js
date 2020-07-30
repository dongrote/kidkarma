import React from 'react';
import KarmaEntry from './KarmaEntry';

export default props => <KarmaEntry
  good={false}
  childId={props.childId}
  onCancel={props.onCancel}
/>;
