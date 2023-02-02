const express = require('express');
const Haven = require('domain-haven');
const app = express();
const port = 3001;
const models = require('./models.js');
const router = require('./router.js')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(Haven.haven());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})