import { askDok } from "./llmDocSearchUtils.js";

// console.log(askDok("html", "https://snl.no/Vestfold_og_Telemark", "Finnes det noen stavkirker i fylket?"));
console.log(askDok("md", "docs/delingsinfo.md", "Hvem er primærkontakter i Vestfold?"))

