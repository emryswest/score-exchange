import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

/*
Citations

Schmidt, Geoff and Matt DeBergalis. (n.d.) “Meteor - Todo App with React: Adding user accounts.” meteor.com.
https://www.meteor.com/tutorials/react/adding-user-accounts (accessed fall 2018)

*/
