const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const data = require('./drone-Data');

const app = express();
//middleware
app.use(cors());
app.use(bodyParser.json());

//import routes
const droneRoutes = require('./routes/drone-routes');

app.use('/api',droneRoutes);

const PORT = 3100;

app.listen(PORT, () => {
  console.log(`Server running on Port : ${PORT}`);
})