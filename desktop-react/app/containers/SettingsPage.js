import React, { Component } from 'react';
import Message from '../components/Message';
import { Link } from 'react-router';

import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';
import MobileTearSheet from './MobileTearSheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';
import Toggle from 'material-ui/lib/toggle';

export default class SettingsPage extends Component {

  constructor(props) {
  	super(props);
  	var socket = io('http://127.0.0.1:8123');  	
  	var that = this;
  	socket.on('chat message', function(msg){  		         
         that._update(msg);
    });

  	this.state = { 
  		"data": 
  			[{"author":"HolaMan", "message": "Hello"},{"author":"Michelle", "message": "TuTu"}],
  		"message": "",
  		"socket": socket
  	};
  }
  componentDidMount() {
  	
  }
  _update(m) {
  	var n = {"author": "AAA", "message": m};
  	this.setState({data: this.state.data.concat([n])});
  }

  _handleChange(event) {
  	console.log(this);
    this.setState({"message": event.target.value});
  }

  _handleSend() {
  	this.state.socket.emit('chat message', this.state.message);
  }


  render() {
  	var nodes = this.state.data.map(function(m) {
  		return (
  			<div>
	  			<Message author={m.author} message={m.message}/>
	  			<br/> 
	  		</div>
  		);
  	});
    return (
      <div>
        <MobileTearSheet>
          <List subheader="General">
            <ListItem
              primaryText="Profile photo"
              secondaryText="Change your Google+ profile photo"
            />
            <ListItem
              primaryText="Show your status"
              secondaryText="Your status is visible to everyone you use with"
            />
          </List>
          <Divider />
          <List subheader="Hangout notifications">
            <ListItem
              leftCheckbox={<Checkbox />}
              primaryText="Notifications"
              secondaryText="Allow notifications"
            />
            <ListItem
              leftCheckbox={<Checkbox />}
              primaryText="Sounds"
              secondaryText="Hangouts message"
            />
            <ListItem
              leftCheckbox={<Checkbox />}
              primaryText="Video sounds"
              secondaryText="Hangouts video call"
            />
          </List>
        </MobileTearSheet>        
          <List>
            <ListItem
              primaryText="When calls and notifications arrive"
              secondaryText="Always interrupt"
            />
          </List>
          <Divider />
          <List subheader="Priority interruptions">
            <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
            <ListItem primaryText="Calls" rightToggle={<Toggle />} />
            <ListItem primaryText="Messages" rightToggle={<Toggle />} />
          </List>
          <Divider />                  
      </div>
    );
  }
}
