import React, { Component } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import KarmaHistoryRow from './KarmaHistoryRow';

class KarmaHistory extends Component {
  state = {records: [], loading: false};

  async loadHistory(options) {
    const offset = options.offset || 0,
      limit = options.limit;
    var res = await fetch(`/api/children/history?ChildId=${encodeURIComponent(this.props.childId)}&limit=${encodeURIComponent(limit)}`);
    if (res.ok) {
      var json = await res.json();
      this.setState({records: json.items});
    }
  }
 
  async componentDidMount() {
    await this.loadHistory({limit: 4});
  }

  render() {
    return (
      <Container fluid>
        <Header as='h2' content='Karma History' />
        <List divided relaxed>
          {this.state.records.map((r, k) => <KarmaHistoryRow
              good={r.karma > 0}
              karma={Math.abs(r.karma)}
              key={k}
              date={r.createdAt}
              action={r.KarmaAction.name}
              remarks={r.remarks}
            />)}
        </List>
      </Container>
    );
  }

}

export default KarmaHistory;