import Component from "inferno-component";

import Quote from "../components/quote";

export default class Main extends Component<{}, {}> {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ""
        }
    }

    __handleFormSubmit(evt) {
        evt.preventDefault();
        this.props.onSearch();
    }

    __handleSearchbarUpdate(evt) {
        this.setState({searchQuery: evt.srcElement.value});
    }

    render() {
        return(
            <form class="searchbar" onSubmit={
                this.__handleFormSubmit.bind(this)}>
                <input 
                    class="searchbar-input"
                    type="text"
                    name="search"
                    placeholder="search qdb"
                    onInput={this.__handleSearchbarUpdate.bind(this)
                    }>
                        {this.state.searchQuery}
                    </input>
            </form>
        );
    }
}
