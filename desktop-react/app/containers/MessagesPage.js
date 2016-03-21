import React, { Component } from 'react';
import Message from '../components/Message';
import { Link } from 'react-router';

import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

export default class MessagesPage extends Component {

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
	  		</div>
  		);
  	});
    return (
      <div>
      	<List subheader="Today">
          {nodes}
        </List>
        <TextField onChange={this._handleChange.bind(this)} hintText="input message here..."/>
        <FlatButton label="Send" primary={true} onClick={this._handleSend.bind(this)}/>      	
      </div>
    );
  }
}
