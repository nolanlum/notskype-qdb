import {Component} from "inferno";
import {withRouter} from "inferno-router";

import Nav from "../containers/nav";
import Header from "../containers/header";
import SearchBar from "../components/searchbar";
import PasteInput from "../components/pasteinput";
import Keybindings from "../components/keybindings";

import { Quote as ClassifiedQuote } from "../lib/classifyquote";
import normalizeQuote from "../lib/normalizequote";
import * as api from "../api/api";

/**
Container class for persitent navigation elements of the site.

this.props.children will be some other container class based on the
child passed in by the router.

See src/containers/router for details
**/
class ApplicationFrame extends Component<{}, {}> {

    private api_handle : api.QuoteApi;
    private history : any;
    private randQuote : any;
    private keyListener : EventListener;

    constructor(props, {randQuote}) {
        super(props);
        this.history = props.history;
        this.randQuote = randQuote;
        this.api_handle = new api.QuoteApi();
    }

    __onSearch(query : string) {
        if (query.length === 0) {
            this.history.push("/");
        } else {
            let escapedQuery = encodeURIComponent(query);
            this.history.push(`/search/${escapedQuery}`);
        }
    }

    __onRandom() {
        this.randQuote()
            .then(quote => {
                this.history.push(`/quote/${quote.id}`);
            });
    }

    __onSubmit(quote : ClassifiedQuote) {
        let payload = "";
        if (quote.message) {
            payload = quote.message;
        } else {
            // normalize the message as an irc-style log
            payload = normalizeQuote(quote);
        }
        this.api_handle.qdbQuotePost({
            body: {
                body: payload
            }
        })
        .then(quote => {
            this.history.push(`/quote/${quote["id"]}`);
        });
    }

    render() {
        return (
            <Keybindings bindings={{
                "r": this.__onRandom.bind(this)
            }}>
                <section class={ "application-container" }>
                    <Nav
                        onRandom={ this.__onRandom.bind(this) }
                        onSearch={ this.__onSearch.bind(this) }
                        onSubmit={ this.__onSubmit.bind(this) } />
                    <Header />
                    {this.props.children}
                </section>
            </Keybindings>

        );
    }
}

export default withRouter(ApplicationFrame);
