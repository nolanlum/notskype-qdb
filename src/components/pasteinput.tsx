import Component from "inferno-component";
import classifyQuote, {Quote} from "../lib/classifyquote";

interface PasteInputProps {
}

interface PasteInputState {
    quote? : Quote;
}

export default class PasteInput extends Component<PasteInputProps, PasteInputState> {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    __onQuoteChange(evt : Event) {
        let quoteInput : HTMLInputElement = evt.srcElement as HTMLInputElement;
        let quote = classifyQuote(quoteInput.value);
        this.setState({quote});
        console.log(quote);
    }

    render() {
        let quoteClass = (this.state && this.state.quote)
            ? this.state.quote.type
            : "unrecognized";

        return(
            <section class={"paste-box " + quoteClass}>
                <textarea
                    class="paste-box-input"
                    type="text"
                    name="quote"
                    placeholder="paste a quote here"
                    onInput={this.__onQuoteChange.bind(this)}
                    />
                <aside class="paste-box-name">{quoteClass}</aside>
            </section>
        );
    }
}
