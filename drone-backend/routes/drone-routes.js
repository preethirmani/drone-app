const express = require('express');
const router = express.Router();
const data = require('../drone-Data');


//get all drone data
router.get('/', (req, res) => {
  res.json(data);
})

