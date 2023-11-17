import OpenAI from "openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const speechFile = path.resolve("./speech.mp3");

export const createNewThread = async () => {
  const thread = await openai.beta.threads.create();
  console.log(thread);
  return thread;
};

export const askDok = async (assistantID, threadID, prompt) => {
  console.log(assistantID || process.env.ASSISTANT, threadID, prompt);
  const message = await openai.beta.threads.messages.create(threadID, {
    role: "user",
    content: prompt,
  });
  const run = await openai.beta.threads.runs.create(threadID, {
    assistant_id: assistantID,
    instructions: "Svar på norsk.",
  });

  let response = new Promise((resolve, reject) => {
    let intervalId = setInterval(async () => {
      const updatedRun = await openai.beta.threads.runs.retrieve(
        threadID,
        run.id
      ); // Replace with actual function to fetch updated run status
      console.log("Waiting for completion: ", updatedRun.status);
      if (updatedRun.status === "completed") {
        clearInterval(intervalId);
        resolve(await openai.beta.threads.messages.list(threadID).data[0].content[0].text.value);
      }
    }, 1000);
  });
  return response;
};
export const createSpeech = async (speech) => {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: speech,
    voice: "shimmer",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
  // Her kan vi returnere noe
  return true;
};
