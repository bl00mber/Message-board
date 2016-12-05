const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./controllers/db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../config/config.json')

const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('./../webpack/common.config');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}

const htmlTemplate = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Message board</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
}

// Production middlewares
if (process.env.NODE_ENV !== 'development') {
  app.use('/static', express.static(__dirname + '/static'));
}

// MongoDB connect
db.setUpConnection();

// Middlewares
app.disable('x-powered-by')
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret',
  store: new MongoStore({
      url: `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
      autoRemove: 'interval',
      autoRemoveInterval: 10 // In minutes
    })
}))
//
/* *
 * Messages api handlers
 */
app.get('/messages', (req, res) => {
  db.loadMessages().then(data => { data.reverse(); res.send(data) });
});

app.post('/messages', (req, res) => {
  db.createMessage(req.body, req.session.user).then(data => res.send(data));
});

app.delete('/messages/:id', (req, res) => {
  db.deleteMessage(req.params.id).then(data => res.send(data));
});

/* *
 * User api handlers
 */
app.post('/login', (req, res, next) => {
  db.logIn(req, res, next).then(data => res.send(data));
});

app.post('/create-user', (req, res, next) => {
  db.createUser(req.body, next).then(data => res.send(data));
});

app.get('/restore-session', (req, res) => {
  (req.session.user) ? res.send(req.session.user) : res.end() ;
});

app.get('/logout', (req, res) => {
  if (req.session.user) delete req.session.user;
  res.redirect('/');
});

app.get('/enter', (req, res) => {
  (req.session.user) ? res.redirect('/') : res.send(htmlTemplate());
});

// Client-side routing
app.get(/.*/, (req, res) => {
  res.send(htmlTemplate())
});

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Express server listening on port %s', port)
  }
})
