import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ListView
} from 'react-native';
import  Meteor, { createContainer, MeteorListView } from 'react-native-meteor';
//import AccountsUIWrapper from './AccountsUIWrapper.jsx'; 
//import { Tasks } from '../app/components/tasks.js';
 
//import Task from './Task';
 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    console.log("++++++++++++++++++++", this.props.tasks);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      hideCompleted: false,
      dataSource: this.ds.cloneWithRows(this.props.tasks),
    };
  }
 
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
 
      return (
        <Text
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
 renderRow(todo) {
    return (
      <Text>{todo.text}</Text>
    );
  }
  render() {
    return (
      <View>
        <Text>helloword</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.text}</Text>}
        />
      </View>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  //incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  Meteor.subscribe('tasks');
  return {
     tasks:  Meteor.collection('tasks').find(),
     //incompleteCount: Meteor.collection('tasks').find({ checked: { $ne: true } }).count(),
     currentUser: Meteor.user(),
  };
}, App);

// AppRegistry.registerComponent('App', () => App);