import Component from "inferno-component";
import Quote from "../components/quote";
import * as api from "../api/api";

interface PermalinkQuoteProps {
    params : {
        id : string;
    };
}

interface PermalinkQuoteState {
    quote : api.Quote;
}

class PermalinkQuote extends Component<PermalinkQuoteProps, PermalinkQuoteState> {

    private api_handle : api.QuoteApi;

    constructor(props, context) {
        super(props, context);
        this.api_handle = new api.QuoteApi();
        this.state = {
            // will be undefined if not present in global context
            quote: context.quotes[props.params.id],
        };

        // this.updateQuotes(props.params.id || 0);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            quote: null
        });
        this.updateQuotes(nextProps.params.id );
    }

    updateQuotes(id) {
        if (id) {
            console.log(this.context);
            this.context.getQuote(id)
                .then((quote) => {
                    this.setState({quote: quote});
                });
        }
    }

    render() {
        if (this.state && this.state.quote) {
            let {quote} = this.state;
            return <section class="quote-container">
                    <Quote
                        id={ quote.id }
                        author={quote.author}
                        body={quote.body}
                        addedAt={quote.addedAt}
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
