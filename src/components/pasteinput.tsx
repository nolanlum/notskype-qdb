import {Component} from "inferno";
import classifyQuote, {Quote} from "../lib/classifyquote";
import normalizeQuote from "../lib/normalizequote";
import ResizingTextarea from "./resizing-textarea";
import { default as QuotePreview } from "./quote";

require("../../style/pasteinput.scss");

interface PasteInputProps {
    onSubmit : (quote : Quote) => void;
}

interface PasteInputState {
    quote? : Quote;
    rawQuote? : string;
}

export default class PasteInput extends Component<PasteInputProps, PasteInputState> {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    __onQuoteChange(evt : Event) {
        let quoteInput : HTMLInputElement = evt.target as HTMLInputElement;
        let rawQuote = quoteInput.value;
        let quote = classifyQuote(rawQuote);
        this.setState({
            quote: quote,
            rawQuote: rawQuote
        });
    }

    __onSubmit() {
        this.props.onSubmit(this.state.quote);
        this.setState({
            quote: null,
            rawQuote: ""
        });
    }

    render() {
        let quoteClass = (this.state && this.state.quote)
            ? this.state.quote.type
            : "unrecognized";

        return(
            <section class={"paste-box " + quoteClass}>
                <section class="paste-and-preview">
                    <section class="paste-box-input-wrapper">
                        <ResizingTextarea
                            class="paste-box-input"
                            type="text"
                            name="quote"
                            placeholder="paste a quote here"
                            onInput={ this.__onQuoteChange.bind(this) }
                            value={ this.state.rawQuote } />
                        <aside class="paste-box-name">{ quoteClass }</aside>
                    </section>
                    <section class="paste-box-preview-wrapper">
                        <QuotePreview
                            id={ 0 }
                            author={ "anonymous@esports.moe" }
                            body={ normalizeQuote(this.state.quote) }
                            addedAt={ new Date() } />
                    </section>
                </section>
                <button
                    class="paste-submit"
                    disabled={ this.state.quote === undefined }
                    onClick={ this.__onSubmit.bind(this) }>
                    Submit
                </button>
            </section>
        );
    }
}
