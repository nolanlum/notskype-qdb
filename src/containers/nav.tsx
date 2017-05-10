import Component from "inferno-component";

import Quote from "../components/quote";
import SearchBar from "../components/searchbar";
import PasteInput from "../components/pasteinput";
import PasteModal from "./pastemodal";

import { Quote as ClassifiedQuote } from "../lib/classifyquote";

require("../../style/nav.scss");

export interface NavProps {
    onSearch : (query : string) => void;
    onSubmit : (quote : ClassifiedQuote) => void;
}

export interface NavState {
    showAddQuote : boolean;
}

export default class Nav extends Component<NavProps, NavState> {
    constructor(props) {
        super(props);

        this.state = {
            showAddQuote: false
        };
    }

    __onAddQuote() {
        this.setState({
            showAddQuote: true
        });
    }

    __onDismissAdd() {
        this.setState({
            showAddQuote: false
        });
    }

    render() {
        return(
            <section class={ "nav-wrapper" }>
                <nav class={ "nav-container" }>
                    <ul class={ "nav-links" }>
                        <li class={ "nav-link-item" }><a href="/">Home</a></li>
                        <li class={ "nav-link-item" }><a href="/rand">Random</a></li>
                        <li class={ "nav-link-item" }><a href="#" onClick={ this.__onAddQuote.bind(this) }>Add Quote</a></li>
                    </ul>
                    <SearchBar onSearch={ this.props.onSearch.bind(this) } />
                </nav>
                <PasteModal
                    onSubmit={ this.props.onSubmit.bind(this) }
                    onDismiss={ this.__onDismissAdd.bind(this) }
                    visible={ this.state.showAddQuote } />
            </section>
        );
    }
}
