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

  try{

    const completion = await openai.chat.completions
                      .create({
                        model:'gpt-3.5-turbo',
                        messages:[{role:'user', content: query}]
                      });
    const aiResponse = completion.choices[0].message.content;
    res.json({answer: aiResponse});
  } catch(error) {
    console.error(error);
    res.status(500).json({error:'Error Processing the query'})
  }
})

module.exports = router;

