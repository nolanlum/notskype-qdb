import {Component} from "inferno";
import {Link} from "inferno-router";

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
    authenticated : boolean;

    constructor(props, {authenticated}) {
        super(props);

        this.authenticated = authenticated;

        this.state = {
            showAddQuote: false
        };
    }

    __onAddQuote(e) {
        e.preventDefault();
        this.setState({
            showAddQuote: true
        });
    }

    __onDismissAdd() {
        this.setState({
            showAddQuote: false
        });
    }

    __onRandom(e) {
        e.preventDefault();
        this.props.onRandom();
    }

    __onLogout() {
        document.cookie = `qdbToken=;expires=${(new Date(0)).toUTCString()};path=/`;
        window.location.assign("/");
    }

    render() {
        return(
            <section class={ "nav-wrapper" }>
                <nav class={ "nav-container" }>
                    <ul class={ "nav-links" }>
                        <li class={ "nav-link-item" }>
                            <Link to="/">
                                <i class="fa fa-home" aria-hidden="true"></i>
                                Home
                           </Link>
                        </li>
                        <li class={ "nav-link-item" }>
                            <a href="#" onClick={ this.__onRandom.bind(this) }>
                                <i class="fa fa-random" aria-hidden="true"></i>
                                Random
                            </a>
                        </li>
                        <li class={ "nav-link-item" }>
                            <a href="#" onClick={ this.__onAddQuote.bind(this) }>
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                Add Quote
                            </a>
                        </li>
                        {
                            this.authenticated
                                ?   <li class={ "nav-link-item" }>
                                        <a href="#" onClick={ this.__onLogout.bind(this) }>
                                            <i class="fa fa-sign-out-alt" aria-hidden="true"></i>
                                            Logout
                                        </a>
                                    </li>
                                :   <li class={ "nav-link-item" }>
                                        <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team&client_id=2370882641.196124303072">
                                            <i class="fa fa-sign-in-alt" aria-hidden="true"></i>
                                            Login
                                        </a>
                                    </li>
                        }
                    </ul>
                    <SearchBar onSearch={ this.props.onSearch.bind(this) } />
                </nav>
                <PasteModal
                    onSubmit={ this.props.onSubmit }
                    onDismiss={ this.__onDismissAdd.bind(this) }
                    visible={ this.state.showAddQuote } />
            </section>
        );
    }
}
