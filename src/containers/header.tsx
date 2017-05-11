import Component from "inferno-component";

require("../../style/header.scss");

export default class Header extends Component<{}, {}> {
    render() {
        return(
            <header class={ "qdb-header" }>
                <h1 class={ "qdb-header-name" }><a href="/">qdb.esports.moe</a></h1>
                <h1 class={ "qdb-header-slogan" }>we say dumb shit</h1>
            </header>
        );
    }
}
