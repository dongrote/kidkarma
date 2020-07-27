import React, { Component } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import NumberInput from './NumberInput';

class EntryForm extends Component {

  state = {
    validInput: false,
    loading: false,
    error: false,
    action: '',
    karma: 0,
    newKarma: 0,
  };

  updateAction(action) {
    this.setState({
      action,
      validInput: Boolean(action.length),
    });
  }

  updateKarma(karma) {
    this.setState({
      karma,
      newKarma: this.props.karmaOperation(this.props.karma, karma),
      validInput: Boolean(this.state.action.length),
    });
  }

  render() {
    return (
      <Grid>
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
        <Grid.Row columns={2}>
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
          <Grid.Column textAlign='left'>
            <Form>
              <Form.Field>
                <label>Resulting Karma</label>
                <input readOnly value={this.state.newKarma} />
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
