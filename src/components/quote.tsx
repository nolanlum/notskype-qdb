import Component from "inferno-component";
import * as moment from "moment";

import classifyQuote from "../lib/classifyquote";

require("../../style/quote.scss");

const QuoteSegment = ({speaker, displayIcon, body}) => {
    let showUserInfo = speaker || displayIcon;
    return (
        <section class={showUserInfo ? "quote-segment" : "quote-segment follow"}>
            {showUserInfo ?
                [
                    <img class="quote-segment-icon" src={displayIcon}/>,
                    <em class="quote-segment-speaker">{speaker}</em>
                ]
                : null}
            <p class="quote-segment-body">{body}</p>
        </section>
        );
};

const Quote = ({id, author, body, addedAt}) => {
    const parsedBody = classifyQuote(body);
    let bodyElements;
    if (parsedBody.type === "unrecognized") {
        bodyElements = parsedBody.message;
    } else {
        bodyElements = [];
        let previousSpeaker = undefined;
        for (let message of parsedBody.messages) {
            if (previousSpeaker === message.speaker) {
                bodyElements.push(
                    <QuoteSegment
                        body={message.body}/>
                );
            } else {
                bodyElements.push(
                    <QuoteSegment
                        displayIcon={"https://placehold.it/64x64"}
                        speaker={message.speaker}
                        body={message.body}/>
                );
            }
            previousSpeaker = message.speaker;
        }
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
