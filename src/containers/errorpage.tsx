import Component from "inferno-component";

import Quote from "../components/quote";
import SearchBar from "../components/searchbar";
import PasteInput from "../components/pasteinput";

import { Quote as ClassifiedQuote } from "../lib/classifyquote";

require("../../style/errorpage.scss");

interface ErrorPageProps {
    errorCode : string;
    errorMessage : string;
}

export default class ErrorPage extends Component<ErrorPageProps, {}> {
    render() {
        return(
            <div class={ "error-page" }>
                <h1 class="error-code">{this.props.errorCode}</h1>
                <p class="error-message">
                    {this.props.errorMessage}
                </p>
            </div>
        );
    }
}
