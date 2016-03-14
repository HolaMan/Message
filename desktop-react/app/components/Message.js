import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return (
      <div>
        <span> { this.props.author }</span>
        <span> { this.props.message }</span>
      </div>
    );
  }
}
