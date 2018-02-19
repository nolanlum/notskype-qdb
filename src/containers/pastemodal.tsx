import {Component} from "inferno";

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

    private listener : EventListener;

    constructor(props) {
        super(props);
        this.state = {
            quote : null
        };
        this.listener = this.__onKeyPress.bind(this);
    }

    __onKeyPress(evt) {
        if (evt.key === "Escape" || evt.code === "Escape") {
            this.props.onDismiss();
        }
    }

    componentDidMount() {
        window.addEventListener("keyup", this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.listener);
    }

    render() {
        return(
            this.props.visible ?
                <div class={ "paste-modal-container" }>
                    <div onClick={ this.props.onDismiss.bind(this) } class={ "paste-modal-overlay" }></div>
                    <PasteInput onSubmit={(quote : ClassifiedQuote) => {
                        this.props.onSubmit(quote);
                        this.props.onDismiss();
                    }}/>
                </div>
                : null
        );
    }
}
