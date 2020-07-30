import React, { Component } from 'react';
import { Button, Form, Grid, TextArea } from 'semantic-ui-react';
import NumberInput from './NumberInput';

class EntryForm extends Component {

  state = {
    validInput: false,
    loading: false,
    error: false,
    action: '',
    remarks: '',
    karma: 0,
  };

  updateRemarks(remarks) {
    this.setState({remarks, validInput: Boolean(this.state.action.length)});
  }

  updateAction(action) {
    this.setState({action, validInput: Boolean(action.length)});
  }

  updateKarma(karma) {
    this.setState({karma, validInput: Boolean(this.state.action.length),
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
        action: this.state.action,
        remarks: this.state.remarks,
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
                <label>Remarks</label>
                <TextArea
                  placeholder={this.props.placeholder}
                  value={this.state.remarks}
                  onInput={e => this.updateRemarks(e.target.value)}
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
