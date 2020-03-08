const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/routes');
const port = process.env.PORT || 3000;

function main() {
  const app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(express.static(path.join(process.cwd(), 'public')));

  app.set('view engine', 'ejs');
  app.set('views', path.join(process.cwd(), 'views'));

  app.use(router);

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}

module.exports = main;
