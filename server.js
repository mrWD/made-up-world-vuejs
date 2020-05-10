const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const port = process.env.PORT || 5000;

app = express();
app.use(serveStatic(__dirname));

app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/index.html'));
});

app.listen(port);

console.log('server started ' + port);
