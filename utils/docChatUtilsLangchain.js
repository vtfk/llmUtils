// Diverse funksjoner fra langchain
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain/prompts";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { loadQAStuffChain } from "langchain/chains";
import { HtmlToTextTransformer } from "langchain/document_transformers/html_to_text";
import fs from "fs";

import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();

// Global kontekst som legges til på alle spørringer
const kontekst =
  "Du skal alltid svare på en enkel og forståelig måte på norsk. Oppgi datoer, frister og kontaktpersoner hvis det er tilgjengelig. På slutten av responsen skal du alltid skrive teksten: 'Husk at responsen fra denne chatboten kan være upresis eller faktisk feil. Det er derfor viktig at du sjekker informasjonen du får her med med informasjon fra kilden.'";

export const askDok = async (dokType, dokPath, question) => {
  let splitDocs;
  // Sjekker dokumenttype og velger og kjører loader
  if (dokType === "pdf") {
    const loader = new PDFLoader(dokPath);
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    splitDocs = await textSplitter.splitDocuments(docs);
  } else if (dokType === "md") {
    const mdTekst = fs.readFileSync(dokPath, "utf8");
    const textSplitter = RecursiveCharacterTextSplitter.fromLanguage(
      "markdown",
      { chunkSize: 500, chunkOverlap: 50 }
    );
    splitDocs = await textSplitter.createDocuments([mdTekst]);
  } else if (dokType === "html") {
    const loader = new CheerioWebBaseLoader(dokPath);
    const docs = await loader.load();
    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
    const sequence = splitter.pipe(new HtmlToTextTransformer());
    splitDocs = await sequence.invoke(docs);
  }

  // Lager en vectorstore fra dokumentene
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    new OpenAIEmbeddings()
  );
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-1106",
    temperature: 0,
  });
  const retriever = MultiQueryRetriever.fromLLM({
    llm: model,
    retriever: vectorstore.asRetriever(),
    queryCount: 3,
    verbose: false,
  });

  // Uthenting av relevante "chunks" og spørring mot disse. Spørring gjentas 'queryCount' ganger
  const retrievedDocs = await retriever.getRelevantDocuments(question);
  const chain = loadQAStuffChain(model);
  console.log("Starter 'chainen'...");
  const res = await chain.call({
    input_documents: retrievedDocs,
    question: kontekst + question,
  });
  console.log(dokType, dokPath, question);
  console.log(res.text);
  return true;
};


export const askDokOpenAI = async () => {
  
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Du er en hyggelig assistent. Du skal kun svare på spørsmål med utgangspunkt i vedlagte fil.." },{ role: "user", content: "Hva står om underveisvurdering?" }],
    model: "gpt-3.5-turbo",
  });

  const myAssistant = await openai.beta.assistants.retrieve(
    "asst_PP9eODyAvv3Qtd7VJYTfmKEL"
  );

  //const emptyThread = await openai.beta.threads.create();
  //console.log(emptyThread);

  const run = await openai.beta.threads.runs.create(
    "thread_9IScPMsgbKKmGuBM0W78NWzy",
    { assistant_id: "asst_PP9eODyAvv3Qtd7VJYTfmKEL", instructions: "Hva står om kompetansemål i vedlagte fil?" }
  );

    console.log(run);
    console.log(completion.choices[0].message);
  return true;
}


