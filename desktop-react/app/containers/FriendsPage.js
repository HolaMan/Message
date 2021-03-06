import React, { Component } from 'react';
import Message from '../components/Message';
import { Link } from 'react-router';
//import MobileTearSheet from '../../../MobileTearSheet';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';


export default class FriendsPage extends Component {

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
      	<List subheader="Recent chats">
          <ListItem
            primaryText="Brendan Lim"
            leftAvatar={<Avatar src="images/ok-128.jpg" />}
            rightIcon={<CommunicationChatBubble />}
          />
          <ListItem
            primaryText="Eric Hoffman"
            leftAvatar={<Avatar src="images/kolage-128.jpg" />}
            rightIcon={<CommunicationChatBubble />}
          />
          <ListItem
            primaryText="Grace Ng"
            leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
            rightIcon={<CommunicationChatBubble />}
          />
          <ListItem
            primaryText="Kerem Suer"
            leftAvatar={<Avatar src="images/kerem-128.jpg" />}
            rightIcon={<CommunicationChatBubble />}
          />
          <ListItem
            primaryText="Raquel Parrado"
            leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
            rightIcon={<CommunicationChatBubble />}
          />
        </List>
        <Divider />
        <List subheader="Previous chats">
          <ListItem
            primaryText="Chelsea Otakan"
            leftAvatar={<Avatar src="images/chexee-128.jpg" />}
          />
          <ListItem
            primaryText="James Anderson"
            leftAvatar={<Avatar src="images/jsa-128.jpg" />}
          />
        </List>
      </div>
    );
  }
}
