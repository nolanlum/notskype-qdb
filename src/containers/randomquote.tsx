import Component from "inferno-component";

import Quote from "../components/quote";
import * as api from "../api/api";

import PermalinkQuote from "./permalinkquote";

interface RandomQuoteState {
    quote : api.Quote | null;
}

class RandomQuote extends PermalinkQuote {

    private listener : EventListener;
    private refreshing : boolean;

    constructor(props, context) {
        super(props, context);
        this.listener = this. __onKeyPress.bind(this);
        this.refreshing = false;

        this.state = {
            // will be undefined if not present in global context
            quote: context.quotes[Object.keys(context.quotes).shift()],
        };

    }

    __onKeyPress(evt) {
        if (this.refreshing) return;
        if (evt.key !== "r" && evt.code !== "r") return;
        this.refreshing = true;

        this.updateRandQuote();
        this.updateRandQuote()
            .then((quote) => {
                this.refreshing = false;
            })
            .catch((e) => console.error(e));

    }

    componentDidMount() {
        if (this.state && this.state.quote === undefined) {
            this.updateRandQuote();
        }

        window.addEventListener("keyup", this.listener);
    }

    updateRandQuote() {
        return this.context.randQuote().then((quote) => this.setState({quote: quote}));
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.listener);
    }
}

export default RandomQuote;
