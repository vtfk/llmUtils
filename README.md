# Eksperimentell sandkasse for bruk av språkmodeller til dokument-søk

Dette repoet er en eksperimentell sandkasse for å teste ut bruk av språkmodeller til å søke i dokumenter. Det er en POC for å teste ut funksjonalitet og muligheter. Det er ikke ment for produksjon. Funksjonene finnes i fila ```lmDocSearchUtils.js```. For testing så kan de kalles ```index.js```

Funksjonene benytter seg av funksjonalitet fra rammeverket [langchain](https://js.langchain.com/docs/get_started/introduction)

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
```simpleAskDok()``` - Enkel POC for å spørre mot et dokument
```askDok()``` - Mer funksjonalitet som multiquery og kontekst
```askWeb()``` - Spør mot et nettside. Godt egnet for å spørre mot SNL eller Wikipedia

## ToDo og veien videre?
Funskjonalitetsønsker:
Pri 1: En enkel fronttend som kan bakes inn som en chatBot på innsida med mulighet for å spørre mot dokumenter (Forhåndsdefinerte eller at bruker kan laste opp egne?)
Pri 2: En teamsapp (chatVTFK 2.0) med dokSøk-funksjonalitet
Pri 2: En generisk chatbot med mulighet for brukerne å laste opp egne dokumenter (pdf...)