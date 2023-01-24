const express = require('express');
const app = express();
const port = 3001;
const models = require('./models.js');
const router = require('./router.js')

app.use('/', router)

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})