# Eksperimentell sandkasse for bruk av språkmodeller til dokument-søk

Dette repoet er en eksperimentell sandkasse for å teste ut bruk av språkmodeller til å gjøre smarte søke i dokumenter. Innholdet her er en POC for å teste funksjonalitet og muligheter og er ikke ment for produksjon.

Repoet inneholder to "biblioteker" med funksjoner som kan brukes til spørringer mot språkmodeller.

* ```docChatUtilsLangchain.js``` - Funksjoner for å søke i dokumenter ved hjelp av språkmodeller. Bruker RAG (Retrieval Augmented Generation) for å dele opp dokumenter i mindre deler (chunks) som kan søkes mot.
* ```docChatUtilsOpenAI.js``` - Diverse funksjoner som benytter seg av OpenAI sitt nye API med bl.a. assistener m.m.

Funksjonen(e) er bygget ved hjelp av rammeverket [langchain](https://js.langchain.com/docs/get_started/introduction) som er laget for å gjøre det enkelt å bruke språkmodeller. Koden i dette repoet bruker samme API som chatVTFK med egen datavatale. 

### Slik kommer du i gang

Du må ha node installert på maskinen din. Klone ned repoet til ønsket mappe. Deretter kan du kjøre følgende kommandoer for å installere og kjøre koden:
```bash
npm install
npm run start
```

Funksjonene kan kjøres og tilpasses fra index.js

Husk å sette miljøvariabler i .env-fila. Se env.example

## RAG - Retrieval Augmented Generation

[RAG](https://js.langchain.com/docs/use_cases/question_answering/) er en teknikk for å dele opp store dokumenter i mindre deler (chunks). Disse delene blir indeksert og kan deretter spørres mot. Når en spørring kommer inn, vil RAG returnere en liste med deler som passer til spørringen. Delene blir sendt med som en del av prompten til språkmodellen. Dette kalles embedding. Språkmodellen vil da returnere en liste med svar som passer til prompten og konteksten.

![qa_flow](./img/qa_flow.jpeg)

## Funksjoner
```askDok((dokType, dokPath, question))``` - Funksjon som søker i angitt dokument. Innparameter: dokType: type dokument, dokPath: path til dokumentet, question: spørsmål som skal søkes etter. Returnerer streng med responsen.

dokTyper som støttes er:
  * "md" - MarkDown
  * "pdf" - PDF
  * "html" - HTML

## ToDo og veien videre?
Funskjonalitetsønsker:

Pri 1: En enkel fronttend som kan bakes inn som en chatBot på innsida med mulighet for å spørre mot dokumenter (Forhåndsdefinerte eller at bruker kan laste opp egne?)

Pri 2: En teamsapp (chatVTFK 2.0) med dokSøk-funksjonalitet

Pri 2: En generisk chatbot med mulighet for brukerne å laste opp egne dokumenter (pdf...)
