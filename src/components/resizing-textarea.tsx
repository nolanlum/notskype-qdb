import Component from 'inferno-component';

export default class ResizingTextarea extends Component<{},{}> {

    textarea : textarea;

    constructor(props) {
        super(props);
    }

    __setTextarea(ref) {
        console.log(ref);
        this.textarea = ref;
    }

    __onInput(evt) {
        console.log(this.textarea.scrollHeight);
        this.textarea.style.height = "auto";
        this.textarea.style.height = this.textarea.scrollHeight + "px";
    }

    componentDidMount() {
        this.textarea.focus();
    }

    componentWillUnmount() {
        this.textarea = null;
    }

    render() {
        return <textarea {...this.props}
            ref={this.__setTextarea.bind(this)}
            onInput={this.__onInput.bind(this)}
            />
    }
}