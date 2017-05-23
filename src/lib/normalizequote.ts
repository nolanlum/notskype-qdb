import { Quote } from "./classifyquote";

export default function normalizeQuote(quote : Quote) : string {
    let payload = "";

    if (!quote) return payload;

    if (quote.messages !== undefined) {
        quote.messages.map((message) => {
            message.body.split("\n").map((line) => {
                payload = payload.concat(`<${message.speaker}> ${line}\n`);
            });
        });
    } else if (quote.message !== undefined) {
        payload = quote.message;
    } else {
        console.error("quote with no message", quote);
    }

    return payload;
}
