import Component from "inferno-component";
import { IndexLink } from "inferno-router";

import Quote from "../components/quote";
import SearchBar from "../components/searchbar";
import PasteInput from "../components/pasteinput";

import { Quote as ClassifiedQuote } from "../lib/classifyquote";

require("../../style/errorpage.scss");

interface ErrorPageProps {
    errorCode : string;
}

export default class ErrorPage extends Component<ErrorPageProps, {}> {
    render() {
        return(
            <div class={ "error-page" }>
                <h1 class="error-code">{this.props.errorCode}</h1>
                <p class="error-message">
                    {this.props.children}
                </p>
            </div>
        );
    }
}

export const ErrorPage404 = () =>
    <ErrorPage
        errorCode={404}
        >
        <p>
            Page not found! Head <IndexLink>home</IndexLink>?
        </p>
    </ErrorPage>
    ;
