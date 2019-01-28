import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Scores } from '../api/scores.js';


// Score component - represents a single score item
export default class Score extends Component {

deleteThisScore() {
    Meteor.call('scores.remove', this.props.score._id);
}

  render() {

    return (
      <li className="scoreClassName" onClick={this.deleteThisScore.bind(this)}>
        <span className="text">
        <strong>{this.props.score.username}</strong>: { this.props.score.text.match(/^http.*\.(png|jpg|jpeg|gif|bmp)$/i) ? (
   <img className="scorethumb" src={ this.props.score.text }/>
 ) : this.props.score.text }
        </span>
      </li>
    );
  }
}


/*
Citations

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Adding user accounts.” meteor.com.
https://www.meteor.com/tutorials/react/adding-user-accounts (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Components.” meteor.com.
https://www.meteor.com/tutorials/react/components (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Publish and subscribe.” meteor.com.
https://www.meteor.com/tutorials/react/publish-and-subscribe (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Security with methods.” meteor.com.
https://www.meteor.com/tutorials/react/security-with-methods (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Update and Remove.” meteor.com.
https://www.meteor.com/tutorials/react/update-and-remove (accessed fall 2018)

*/
