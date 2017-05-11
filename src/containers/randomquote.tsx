import Component from "inferno-component";

import Quote from "../components/quote";
import * as api from "../api/api";

import PermalinkQuote from "./permalinkquote";

interface RandomQuoteState {
    quote : api.Quote | null;
}

class RandomQuote extends PermalinkQuote {

    componentDidMount() {
        this.api_handle.qdbQuoteRand()
            .then((quote) => this.setState({quote}))
            .catch((e) => console.error(e));
    }

}

export default RandomQuote;
