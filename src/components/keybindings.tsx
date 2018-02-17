import {Component} from "inferno";
import {Router} from "inferno-router";

import Nav from "../containers/nav";
import Header from "../containers/header";
import SearchBar from "../components/searchbar";
import PasteInput from "../components/pasteinput";

import { Quote as ClassifiedQuote } from "../lib/classifyquote";
import normalizeQuote from "../lib/normalizequote";
import * as api from "../api/api";

/**
Component for managing keybindings on a page.
**/
class Keybindings extends Component<{}, {}> {

    private keyListener : EventListener;

    constructor(props) {
        super(props);
        this.keyListener = this.__onKeyPress.bind(this);
    }

    __onKeyPress(evt) {
        let keyCode = evt.key || evt.code;
        let handler = this.props.bindings[keyCode];
        if (handler) handler();
    }

    componentDidMount() {
        window.addEventListener("keyup", this.keyListener);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.keyListener);
    }

    render() {
        return (this.props.children);
    }
}

export default Keybindings;
