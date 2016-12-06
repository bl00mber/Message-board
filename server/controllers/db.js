const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// AWS cloud MongoDB hosting
let mongoURI;
if (process.env.NODE_ENV === 'production') {
  mongoURI = 'mongodb://bloomber-mlab-user:sdaYDh2d@ds127428.mlab.com:27428/mongo-board';
} else {
  mongoURI = 'mongodb://localhost:27017/boarddb';
}

/**
 * Message model
 */
const MessageSchema = new Schema({
  username  : { type: String },
  color     : { type: String },
  text      : { type: String },
  createdAt : { type: Date }
}, { capped: 1024 });

mongoose.model('Message', MessageSchema);

const Message = mongoose.model('Message');

/**
 * User model
 */
const UserSchema = new Schema({
  username  : { type: String, unique: true, required: true },
  password  : { type: String, required: true },
  color     : { type: String }
}, { capped: 1024 });

mongoose.model('User', UserSchema);

const User = mongoose.model('User');


/**
 * DB API
 */
module.exports = {
  setUpConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoURI);
  },

  // Message model utils
  loadMessages() {
      Message.count()
      return Message.find()
  },
  createMessage(data, user) {
      if (typeof user === 'undefined') {
        user = {
          username: 'Anonym',
          color: '#202020'
        };
      }

      let newText = data.text.replace(/<[^>]+>/g,'').replace(/\[b\]/,'<b>').replace(/\[\/b\]/,'</b>').replace(/\[i\]/,'<i>').replace(/\[\/i\]/,'</i>').replace(/\[s\]/,'<s>').replace(/\[\/s\]/,'</s>');

      const message = new Message({
          username: user.username,
          color: user.color,
          text: newText,
          createdAt: new Date()
      });
      return message.save();
  },
  deleteMessage(messageId) {
      return Message.findById(messageId).remove();
  },

  // User model utils
  getUser(id) {
    return User.findOne(id)
  },
  logIn(req, res, next) {
    console.dir(req.body)
    return User
      .findOne({ username: req.body.username })
      .then((user) => {
        if (user.password == req.body.password) {
          console.log('Password is OK');
          req.session.user = {
            id: user._id,
            username: user.username,
            color: user.color
          }
          return Promise.resolve(req.session.user)
        } else {
          return Promise.reject('Password is wrong')
        }
      })
      .catch((err) => {
        return next(err)
      })
  },
  createUser(data, next) {
    return User
      .findOne({ username: data.username })
      .then(() => {
        // Random color generator
        let letters = '012345'.split('');
        let color = '#';
        color += letters[Math.round(Math.random() * 5)];
        letters = '0123456789ABCDEF'.split('');
        for (let i = 0; i < 5; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }

        const user = new User({
            username: data.username,
            password: data.password,
            color: color
        });

        return user.save();
      })
      .catch((err) => {
        return next(err)
      })
  }
}
