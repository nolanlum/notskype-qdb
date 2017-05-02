import Component from "inferno-component";

interface SearchBarProps {
    onSearch : (query : string) => void;
}

interface SearchBarState {
    searchQuery : string;
}

export default class SearchBar extends Component<SearchBarProps, SearchBarState> {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery : ""
        };
    }

    __handleFormSubmit(evt : Event) {
        evt.preventDefault();
        this.props.onSearch(this.state.searchQuery);
    }

    __handleSearchbarUpdate(evt : Event) {
        const srcElement = evt.srcElement as HTMLInputElement;
        const searchQuery : string = srcElement.value;
        this.setState({searchQuery});
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
                        this.state.searchQuery
                    </input>
            </form>
        );
    }
}
