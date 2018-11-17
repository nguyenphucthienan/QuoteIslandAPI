const mongoose = require('mongoose');
const { Schema } = mongoose;
const Role = mongoose.model('Role');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required',
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    required: 'First name is required'
  },
  lastName: {
    type: String,
    required: 'Last name is required'
  },
  photoUrl: {
    type: String,
    trim: true
  },
  moodMessage: {
    type: String,
    default: 'Hello!'
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }]
}, { timestamps: true });

userSchema.pre('save', async function hashPassword(next) {
  const user = this;

  const memberRole = await Role.findOne({ name: 'Member' });
  user.roles.push(memberRole);

  bcrypt.genSalt(10, (genSaltErr, salt) => {
    if (genSaltErr) {
      return next(genSaltErr);
    }

    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }

      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(inputPassword, callback) {
  bcrypt.compare(inputPassword, this.password, (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, result);
  });
};

mongoose.model('User', userSchema);
