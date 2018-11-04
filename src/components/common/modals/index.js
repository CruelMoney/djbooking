import addTranslate from "../../higher-order/addTranslate";
import PayUsingCueupDJ from "./PayUsingCueupDJ";
import PayUsingCueupOrganizer from "./PayUsingCueupOrganizer";
import content from "./content.json";

const e1 = addTranslate(PayUsingCueupDJ, [content]);
const e2 = addTranslate(PayUsingCueupOrganizer, [content]);

export { e1 as PayUsingCueupDJ, e2 as PayUsingCueupOrganizer };
