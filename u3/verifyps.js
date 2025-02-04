const bcrypt = require("bcrypt");

const argv = process.argv;
const argc = argv.length;

const verify = function (user, pwd) {
  // read user in db
  // extract password as readpwd, here we use eknown hash for demo
  let readpwd = "$2a$10$wHDAWGHfNzFwten5wVh1KOSKq63CGTh0bJMBIeXUSoPJyRtRN6I2O";
  let rc = bcrypt.compareSync(pwd, readpwd);
  return rc;
};

let enteredpassword = argv[2];
if (verify("dummy", enteredpassword)) {
  console.log("You chose wisely, you are in");
} else {
  console.log("Try again");
}
