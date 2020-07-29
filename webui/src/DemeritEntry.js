import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import EntryForm from './EntryForm';
import DemeritButton from './DemeritButton';

class MeritEntry extends Component {
  state = {options: []};
  async componentDidMount() {
    var res = await fetch('/api/demerits');
    if (res.ok) {
      var json = await res.json();
      this.setState({options: json.demerits});
    }
  }
  render() {
    return (
      <List divided relaxed>
        <List.Item>
          <Header as='h2' content='Select a Demerit' />
        </List.Item>
        {this.state.options.map((o, k) => (
          <List.Item key={k}>
            <DemeritButton
              childId={this.props.childId}
              name={o.shortDescription}
              description={o.fullDescription}
              karma={o.karmaValue}
              onClick={() => {
                this.props.onCancel();
                this.props.onUpdate();
              }}
            />
          </List.Item>
        ))}
        <List.Item>
          <Header as='h2' content='Create a custom Demerit' />
        </List.Item>
        <List.Item>
          <EntryForm
            url='/api/children/demerit'
            shortNameField='demerit'
            childId={this.props.childId}
            label='Demerit'
            placeholder='Example: lied'
            onCancel={this.props.onCancel}
            onSuccess={() => {
              this.props.onUpdate();
              this.props.onCancel();
            }}
            karma={this.props.karma}
            karmaOperation={(x,y) => x - y}
          />
        </List.Item>
      </List>
    );
  }
}

export default MeritEntry;
