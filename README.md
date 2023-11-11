# Eksperimentell sandkasse for bruk av språkmodeller til dokument-søk

Funksjonene benytter seg av funksjonalitet fra rammeverket [langchain](https://js.langchain.com/docs/get_started/introduction)

## Funksjoner
    simpleAskDok() - Enkel POC for å spørre mot et dokument
    askDok() - Mer funksjonalitet som multiquery og ChromaDB på lokal disk
    askWeb() - Spør mot et nettside. Godt egnet for å spørre mot SNL eller Wikipedia

Hovedflyt:
    Hvis innholdet ikke er splittet og indeksert:
        Last inn innholdet (md, pdf, .....)
        Splitt og indekser innholdet
    Hvis innholdet er splittet og indeksert:
        Kjør spørring mot innholdet med langchain/embeddings
    Returner responsen

Funskonalitetsønsker:
Pri 1:
  En enkel fronttend som kan bakes inn som en chatBot på innsida
Pri 2:
  En generisk chatbot med mulighwt for brukerne å laste opp egne dokumenter (pdf...)
  En teamsapp (chatVTFK 2.0) med dokSøk-funksjonalitet