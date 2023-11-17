import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI();

export const askRag = async () => {
    const message = await openai.beta.threads.messages.create(
        'thread_UQI9QX4rs0CHMJNwMVey6F0Z',
        {
          role: "user",
          content: "Hvilke kjerneelementer er det?"
        }
      )
    console.log(message.content);
    return message
}

export const createNewThread = async () => {
    const thread = await openai.beta.threads.create();
    console.log(thread);
    return thread;
}

export const showThread = async () => {
    const threadMessages = await openai.beta.threads.messages.list('thread_UQI9QX4rs0CHMJNwMVey6F0Z')

    for ( const m of threadMessages.data ) {
        console.log(m.content);
    } 
    console.log(threadMessages);
    return threadMessages;
}

export const runAssistant = async () => {
    const run = await openai.beta.threads.runs.create(
        'thread_UQI9QX4rs0CHMJNwMVey6F0Z',
        { 
          assistant_id: 'asst_PP9eODyAvv3Qtd7VJYTfmKEL',
          instructions: "Svar på norsk."
        }
    )
    console.log(run);
    };