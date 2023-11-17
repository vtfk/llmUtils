// import { askDok, askDokOpenAI } from "./utils/docChatUtilsLangchain.js";
// import { askRag, showThread, createNewThread, runAssistant } from "./utils/docChatUtilsTemp.js";
import { createSpeech, createNewThread, askDok } from "./utils/docChatUtilsOpenAI.js";


const artikkel = "https://www.utdanningsnytt.no/eksamen-karakterer-kvalitetsvurderingssystem/utvalg-foreslar-a-avvikle-dagens-nasjonale-prover/380387"
const spørsmål = "Hva er den kommunitative lov? Forklar på en enkel måte";


// console.log(askDok("html", artikkel, spørsmål));
// console.log(askDok("pdf", "./docs/MB_bm.pdf", spørsmål));

// console.log(createNewThread());
// console.log(askRag());
// console.log(showThread());
// console.log(runAssistant());
// console.log(createSpeech(Hei hei.`));

// console.log(createNewThread());
console.log(await askDok("asst_PP9eODyAvv3Qtd7VJYTfmKEL", "thread_xGR6QNsAbB6LZIOBoHYoN6QE", "Punkt 2 var spennende. Kan du si mer om det?"))
