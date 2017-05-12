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
        super(props);
        this.listener = this. __onKeyPress.bind(this);
        this.refreshing = false;
    }

    __onKeyPress(evt) {
        if (this.refreshing) return;
        if (evt.key !== "r" && evt.code !== "r") return;
        this.refreshing = true;

        this.api_handle.qdbQuoteRand()
            .then((quote) => {
                this.refreshing = false;
                this.setState({quote});
            })
            .catch((e) => console.error(e));

    }

    componentDidMount() {
        this.api_handle.qdbQuoteRand()
            .then((quote) => this.setState({quote}))
            .catch((e) => console.error(e));

        window.addEventListener("keyup", this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.listener);
    }
}

export default RandomQuote;
