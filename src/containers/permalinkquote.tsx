import Component from "inferno-component";

import Quote from "../components/quote";
import * as api from "../api/api";

interface PermalinkQuoteProps {
    params : {
        id : number,
    };
}

interface PermalinkQuoteState {
    quote : api.Quote | null;
}

class PermalinkQuote extends Component<PermalinkQuoteProps, PermalinkQuoteState> {

    private api_handle : api.QuoteApi;

    constructor(props) {
        super(props);
        this.api_handle = new api.QuoteApi();
        this.state = {
            quote: null
        };

        this.updateQuotes(props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            quote: null
        });
        this.updateQuotes(nextProps.params.id);
    }

    updateQuotes(id) {
        if (id) {
            this.api_handle.qdbQuoteGetById({
                    "quoteId": id
                })
                .then((quote) => this.setState({quote}))
                .catch((e) => console.error(e));
        }
    }

    render() {
        if (this.state && this.state.quote) {
            let {quote} = this.state;
            return <section class="quote-container">
                    <Quote
                        id={ quote.id }
                        author={ quote.author }
                        body={ quote.body }
                        addedAt={ quote.addedAt }
                        />
                </section>
   ;     } else {
            return <section>
                <h2>loading quote..</h2>
            </section>
   ;     }

    }
}

export default PermalinkQuote;
