import Component from "inferno-component";
import * as moment from "moment";

import classifyQuote from "../lib/classifyquote";

require("../../style/quote.scss");

const lineRegex = /<([^>]+)> (.+)/;
const multilineRegex = /(^<([^>]+)> (.+)$(?:\r\n|\n)?)+/m;

interface Line {
    speaker : string;
    body : string;
}

function isFormattedMessage(str) {
    let match = str.match(multilineRegex);
    return match && match[0] === str;
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

    if (isFormattedMessage(body)) {
        // if the quote is normalized to an irc format, display it
        // as a back & forth
        let messages = parseBody(body);
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
    } else {
        // if the message is not formatted as IRC (not recognized on submit)
        // render the text as raw
        bodyElements.push(body);
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
