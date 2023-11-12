// Diverse funksjoner fra langchain
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain/prompts";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { loadQAStuffChain } from "langchain/chains";
import { HtmlToTextTransformer } from "langchain/document_transformers/html_to_text";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

const kontekst = "Du skal alltid svare på en enkel og forståelig måte på norsk. Oppgi datoer, frister og kontaktpersoner hvis det er tilgjengelig. På slutten av responsen skal du alltid skrive teksten: 'Husk at responsen fra denne chatboten kan være upresis eller faktisk feil. Det er derfor viktig at du sjekker informasjonen du får her med med informasjon fra kilden.'";

// Funksjon som spør mot en pdf. Enkel POC med loader for å teste funksjonalitet
export const simpleAskDok = async (dokPath, prompt) => {
  const loader = new PDFLoader(dokPath);
  const docs = await loader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 300, chunkOverlap: 100 });
  const splitDocs = await textSplitter.splitDocuments(docs);
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo-1106" });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const response = await chain.call({
    query: kontekst + prompt,
  });
  console.log(response);
  return response;
};

// Funksjon som spør mot et markdowndokument med mer avansert funksjonalitet som multiquery og kontekst
export const askDok = async (dokPath, question) => {
  const mdTekst = fs.readFileSync(dokPath, 'utf8');
  
  // Splitting av dokumentet
  const textSplitter = RecursiveCharacterTextSplitter.fromLanguage('markdown', {chunkSize: 500, chunkOverlap: 50});
  const mdOutput = await textSplitter.createDocuments([mdTekst]);

  // Indeksering og preprosessering
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo-1106" });
  const vectorstore = await MemoryVectorStore.fromDocuments(mdOutput, new OpenAIEmbeddings());
  const retriever = MultiQueryRetriever.fromLLM({
    llm: model,
    retriever: vectorstore.asRetriever(),
    queryCount: 3,
    verbose: false,
  });

  // Uthenting av relevante "chunks" og spørring mot disse. Spørring gjentas 'queryCount' ganger
  console.log("Nuuuu kjørrr vi chainen")
  const retrievedDocs = await retriever.getRelevantDocuments(question);
  const chain = loadQAStuffChain(model);
  const res = await chain.call({ 
    input_documents: retrievedDocs,
    question: kontekst + question
  });
  console.log(res)  
  return true
}

// Funksjon som spør mot et webdokument med funksjonalitet som multiquery og prompttemplate
export const askWeb = async (webUrl, prompt) => {
  const loader = new CheerioWebBaseLoader(webUrl);
  const docs = await loader.load();
  // Indeksering og preprosessering
  // Splitting av dokumentet
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
  const transformer = new HtmlToTextTransformer();
  const sequence = splitter.pipe(transformer);
  const newDocuments = await sequence.invoke(docs);
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo-1106" });
  const vectorstore = await MemoryVectorStore.fromDocuments(newDocuments, new OpenAIEmbeddings());
  const retriever = MultiQueryRetriever.fromLLM({
    llm: model,
    retriever: vectorstore.asRetriever(),
    queryCount: 3,
    verbose: true,
  });

  // Uthenting av relevante "chunks" og spørring mot disse. Spørring gjentas 'queryCount' ganger
  console.log("Nuuuu kjørrr vi chainen")
  const retrievedDocs = await retriever.getRelevantDocuments(prompt);
  const chain = loadQAStuffChain(model);
  const res = await chain.call({ 
    input_documents: retrievedDocs,
    question: kontekst + prompt
  });
  
  console.log(res)  
  // console.log(dokPath, prompt);
  // console.log(retrievedDocs);
  return res
}
