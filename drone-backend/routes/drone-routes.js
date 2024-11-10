const express = require('express');
const router = express.Router();
const {OpenAI} = require('openai');
const data = require('../drone-Data');

const openai = new OpenAI({
  apiKey : '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'
})



//GET all drone data
router.get('/', (req, res) => {
  res.json(data);
})

//GET drone data by image_id
router.get('/:id', (req, res) => {
  const image_id = req.params.id;
  const droneData = data.find(d => d.image_id === image_id);
  if(droneData) {
    res.json(droneData);
  } else {
    res.status(404).send('Sorry... Drone data not found');
  }
})

//POST route for user queries
router.post('/query', async (req, res) => {
  const query = req.body.query;
  console.log('UserQuery::', query);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: query }]
    });

    // Check the rate limit headers
    const remainingRequests = completion.headers['x-ratelimit-remaining'];
    const resetTime = completion.headers['x-ratelimit-reset'];
    console.log(`⁠ Remaining requests: ${remainingRequests}`);

    console.log(`Rate limit resets at: ${new Date(resetTime * 1000)}`);

    const aiResponse = completion.choices[0].message.content;
    res.json({ answer: aiResponse });
  } catch (error) {
    console.error('Error:', error);  // Log the full error
    res.status(500).json({ error: 'Error Processing the query', details: error.message });
  }

})

////POST route for user queries - alternative

router.post('/drone/mockQuery', (req, res) => {
  const userQuery = req.body.query;
 
  const query = userQuery.split(' ');
 
  console.log('data::', data);

  if( query.includes("time") ) {
    
    res.json({
      status : 'Success',
      message : 'Data retrived',
      data: data.default[0].timestamp
    })

  } else if(query.includes("latitude")) {

    res.json({
      status: 'Success',
      message: 'Data Retrived!',
      data: data.default[0].latitude
    })
    
  } else if(query.includes("longitude")) {
    res.json({
      status : 'Success',
      message : 'Drone Data retrived!',
      data : data.default[2].longitude
    })

  } else if(query.includes("altitude")) {

    res.json({
      status : 'Success',
      message : 'Drone Data retrived!',
      data : data.default[2].altitude_m
    })

  } else if(query.includes('focal')){

    res.json({
      status : 'Success',
      message: 'Drone Data Retrived!',
      data : data.default[1].focal_length_mm
    })
  }else if(query.includes('battery')){
    
    res.json({
      status: 'Success',
      message: 'Drone Data retrived!',
      data : data.default[4].battery_level_pct
    })
  }else if(query.includes('shutter') && query.includes('speed')){
    res.json({
      status: 'Success',
      message: 'Drone Data retrived!',
      data : data.default[5].shutter_speed
    })
  }else if(query.includes('aperture')){
    res.json({
      status: 'Success',
      message: 'Drone Data retrived!',
      data : data.default[1].aperture
    })
  } else {
    res.json({'Response':'Query not recogonized'});
  }

})

module.exports = router;

