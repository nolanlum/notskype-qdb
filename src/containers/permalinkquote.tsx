import {Component} from "inferno";
import {withRouter} from "inferno-router";
import Quote from "../components/quote";
import Keybindings from "../components/keybindings";
import { ErrorPage404 } from "../containers/errorpage";
import * as api from "../api/api";


require("../../style/permalinkquote.scss");

interface PermalinkQuoteProps {
    params : {
        id : string;
    };
}

interface PermalinkQuoteState {
    quote : api.Quote;
    missing : boolean;
}

class PermalinkQuote extends Component<PermalinkQuoteProps, PermalinkQuoteState> {

    history : any;
    loading : boolean;

    constructor(props, {quotes}) {
        super(props);
        this.history = props.history;
        this.loading = false;
        this.state = {
            // will be undefined if not present in global context
            quote: quotes[props.match.params.id],
            missing: false,
        };
    }

    componentDidMount() {
        this.updateQuotes(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.updateQuotes(nextProps.match.params.id);
    }

    updateQuotes(id) {
        if (id) {
            this.context.getQuote(id)
                .then((quote) => {
                    this.setState({quote: quote, missing: false});
                })
                .catch((quote) => {
                    this.setState({missing: true});
                });
        }
    }

    /** Try to prefetch the next quote. on succ, redirect to it
     */
    loadNextQuote() {
        this.loading = true;
        let nextId = this.state.quote.id + 1;

        this.context.getQuote(nextId)
            .then(
                () => this.history.push(`/quote/${nextId}`),
                () => {})
            .then(() => {
                this.loading = false;
            });
    }

    render() {
        if (this.state.missing) {
            return <ErrorPage404/>;
        }
        if (this.state && this.state.quote) {
            let {quote} = this.state;
            let bindings = {
                "a": () => this.history.push(`/quote/${Math.max(1, quote.id - 1)}`),
                "d": this.loadNextQuote.bind(this),
            };
            return (
                <Keybindings bindings={bindings}>
                    <section class="quote-container permalink-quote-container">
                        <Quote
                            id={ quote.id }
                            author={quote.author}
                            body={quote.body}
                            addedAt={quote.addedAt}
                            />
                    </section>
                </Keybindings>
                );
        } else {
            return null;
        }

    }
}

export default withRouter(PermalinkQuote);
