import { simpleAskDok, askDok, askWeb } from "./llmDocSearchUtils.js";

console.log(simpleAskDok("./docs/orden.pdf", "Har jeg noen plikter?"));
// console.log(askDok("./docs/delingsinfo.md", "Hva er fristene til HR?"));
// console.log(askWeb("https://snl.no/andre_verdenskrig", "Hva skjedde 8. mai i Norge?"))

