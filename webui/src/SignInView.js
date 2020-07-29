import React, { Component } from 'react';
import { Button, Grid, Form } from 'semantic-ui-react';

class SignInView extends Component {
  state = {username: '', password: '', loading: false, success: false, error: false};
  updateUsername(username) {
    this.setState({username});
  }
  updatePassword(password) {
    this.setState({password});
  }
  async submit() {
    this.setState({loading: true});
    var res = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
    });
    this.setState({loading: false, error: !res.ok});
    if (res.ok) {
      this.props.onSuccess();
    }
  }
  render() {
    return (
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Grid stackable columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Form>
                    <Form.Field>
                      <label>Username</label>
                      <input
                        placeholder='Username'
                        value={this.state.username}
                        onInput={e => this.updateUsername(e.target.value)}
                      />
                    </Form.Field>
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Form>
                    <Form.Field>
                      <label>Password</label>
                      <input
                        type='password'
                        placeholder='Password'
                        value={this.state.password}
                        onInput={e => this.updatePassword(e.target.value)}
                      />
                    </Form.Field>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button
              fluid
              primary
              content='Sign In'
              type='submit'
              loading={this.state.loading}
              error={this.state.error}
              onClick={() => this.submit()}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default SignInView;
