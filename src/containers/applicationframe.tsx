import Component from "inferno-component";
import {Router} from "inferno-router";

import Nav from "../containers/nav";
import Header from "../containers/header";
import SearchBar from "../components/searchbar";
import PasteInput from "../components/pasteinput";

import { Quote as ClassifiedQuote } from "../lib/classifyquote";
import * as api from "../api/api";

/**
Container class for persitent navigation elements of the site.

this.props.children will be some other container class based on the
child passed in by the router.

See src/containers/router for details
**/
class ApplicationFrame extends Component<{}, {}> {

    private api_handle : api.QuoteApi;
    private router : any;

    constructor(props, {router}) {
        super(props);
        this.router = router;
        this.api_handle = new api.QuoteApi();
    }

    __onSearch(query : string) {
        let escapedQuery = encodeURIComponent(query);
        this.router.push(`/search/${escapedQuery}`);
    }

    __onSubmit(quote : ClassifiedQuote) {
        let payload = "";
        if (quote.message) {
            payload = quote.message;
        } else {
            // normalize the message as an irc-style log
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
        return (
            <section class={ "application-container" }>
                <Nav
                    onSearch={ this.__onSearch.bind(this) }
                    onSubmit={ this.__onSubmit.bind(this) } />
                <Header />
                {this.props.children}
            </section>

        );
    }
}

export default ApplicationFrame;
