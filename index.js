require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}

async function main() {
  try {
    const userPrompt = await getUserInput("Enter prompt: ");

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userPrompt }],
    });

    console.log(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error while fetching models:", error);
  }
}

main();
