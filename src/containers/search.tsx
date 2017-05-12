import Component from "inferno-component";

import Quote from "../components/quote";
import * as api from "../api/api";

interface PermalinkQuoteProps {
    params : {
        query : string,
    };
}

interface PermalinkQuoteState {
    quotes : api.Quote[] | null;
}

class PermalinkQuote extends Component<PermalinkQuoteProps, PermalinkQuoteState> {

    private api_handle : api.QuoteApi;

    constructor(props) {
        super(props);
        this.api_handle = new api.QuoteApi();
        this.state = {
            quotes: null
        };
    }

    componentDidMount() {
        this.updateQuote(this.props.params.query);
    }

    updateQuote(query) {
        if (query) {
            this.api_handle.qdbQuoteFind({
                    "query": query
                })
                .then((quotes) => this.setState({quotes}))
                .catch((e) => console.error(e));
        }
    }

    render() {
        if (this.state && this.state.quotes) {
            let {quotes} = this.state;
            return <section class="quote-container">
                    {quotes.map((quote) =>
                        <Quote
                            id={ quote.id }
                            author={ quote.author }
                            body={ quote.body }
                            addedAt={ quote.addedAt }
                        />)}
                </section>
   ;     } else {
            return <section>
                <h2>searching..</h2>
            </section>
   ;     }

    }
}

export default PermalinkQuote;
