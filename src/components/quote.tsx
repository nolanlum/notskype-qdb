import Component from "inferno-component";
import * as moment from "moment";

require("../../style/quote.scss");

const Quote = ({id, author, body, addedAt}) =>
    <article class="quote">
        <section class="quote-body">
            <pre class="quote-text">
                {JSON.stringify(body, null, 2)}
            </pre>
        </section>
        <aside class="quote-timestamp">added by {author} {moment(new Date(addedAt)).fromNow()}</aside>
    </article>;

export default Quote;
