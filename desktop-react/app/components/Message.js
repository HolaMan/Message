import React, { Component } from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';

export default class Message extends Component {
  render() {
    return (
      <div>
      <ListItem
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              primaryText={this.props.author}
              secondaryText={
                <p>
                  <span >{this.props.author}</span> --
                  {this.props.message}
                </p>
              }
            secondaryTextLines={2}/>        
      </div>
    );
  }
}
