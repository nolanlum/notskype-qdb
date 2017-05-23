import Component from "inferno-component";
import Quote from "../components/quote";
import * as api from "../api/api";

require("../../style/permalinkquote.scss");

interface PermalinkQuoteProps {
    params : {
        id : string;
    };
}

interface PermalinkQuoteState {
    quote : api.Quote;
}

class PermalinkQuote extends Component<PermalinkQuoteProps, PermalinkQuoteState> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            // will be undefined if not present in global context
            quote: context.quotes[props.params.id],
        };
    }

    componentDidMount() {
        this.updateQuotes(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.updateQuotes(nextProps.params.id);
    }

    updateQuotes(id) {
        if (id) {
            this.context.getQuote(id)
                .then((quote) => {
                    this.setState({quote: quote});
                });
        }
    }

    render() {
        if (this.state && this.state.quote) {
            let {quote} = this.state;
            return <section class="quote-container permalink-quote-container">
                    <Quote
                        id={ quote.id }
                        author={quote.author}
                        body={quote.body}
                        addedAt={quote.addedAt}
                        />
                </section>
   ;     } else {
            return null;
        }

    }
}

export default PermalinkQuote;
