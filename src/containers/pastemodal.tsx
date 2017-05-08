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
    quote : ClassifiedQuote;
}

export default class PasteModal extends Component<PasteModalProps, PasteModalState> {
    constructor(props) {
        super(props);
        this.state = {
            quote : null
        };
    }

    render() {
        return(
            this.props.visible ?
                <div class={ "paste-modal-container" }>
                    <div onClick={ this.props.onDismiss.bind(this) } class={ "paste-modal-overlay" }></div>
                    <div class={ "paste-modal" }>
                        <PasteInput onSubmit={ this.props.onSubmit.bind(this) } />
                    </div>
                </div>
                : null
        );
    }
}
