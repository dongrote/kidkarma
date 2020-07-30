import React, { Component } from 'react';
import { Button, Icon, Grid, Form, TextArea } from 'semantic-ui-react';
import NumberInput from './NumberInput';

class AddKarmaButton extends Component {
  state = {loading: false, error: false, showForm: false, remarks: '', karma: null};
  async onClick() {
    this.setState({loadig: true});
    var res = await fetch(this.props.url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ChildId: this.props.childId,
        action: this.props.name,
        karma: this.props.karma,
      }),
    });
    this.setState({loading: false, error: !res.ok});
    if (res.ok) {
      this.props.onClick();
    }
  }
  toggleShowForm() {
    this.setState({
      showForm: !this.state.showForm,
      remarks: this.state.showForm ? '' : this.state.remarks,
    })
  }
  updateRemarks(value) {
    this.setState({remarks: value});
  }
  updateKarma(n) {
    this.setState({karma: n});
  }
  async onSubmit() {
    this.setState({loading: true});
    var res = await fetch(this.props.url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ChildId: this.props.childId,
        action: this.props.name,
        karma: this.state.karma || this.props.karma,
        remarks: this.state.remarks,
      }),
    });
    this.setState({loading: false, error: !res.ok});
    if (res.ok) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Button.Group fluid>
              <Button
                fluid
                primary
                loading={this.state.loading}
                negative={this.state.error}
                icon={this.state.error ? 'warning sign' : undefined}
                content={`${this.props.name} (${this.props.karma})`}
                onClick={() => this.onClick()}
              />
              <Button icon onClick={() => this.toggleShowForm()}>
                <Icon name='chevron down' />
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        {this.state.showForm && (
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Remarks (optional)</label>
                  <TextArea placeholder='Further details' value={this.state.remarks} onInput={e => this.updateRemarks(e.target.value)} />
                </Form.Field>
                <Form.Field>
                  <label>Karma</label>
                  <NumberInput placeholder={this.props.karma} value={this.state.karma} onInput={n => this.updateKarma(n)} />
                </Form.Field>
                <Button
                  fluid
                  primary
                  loading={this.state.loading}
                  negative={this.state.error}
                  icon={this.state.error ? 'warning sign' : undefined}
                  content='Submit'
                  type='submit'
                  onClick={() => this.onSubmit()}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    );
  }
}

export default AddKarmaButton;
