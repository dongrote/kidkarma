import React, { Component } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import NumberInput from './NumberInput';

class EntryForm extends Component {

  state = {
    validInput: false,
    loading: false,
    error: false,
    shortName: '',
    action: '',
    karma: 0,
  };

  updateShortName(name) {
    this.setState({shortName: name, validInput: Boolean(name.length)});
  }

  updateAction(action) {
    this.setState({action, validInput: Boolean(this.state.shortName.length)});
  }

  updateKarma(karma) {
    this.setState({karma, validInput: Boolean(this.state.shortName.length),
    });
  }

  async onSubmit() {
    this.setState({loading: true});
    var res = await fetch(this.props.url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ChildId: this.props.childId,
        karma: this.state.karma,
        [this.props.shortNameField]: this.state.shortName,
        description: this.state.action,
      }),
    });
    this.setState({loading: false, error: !res.ok});
    if (res.ok) {
      this.props.onSuccess();
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column textAlign='left'>
            <Form>
              <Form.Field>
                <label>Short Name</label>
                <input
                  placeholder='Something Short'
                  value={this.state.shortName}
                  onInput={e => this.updateShortName(e.target.value)}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column textAlign='left'>
            <Form>
              <Form.Field>
                <label>{this.props.label}: What happened?</label>
                <input
                  placeholder={this.props.placeholder}
                  value={this.state.action}
                  onInput={e => this.updateAction(e.target.value)}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column textAlign='left'>
            <Form>
              <Form.Field>
                <label>Karma Points</label>
                <NumberInput
                  placeholder='10'
                  onInput={karma => this.updateKarma(karma)}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Button
              fluid
              primary
              loading={this.state.loading}
              error={this.state.error.toString()}
              disabled={!this.state.validInput}
              content='Submit'
              onClick={() => this.onSubmit()}
            />
          </Grid.Column>
          <Grid.Column>
            <Button
              fluid
              content='Cancel'
              onClick={this.props.onCancel}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default EntryForm;
