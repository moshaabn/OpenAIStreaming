import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemMessage = {
  role: "system",
  content:
    "You are a Askbot. You are supposed to answer the questions asked by the users. Validate the prompts to be a question and it should not in approprite. Give funky responses",
};

export const getStreamingCompletion = async ({ userPrompt }) => {
  return client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [systemMessage, { role: "user", content: userPrompt }],
    stream: true,
  });
};

export const getCompletion = async  (req, res) => {
    const data = req.body;
    // const data = {userPrompt:"القوى العاملة فى السعودية اعطنى بعض الاحصائيات"}
  let starttime = Date.now();
  const stream = await getStreamingCompletion({ userPrompt: data?.userPrompt });

let buffer = '';
for await (const part of stream) {
  buffer += part.choices[0]?.delta.content || "";
  let lastChar = buffer[buffer.length - 1];
  if (lastChar === ' ' || lastChar === '.' || lastChar === ',') {
    console.log(buffer);
    res.write(buffer);
    buffer = '';
  }
}
if (buffer) {
  console.log(buffer);
  res.write(buffer);
}
  res.end();
}