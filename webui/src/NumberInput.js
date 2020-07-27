import React, { Component } from 'react';

class NumberInput extends Component {
  state = {value: 0, stringValue: ''};

  onInput(value) {
    const n = Number(value);
    if (!isNaN(n)) {
      this.setState({
        value: n,
        stringValue: value,
      });
    }
    this.props.onInput(isNaN(n) ? 0 : n);
  }

  render() {
    return <input
      type='number'
      placeholder={this.props.placeholder}
      value={this.state.stringValue}
      onInput={e => this.onInput(e.target.value)}
    />
  }
}

export default NumberInput;
