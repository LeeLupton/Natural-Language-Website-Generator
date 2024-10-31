const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate HTML, CSS, and basic JavaScript for: ${prompt}`,
      max_tokens: 1500,
    });

    const html_code = response.data.choices[0].text.trim();
    res.json({ html_code });
  } catch (error) {
    res.status(500).json({ error: 'Error generating website code.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
