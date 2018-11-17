const bcrypt = require('bcrypt-nodejs');

class BcryptHelpers {
  static hashPassword(password) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (genSaltErr, salt) => {
        if (genSaltErr) {
          return reject(genSaltErr);
        }

        return bcrypt.hash(password, salt, null, (hashErr, hash) => {
          if (hashErr) {
            return reject(hashErr);
          }

          return resolve(hash);
        });
      });
    });
  }
}

module.exports = BcryptHelpers;
