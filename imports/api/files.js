import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const UserFiles = new FilesCollection({collectionName: 'userfiles'});

if (Meteor.isClient) {
  Meteor.subscribe('userfiles.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('userfiles.images.all', function () {
    return UserFiles.find().cursor;
  });
}

/*
Citations

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Collections.” meteor.com.
https://www.meteor.com/tutorials/react/collections (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Publish and subscribe.” meteor.com.
https://www.meteor.com/tutorials/react/publish-and-subscribe (accessed fall 2018)

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Security with methods.” meteor.com.
https://www.meteor.com/tutorials/react/security-with-methods (accessed fall 2018)

*/
