import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class DemeritButton extends Component {
  state = {loading: false, error: false};
  async onClick() {
    this.setState({loadig: true});
    var res = await fetch('/api/children/demerit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ChildId: this.props.childId,
        demerit: this.props.name,
        karma: this.props.karma,
      }),
    });
    this.setState({loading: false, error: !res.ok});
    if (res.ok) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <Button
        fluid
        primary
        loading={this.state.loading}
        negative={this.state.error}
        icon={this.state.error ? 'warning sign' : undefined}
        content={`${this.props.name} (${this.props.karma})`}
        onClick={() => this.onClick()}
      />
    );
  }
}

export default DemeritButton;
