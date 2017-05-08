import Component from "inferno-component";

require("../../style/header.scss");

export default class Header extends Component<{}, {}> {
    render() {
        return(
            <header class={ "qdb-header" }>
                <h1 class={ "qdb-header-name" }>qdb.esports.moe</h1>
                <h1 class={ "qdb-header-slogan" }>we say dumb shit</h1>
            </header>
        )
    }
}
