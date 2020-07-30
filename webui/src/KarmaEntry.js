import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import EntryForm from './EntryForm';
import AddKarmaButton from './AddKarmaButton';

class KarmaEntry extends Component {
  state = {options: []};
  async componentDidMount() {
    var res = await fetch(`/api/karmaactions/${this.props.good ? 'good' : 'bad'}`);
    if (res.ok) {
      var json = await res.json();
      this.setState({options: json.items});
    }
  }
  render() {
    return (
      <List divided relaxed>
        <List.Item>
          <Header as='h2' content={`Choose ${this.props.good ? 'Good' : 'Bad'} Karma`} />
        </List.Item>
        {this.state.options.map((o, k) => (
          <List.Item key={k}>
            <AddKarmaButton
              url={`/api/children/karma/${this.props.good ? 'good' : 'bad'}`}
              good={this.props.good}
              childId={this.props.childId}
              name={o.name}
              description={o.description}
              karma={o.defaultKarmaValue}
              onClick={() => this.props.onCancel()}
            />
          </List.Item>
        ))}
        <List.Item>
          <Header as='h2' content={`Add New ${this.props.good ? 'Good' : 'Bad'} Karma Action`} />
        </List.Item>
        <List.Item>
          <EntryForm
            url={`/api/children/karma/${this.props.good ? 'good' : 'bad'}`}
            shortNameField={this.props.good ? 'merit' : 'demerit'}
            childId={this.props.childId}
            label={this.props.good ? 'Merit' : 'Demerit'}
            placeholder={`Example: ${this.props.good ? 'walked the yard' : 'theft'}`}
            onCancel={this.props.onCancel}
            onSuccess={() => this.props.onCancel()}
          />
        </List.Item>
      </List>
    );
  }
}

export default KarmaEntry;
