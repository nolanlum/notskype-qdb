import Component from "inferno-component";

import Quote from "../components/quote";
import * as api from "../api/api";

import PermalinkQuote from "./permalinkquote";

interface RandomQuoteState {
    quote : api.Quote | null;
}

class RandomQuote extends PermalinkQuote {

    constructor(props, context) {
        super(props, context);
        this.state = {
            // will be undefined if not present in global context
            quote: context.quotes[Object.keys(context.quotes).shift()],
        };
    }

    componentDidMount() {
        if (this.state && this.state.quote === undefined) {
            this.updateRandQuote();
        }
    }

    updateRandQuote() {
        this.context.randQuote().then((quote) => this.setState({quote: quote}));
    }

}

export default RandomQuote;
