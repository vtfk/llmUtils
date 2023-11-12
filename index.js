import { simpleAskDok, askDok, askWeb } from "./llmDocSearchUtils.js";

// console.log(simpleAskDok("./docs/orden.pdf", "Hvor gjelder reglene?"));
console.log(askDok("./docs/delingsinfo.md", "Hvem er primærkontakter i Telemark?"));
// console.log(askWeb("https://snl.no/t%C3%A5ke", "Hva er tåke?"))
