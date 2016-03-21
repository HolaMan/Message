import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

import MessagesPage from '../containers/MessagesPage';
import FriendsPage from '../containers/FriendsPage';
import SettingsPage from '../containers/SettingsPage';

import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SvgIcon from 'material-ui/lib/svg-icon';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import FileCloudDownload from 'material-ui/lib/svg-icons/file/cloud-download';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';
injectTapEventPlugin();

const iconStyles = {
  // marginRight: 12,
};

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'friends',
    };
  }

  componentDidMount() {
    var socket = io('http://127.0.0.1:8123');
    socket.emit('chat message', "it work!!!");
  }

  handleTabChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
            tabItemContainerStyle={{width: '100%'}} 
            value={this.state.value}
            onChange={this.handleTabChange}>
            <Tab
                 icon={<ActionHome style={iconStyles} />}
                 label="Friends" 
                 value="friends">
                <FriendsPage/>
            </Tab>
            <Tab label="Messages" icon={<FileCloudDownload style={iconStyles} />} value="messages">
                <MessagesPage/>
            </Tab>
            <Tab label="Settings" icon={<ActionHome style={iconStyles} />} value="settings">
                <SettingsPage />
            </Tab>
          </Tabs>
      </div>
    );
  }
}
