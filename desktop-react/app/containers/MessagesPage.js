import React, { Component } from 'react';
import Message from '../components/Message';
import { Link } from 'react-router';


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
	  			<br/> 
	  		</div>
  		);
  	});
    return (
      <div>
      	<div>          
          <Link to="/"><h2>to Home</h2></Link>
        </div>
        {nodes}
      	<input type="text" onChange={this._handleChange.bind(this)}></input>
      	<button onClick={this._handleSend.bind(this)}>Send</button>
      </div>
    );
  }
}
