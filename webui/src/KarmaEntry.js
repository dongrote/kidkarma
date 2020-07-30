import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import EntryForm from './EntryForm';
import AddKarmaButton from './AddKarmaButton';

class KarmaEntry extends Component {
  state = {options: []};
  async componentDidMount() {
    var res = await fetch(this.props.good ? '/api/merits' : '/api/demerits');
    if (res.ok) {
      var json = await res.json();
      this.setState({options: json[this.props.good ? 'merits' : 'demerits']});
    }
  }
  render() {
    return (
      <List divided relaxed>
        <List.Item>
          <Header as='h2' content={`Select a ${this.props.good ? 'Merit' : 'Demerit'}`} />
        </List.Item>
        {this.state.options.map((o, k) => (
          <List.Item key={k}>
            <AddKarmaButton
              url={`/api/children/${this.props.good ? 'merit' : 'demerit'}`}
              good={this.props.good}
              childId={this.props.childId}
              name={o.shortDescription}
              description={o.fullDescription}
              karma={o.karmaValue}
              onClick={() => this.props.onCancel()}
            />
          </List.Item>
        ))}
        <List.Item>
          <Header as='h2' content={`Add New ${this.props.good ? 'Merit' : 'Demerit'}`} />
        </List.Item>
        <List.Item>
          <EntryForm
            url={`/api/children/${this.props.good ? 'merit' : 'demerit'}`}
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
