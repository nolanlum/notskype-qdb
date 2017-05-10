import Component from "inferno-component";
import * as api from "../api/api";

interface StateState {
    quotes : {[key : string] : string};
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
        };
    }

    getQuote(quoteId : string) {
        return new Promise((resolve, reject) => {
            let existingQuote = this.state.quotes[quoteId];
            console.log("ahh", this.state, quoteId, existingQuote);
            if (existingQuote !== undefined) {
                resolve(existingQuote);
            } else {
                console.log("fetching quote", quoteId);
                this.api_handle.qdbQuoteGetById({
                        quoteId: parseInt(quoteId)
                    })
                    .then((quote) => {
                        this.setState({
                            quotes: {
                                [quoteId]: quote
                            }
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

    addQuotes(quotes) {
        this.setState({
            quotes: Object.assign(this.state.quotes, quotes),
        });
    }

    render() {
        return this.props.children;
    }
}

export default State;
