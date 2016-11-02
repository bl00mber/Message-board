const fs = require('fs');
const babelrc = fs.readFileSync('./.babelrc');
const config = JSON.parse(babelrc);
require('babel-core/register')(config);

// import cors from 'cors';
// import bodyParser from 'body-parser';
// import * as db from './server/utils/DataBaseUtils';

const http = require('http');
const express = require('express');
const app = express();

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));

  app.use(express.static(__dirname + '/'));
})();

app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});


// db.setUpConnection();
// app.use( bodyParser.json() );
// app.use(cors({ origin: '*' }));
//
// // RESTful api handlers
// app.get('/notesdb', (req, res) => {
//     db.listNotes().then(data => res.send(data));
// });
//
// app.post('/notesdb', (req, res) => {
//     db.createNote(req.body).then(data => res.send(data));
// });
//
// app.delete('/notesdb/:id', (req, res) => {
//     db.deleteNote(req.params.id).then(data => res.send(data));
// });


const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
