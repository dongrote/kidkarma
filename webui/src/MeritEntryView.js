import React from 'react';
import { Container } from 'semantic-ui-react';
import MeritButtons from './MeritButtons';
import MeritEntry from './MeritEntry';
import DemeritEntry from './DemeritEntry';

export default props => (
  <Container fluid>
    {props.meritEntryMode === null && <MeritButtons karma={props.karma} onChange={props.onUpdateEntryMode} />}
    {props.meritEntryMode === 'merit' && <MeritEntry childId={props.childId} karma={props.karma} onCancel={() => props.onUpdateEntryMode(null)} onUpdate={props.onUpdate} />}
    {props.meritEntryMode === 'demerit' && <DemeritEntry childId={props.childId} karma={props.karma} onCancel={() => props.onUpdateEntryMode(null)}  onUpdate={props.onUpdate} />}
  </Container>
);
