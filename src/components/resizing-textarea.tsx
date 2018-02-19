import {Component} from "inferno";

export interface ResizingTextareaProps {
    onInput : (evt : Event) => void;
}

export default class ResizingTextarea extends Component<ResizingTextareaProps, {}> {

    textarea : HTMLTextAreaElement;

    constructor(props) {
        super(props);
    }

    __setTextarea(ref) {
        this.textarea = ref;
    }

    __onInput(evt) {
        this.textarea.style.height = "auto";
        this.textarea.style.height = (this.textarea.scrollHeight + 5) + "px";
        this.props.onInput(evt);
    }

    componentDidMount() {
        this.textarea.focus();
    }

    componentWillUnmount() {
        this.textarea = null;
    }

    render() {
        return(
            <textarea {...this.props}
                ref={this.__setTextarea.bind(this)}
                onInput={this.__onInput.bind(this)}
            />);
    }
}
