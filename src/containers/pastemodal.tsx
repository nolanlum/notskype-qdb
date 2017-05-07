import Component from "inferno-component";

import Quote from "../components/quote";
import SearchBar from "../components/searchbar";
import PasteInput from "../components/pasteinput";

import { Quote as ClassifiedQuote } from "../lib/classifyquote";

require("../../style/pastemodal.scss");

export interface PasteModalProps {
    onSubmit : (quote : ClassifiedQuote) => void;
    onDismiss : () => void;
    visible : boolean;
}

export interface PasteModalState {

}

export default class PasteModal extends Component<PasteModalProps, PasteModalState> {
    render() {
        console.log(this.props);
        return(
            this.props.visible ?
                <div class={ "paste-modal-container" }>
                    <div onClick={ this.props.onDismiss.bind(this) } class={ "paste-modal-overlay" }></div>
                    <PasteInput onSubmit={ this.props.onSubmit.bind(this) } />
                </div>
                : null
        );
    }
}
