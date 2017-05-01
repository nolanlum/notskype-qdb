import Component from "inferno-component";
import * as moment from "moment";

const Quote = ({id, author, speakerName, speakerIcon, body, addedAt}) =>
    <article class="quote">
        <img class="quote-profile-icon" src={speakerIcon} alt={`${author}'s icon`}/>
        <section class="quote-body">
            <p class="quote-text">{body}</p>
            <aside class="quote-speaker">- {speakerName}</aside>
        </section>
        <aside class="quote-timestamp">added by {author} {moment(new Date(addedAt)).fromNow()}</aside>
    </article>;

export default Quote;
