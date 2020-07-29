import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import EntryForm from './EntryForm';
import MeritButton from './MeritButton';

class MeritEntry extends Component {
  state = {options: []};
  async componentDidMount() {
    var res = await fetch('/api/merits');
    if (res.ok) {
      var json = await res.json();
      this.setState({options: json.merits});
    }
  }
  render() {
    return (
      <List divided relaxed>
        <List.Item>
          <Header as='h2' content='Select a Merit' />
        </List.Item>
        {this.state.options.map((o, k) => (
          <List.Item key={k}>
            <MeritButton
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
          <Header as='h2' content='Create a custom Merit' />
        </List.Item>
        <List.Item>
          <EntryForm
            url='/api/children/merit'
            shortNameField='merit'
            childId={this.props.childId}
            label='Merit'
            placeholder='Example: walked the yard'
            onCancel={this.props.onCancel}
            onSuccess={() => {
              this.props.onCancel();
              this.props.onUpdate();
            }}
            karma={this.props.karma}
            karmaOperation={(x,y) => x + y}
          />
        </List.Item>
      </List>
    );
  }
}

export default MeritEntry;
