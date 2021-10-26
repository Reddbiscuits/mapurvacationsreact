const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: String,
  password: String, // hashed
});

const User = mongoose.model('User', userSchema);

module.exports = User;