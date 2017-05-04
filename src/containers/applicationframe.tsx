import Component from "inferno-component";
import {Router} from 'inferno-router';

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

    __onPasteSubmit(quote : ClassifiedQuote) {
        let payload = JSON.stringify(quote);
        this.api_handle.qdbQuotePost({
            body: {
                body: payload
            }
        });

    }

    render() {
        return (
            <section class={ "application-container" }>
                <SearchBar onSearch={ this.__onSearch.bind(this) } />
                <PasteInput onSubmit={ this.__onPasteSubmit.bind(this) } />
                {this.props.children}
            </section>

        );
    }
}

export default ApplicationFrame;
