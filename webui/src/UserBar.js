import React, { Component } from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';

class UserBar extends Component {
  state = {loading: false, error: false};
  async onClickSignOut() {
    this.setState({loading: true});
    var res = await fetch('/api/logout');
    this.setState({loading: false, error: !res.ok});
    if (res.ok) {
      this.props.onSignOut();
    }
  }
  render() {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' content={`Welcome, ${this.props.username}!`} />
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button basic icon='sign out' onClick={() => this.onClickSignOut()} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default UserBar;
