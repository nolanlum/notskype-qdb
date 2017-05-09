import Component from "inferno-component";

import Quote from "../components/quote";
import Nav from "./nav";
import Header from "./header";

import { Quote as ClassifiedQuote } from "../lib/classifyquote";

import * as api from "../api/api";

require("../../style/main.scss");

const placeholderIcon = "https://placeholdit.imgix.net/~text?txtsize=8&txt=64%C3%9764&w=64&h=64";
const PER_PAGE = 10;

export interface MainState {
    quotes : api.Quote[];
    offset : number;
    fetching : boolean;
    searchQuotes : api.Quote[];
    searching : boolean;
}

class Main extends Component<{}, MainState> {
    private api_handle : api.QuoteApi;

    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            offset: 0,
            fetching: false,
            searchQuotes: [],
            searching: false
        };

        this.api_handle = new api.QuoteApi();

        this.loadMore(); // initial data fetch
    }

    loadMore() {
        this.state.fetching = true;

        this.api_handle.qdbQuoteGet({
            count : PER_PAGE,
            offset : this.state.offset
        }).then((quotes) => {
            this.setState({
                quotes : this.state.quotes.concat(quotes),
                offset : this.state.offset + quotes.length,
                fetching : false
            });

            console.log(this.state);
        });

    }

    onSearch(query : string) {
        this.state.fetching = true;
        if (query.length === 0) {
            this.setState({
                searchQuotes: [],
                searching: false,
                fetching: false
            });
            console.log(this.state);
        } else {
            this.api_handle.qdbQuoteFind({
                query: query
            }).then((quotes) => {
                this.setState({
                    searchQuotes: quotes,
                    offset: 0,
                    fetching: false,
                    searching: true
                });
            });
        }
    }

    onSubmit(quote : ClassifiedQuote) {
        let payload = "";
        if (quote.message) {
            payload = quote.message;
        } else {
            quote.messages.map((message) => {
                message.body.split("\n").map((line) => {
                    payload = payload.concat(`<${message.speaker}> ${line}\n`);
                });
            });
        }
        this.api_handle.qdbQuotePost({
            body: {
                body: payload
            }
        })
        .then(() => {
            location.reload();
        });
    }

    render() {
        let {searching, searchQuotes, quotes, fetching} =
            this.state;
        const quoteSource = searching ? searchQuotes : quotes;
        console.log(searchQuotes, quotes, quoteSource);
        const quoteElements = quoteSource.map((quote) => {
            return(<Quote
                id={ quote.id }
                author={ quote.author }
                body={ quote.body }
                addedAt={ quote.addedAt }
                />);
        });

        return(
            <section class={ "main-container" }>
                <Nav
                    onSearch={ this.onSearch.bind(this) }
                    onSubmit={ this.onSubmit.bind(this) } />
                <Header />
                <section class={ "quote-container" }>
                    { quoteElements }
                    <button
                        class={ "load-more" }
                        disabled={ fetching }
                        onClick={ this.loadMore.bind(this) }>
                        Load More
                    </button>
                </section>
            </section>
        );
    }
}

export default Main;
