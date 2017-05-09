import Component from "inferno-component";
import * as moment from "moment";

import classifyQuote from "../lib/classifyquote";

require("../../style/quote.scss");

const lineRegex = /<([^>]+)> (.+)/;

interface Line {
    speaker : string;
    body : string;
}

function parseBody(body) : Line[] {
    let lines = body.split("\n").map((line) : Line => {
        let match = line.match(lineRegex);
        if (match) {
            return {
                speaker: match[1],
                body: match[2]
            };
        }
    });

    return lines.filter((line) => { return line !== undefined; });
}


const QuoteSegment = ({speaker, body}) => {
    let showUserInfo = speaker;
    return (
        <section class={showUserInfo ? "quote-segment" : "quote-segment follow"}>
            {showUserInfo ?
                <em class="quote-segment-speaker">{ speaker }</em>
                : null}
            <p class="quote-segment-body">{body}</p>
        </section>
        );
};

const Quote = ({id, author, body, addedAt}) => {
    let bodyElements;
    bodyElements = [];
    let previousSpeaker = undefined;
    let messages = parseBody(body);
    console.log(messages);
    for (let message of messages) {
        if (previousSpeaker === message.speaker) {
            bodyElements.push(
                <QuoteSegment
                    body={message.body}/>
            );
        } else {
            bodyElements.push(
                <QuoteSegment
                    speaker={message.speaker}
                    body={message.body}/>
            );
        }
        previousSpeaker = message.speaker;
    }

    return (
        <article class="quote">
            <section class="quote-body">
                <p class="quote-text">{bodyElements}</p>
            </section>
            <aside class="quote-timestamp">added by {author} {moment(new Date(addedAt)).fromNow()}</aside>
        </article>
    );
};

export default Quote;
