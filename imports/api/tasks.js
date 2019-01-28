import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { setSelectedUser, getSelectedUser } from '../ui/selecteduser';

export const Tasks = new Mongo.Collection('tasks');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  // you have to specify the selectedUser so it gets sent to the server
  'tasks.insert'(text,selectedUser) {

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    user = selectedUser;
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: this.userId,
      targetuser: user,
      username: Meteor.users.findOne(this.userId).username,
    });
    setSelectedUser(undefined);
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);


    Tasks.remove(taskId);
  },
});


/*
Citations

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Collections.” meteor.com.
https://www.meteor.com/tutorials/react/collections (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Publish and subscribe.” meteor.com.
https://www.meteor.com/tutorials/react/publish-and-subscribe (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Security with methods.” meteor.com.
https://www.meteor.com/tutorials/react/security-with-methods (accessed fall 2018)

*/

/*

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Scores } from '../api/scores.js';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Task from './Task.js';
import Score from './Score.js';
import IndividualFile from './FileIndividualFile2.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import FileUpload from './FileUpload.js';
import UserList from './UserList2.js';
import { getSelectedUser } from './selecteduser.js';

  // App component - represents the whole app
  class App extends Component {

    handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('scores.insert', text, getSelectedUser());

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }


    renderScores() {
      let myScores = this.props.scores;
      let recentScore;
    //  let index1;

      // show those for US or for anyone!
      myScores = myScores.filter(score =>
        score.targetuser == Meteor.userId()
      );
      if (myScores.length > 1) {
        Meteor.call('scores.remove', myScores[0]._id);
      }

  //    myTasks = myTasks.reverse();

      myScores = myScores.length > 1 ? [ myScores[myScores.length - 1] ] : myScores;

  //    index1 = myTasks.find[1];

  //    console.log(index1);


      return myScores.map((score) => {
          return (
            <Score
              key={score._id}
              score={score}
            />
          );
      });
    }

    prepareMyScores() {
      let scores = this.props.scores;
      let myScores = scores.filter(score =>
      score.targetuser == Meteor.userId()
      );
      return (
        myScores
      )
    }

    passAllScores() {
      let passAllScores = this.props.scores.username;
      return (
        passAllScores
      )
    }

  render() {
let passMyScores = this.prepareMyScores();
let passAllScores = this.passAllScores();

    return (
      <div>
        <div className="app-container">
        <header>
        <AccountsUIWrapper />
          <h1>Players</h1>

        </header>
          <UserList myScores={passMyScores} passAllScores={passAllScores}/>
          <div className="material">
            <ul>
              {this.renderScores()}
            </ul>
          </ div>

          <FileUpload />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {


  return {
    scores: Scores.find({}, { sort: { createdAt: 1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);

*/
