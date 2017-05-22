import { Quote } from "./classifyquote";

export default function normalizeQuote(quote : Quote) : string {
    let payload = "";

    if (quote) {
        quote.messages.map((message) => {
            message.body.split("\n").map((line) => {
                payload = payload.concat(`<${message.speaker}> ${line}\n`);
            });
        });
    }

    return payload;
}
