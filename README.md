# Eksperimentell sandkasse for bruk av språkmodeller til dokument-søk

Dette repoet er en eksperimentell sandkasse for å teste ut bruk av språkmodeller til å søke i dokumenter. Det er en POC for å teste ut funksjonalitet og muligheter. Det er ikke ment for produksjon. Funksjonene finnes i fila ```lmDocSearchUtils.js```. For testing så kan de kalles ```index.js```

Funksjonene benytter seg av funksjonalitet fra rammeverket [langchain](https://js.langchain.com/docs/get_started/introduction)

### Slik kommer du i gang

Du må ha node installert. Klone ned repoet på egen maskin Så kan du kjøre følgende kommandoer:
```bash
npm install
npm run start
```

Du kan teste trigge funksjonene fra index.js

## RAG - Retrieval Augmented Generation

RAG er en teknikk for å dele opp store dokumenter i mindre deler (chunks). Disse delene blir indeksert og kan deretter spørres mot. Når en spørring kommer inn, vil RAG returnere en liste med deler som passer til spørringen. Delene blir sendt med som en del av prompten til språkmodellen. Dette kalles embedding. Språkmodellen vil da returnere en liste med svar som passer til prompten og konteksten.

![qa_flow](./img/qa_flow.jpeg)

## Funksjoner
    simpleAskDok() - Enkel POC for å spørre mot et dokument
    askDok() - Mer funksjonalitet som multiquery og ChromaDB på lokal disk
    askWeb() - Spør mot et nettside. Godt egnet for å spørre mot SNL eller Wikipedia

## TODO og løse notater
Hovedflyt:
    Hvis innholdet ikke er splittet og indeksert:
        Last inn innholdet (md, pdf, .....)
        Splitt og indekser innholdet
    Hvis innholdet er splittet og indeksert:
        Kjør spørring mot innholdet med langchain/embeddings
    Returner responsen

Funskjonalitetsønsker:
Pri 1: En enkel fronttend som kan bakes inn som en chatBot på innsida
Pri 2: En teamsapp (chatVTFK 2.0) med dokSøk-funksjonalitet
Pri 2: En generisk chatbot med mulighet for brukerne å laste opp egne dokumenter (pdf...)
