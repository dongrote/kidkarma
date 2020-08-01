import React, { Component } from 'react';
import { Button, Card, Feed } from 'semantic-ui-react';
import KarmaHistoryRow from './KarmaHistoryRow';

class KarmaHistory extends Component {
  state = {loading: false};

  async onClick() {
    this.setState({loading: true});
    await this.props.onLoadMoreClick();
    this.setState({loading: false});
  }

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Karma History</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {this.props.karmaHistory.map((r, k) => <KarmaHistoryRow
              good={r.karma > 0}
              karma={Math.abs(r.karma)}
              key={k}
              date={r.createdAt}
              action={r.KarmaAction.name}
              remarks={r.remarks}
            />)}
          </Feed>
        </Card.Content>
        {this.props.totalAvailable > this.props.karmaHistory.length && (
          <Card.Content extra>
            <Button fluid basic loading={this.state.loading} content='Load More' onClick={() => this.onClick()} />
          </Card.Content>
        )}
      </Card>
    );
  }
}
export default KarmaHistory;
