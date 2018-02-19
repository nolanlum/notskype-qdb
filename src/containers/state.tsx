import {Component} from "inferno";
import * as api from "../api/api";

interface StateState {
    quotes : {[id : number] : api.Quote};
}

interface StateProps {
    initialState : StateState;
}

class State extends Component<StateProps, StateState> {
    private api_handle : api.QuoteApi;

    constructor(props) {
        super(props);
        this.state = props.initialState || {quotes: {}};
        this.api_handle = new api.QuoteApi();
    }

    getChildContext() {
        return {
            quotes: this.state.quotes,
            addQuote: this.addQuotes.bind(this),
            getQuote: this.getQuote.bind(this),
            randQuote: this.randQuote.bind(this),
        };
    }

    getQuote(quoteId : number) {
        return new Promise((resolve, reject) => {
            let existingQuote = this.state.quotes[quoteId];
            if (existingQuote !== undefined) {
                resolve(existingQuote);
            } else {
                this.api_handle.qdbQuoteGetById({
                        quoteId: quoteId
                    })
                    .then((quote) => {
                        this.setState({
                            quotes: {
                                ...this.state.quotes,
                                [quoteId]: quote,
                            },
                        });
                        resolve(quote);
                    })
                    .catch((e) => {
                        console.error(e);
                        reject(e);
                    });
            }
        });
    }

    randQuote() {
        return new Promise((resolve, reject) => {
            this.api_handle.qdbQuoteRand()
                .then((quote) => {
                    this.setState({
                        quotes: {
                            ...this.state.quotes,
                            [quote.id]: quote,
                        },
                    });
                    resolve(quote);
                })
                .catch((e) => {
                    console.error(e);
                    reject(e);
                });
        });
    }

    addQuotes(quotes : api.Quote[]) {
        let additionalQuotes = {};
        quotes.forEach((quote) => additionalQuotes[quote.id] = quote);

        this.setState({
            quotes: Object.assign(this.state.quotes, additionalQuotes),
        });
    }

    render() {
        return this.props.children;
    }
}

export default State;
