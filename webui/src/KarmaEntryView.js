import React from 'react';
import { Container } from 'semantic-ui-react';
import KarmaButtons from './KarmaButtons';
import GoodKarmaEntry from './GoodKarmaEntry';
import BadKarmaEntry from './BadKarmaEntry';

export default props => (
  <Container fluid>
    {props.karmaEntryMode === null && <KarmaButtons karma={props.karma} onChange={props.onUpdateEntryMode} />}
    {props.karmaEntryMode === 'good' && <GoodKarmaEntry childId={props.childId} karma={props.karma} onCancel={() => props.onUpdateEntryMode(null)} onUpdate={props.onUpdate} />}
    {props.karmaEntryMode === 'bad' && <BadKarmaEntry childId={props.childId} karma={props.karma} onCancel={() => props.onUpdateEntryMode(null)}  onUpdate={props.onUpdate} />}
  </Container>
);
