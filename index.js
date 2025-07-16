const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const messages = req.body.messages;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: messages,
    });

    res.json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Sheko AI Server is running on port 3000");
});
