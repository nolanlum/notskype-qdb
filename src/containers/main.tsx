import {Component} from "inferno";

import Quote from "../components/quote";
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
}

class Main extends Component<{}, MainState> {
    private api_handle : api.QuoteApi;

    constructor(props, {authenticated}) {
        super(props);
        this.state = {
            quotes: [],
            offset: 0,
            fetching: false,
        };

        this.api_handle = new api.QuoteApi();

        this.registerInfiniteScroll();

        if (authenticated) {
            this.loadMore(); // initial data fetch
        }
    }

    registerInfiniteScroll() {
        if ("window" in global) {
            let lastTrigger = 0;
            window.onscroll = () => {
                let now = new Date().getTime();
                let dt = now - lastTrigger;
                let scrollBottom = window.scrollY + document.body.offsetHeight;
                if (dt > 500 && scrollBottom >= document.body.scrollHeight) {
                    lastTrigger = now;
                    this.loadMore();
                }
            };
        }
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

    render() {
        let {quotes, fetching} = this.state;
        const quoteElements = quotes.map((quote) => {
            return(<Quote
                id={ quote.id }
                author={ quote.author }
                body={ quote.body }
                addedAt={ quote.addedAt }
                />);
        });

        return(
            <section class={ "main-container" }>
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
