import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { setSelectedUser, getSelectedUser } from '../ui/selecteduser';

export const Scores = new Mongo.Collection('scores');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('scores', function scoresPublication() {
    return Scores.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  // you have to specify the selectedUser so it gets sent to the server
  'scores.insert'(text,selectedUser) {

    // Make sure the user is logged in before inserting a score
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    user = selectedUser;
    Scores.insert({
      text: text,
      createdAt: new Date(),
      owner: this.userId,
      targetuser: user,
      username: Meteor.users.findOne(this.userId).username,
    });
    setSelectedUser(undefined);
  },
  'scores.remove'(scoreId) {
    check(scoreId, String);

    const score = Scores.findOne(scoreId);


    Scores.remove(scoreId);
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
