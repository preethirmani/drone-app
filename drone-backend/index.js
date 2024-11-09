const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const data = require('./drone-Data');



const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 3100;

console.log('drone Data', data);

app.listen(PORT, () => {
  console.log(`Server running on Port : ${PORT}`);
})