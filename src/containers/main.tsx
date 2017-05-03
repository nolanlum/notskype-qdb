import Component from "inferno-component";

import Quote from "../components/quote";
import SearchBar from "../components/searchbar";
import PasteInput from "../components/pasteinput";

require("../../style/main.scss");

const placeholderIcon = "https://placeholdit.imgix.net/~text?txtsize=8&txt=64%C3%9764&w=64&h=64";

const lipsum = [
    "anime was a big mistake",
    "<tttb> Why did the programmer quit his job?\n<tttb> Because he didn't get arrays\n<zzz> boo, that was terrible",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non dui ex. Vestibulum pretium eget ante ac euismod. Nam fermentum urna a neque commodo, nec feugiat risus porttitor. Sed quis porttitor tortor. Quisque venenatis, arcu ut tristique consequat, odio orci consequat libero, ullamcorper scelerisque tellus turpis ut metus. Sed sit amet urna quis ante blandit porttitor. Donec a orci ut nisi ornare pulvinar ornare non quam",

    "Cras quam nulla, pellentesque at fringilla in, euismod in leo. Nullam id diam leo. Integer ullamcorper aliquet sollicitudin. In scelerisque risus ac vehicula accumsan. Nullam vel lectus vel dui posuere dictum sit amet vitae tortor. Sed cursus justo eget est egestas varius. Nullam auctor orci ex, a bibendum mauris viverra sit amet. Vestibulum sem est, vehicula vitae nisl non, finibus feugiat lacus. Aenean et tincidunt elit. Ut id ante et dolor dignissim malesuada. Nulla et dolor dolor. Donec pharetra, velit sed rutrum sagittis, turpis tellus dictum risus, eu rutrum dolor erat vel ante. Praesent ultricies mi eget turpis gravida blandit. Etiam ut mollis tellus, vel eleifend tellus.",
    "Integer interdum imperdiet neque eu pulvinar. Nunc elit elit, porttitor eu tortor non, bibendum lacinia purus. Donec vel ligula eu nunc gravida ornare ac eget quam. In feugiat in tellus sed tristique. Integer convallis, risus vel placerat condimentum, metus est fermentum mauris, sit amet ornare risus urna in eros. Suspendisse ornare lectus lacus, eget maximus ex tempor in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras mauris nibh, rutrum a sapien eget, condimentum bibendum lacus. Nullam suscipit sem eu turpis tristique interdum. Etiam felis massa, maximus id quam quis, euismod pulvinar tellus. Quisque a hendrerit libero. Mauris eget dignissim nibh. Curabitur ultricies, mauris dapibus semper ultricies, enim felis tempus lacus, non luctus velit risus id mi.",

    "Proin sed nibh ac ipsum feugiat fermentum. Aenean a lacus vehicula, porttitor nisi non, placerat turpis. Pellentesque blandit maximus posuere. Sed porttitor ac turpis ac ullamcorper. Suspendisse a urna tortor. Donec efficitur odio et semper egestas. Nulla augue mi, imperdiet ut orci vitae, tincidunt commodo ipsum. Pellentesque ultrices ligula nisl, non hendrerit metus laoreet in. Praesent non tortor elit. Proin ac mi venenatis, rhoncus ex in, convallis sem. In interdum elit ut rutrum auctor. Aenean ac aliquam nisl, vitae iaculis elit. Maecenas porta fringilla tortor a venenatis. Nunc ac gravida enim.",

    "Fusce posuere facilisis lorem sed interdum. Ut in elit libero. Nam arcu dui, iaculis at ultrices a, eleifend aliquet tortor. Aliquam auctor tortor vel dolor hendrerit ornare. Ut vel aliquam sem. Etiam sit amet lacus eget libero mattis laoreet non consequat nulla. Nullam at mi ac mauris vestibulum tincidunt. Aliquam euismod est leo, vitae aliquam justo tempor eget. In quis arcu risus. Ut condimentum, mi sit amet tempor imperdiet, eros ex tempor lorem, vel congue nunc lorem posuere ante. Praesent eget diam purus. Proin lectus leo, ultricies in luctus commodo, pulvinar eu nunc. Integer ultrices faucibus dolor, ut porttitor augue luctus nec. Praesent sed diam id ante aliquet vulputate. Aliquam eu congue lacus, vitae convallis neque. Nunc cursus, tortor quis mattis sollicitudin, quam libero interdum quam, eget finibus lorem orci ac sem."
];


class Main extends Component<{}, {}> {
    render() {
        const quotes = lipsum.map((body) =>
                                    <Quote
                                        id={"0"}
                                        author={"mhuan13@gmail.com"}
                                        body={body}
                                        addedAt={"2017-05-01T18:41:37+00:00"}
                                    />);

        return(
            <section class={"main-container"}>
                <SearchBar onSearch={() =>
                        console.log("search not implemented")}/>
                <PasteInput/>
                <section class={"quote-container"}>
                    {quotes}
                </section>
            </section>
        );
    }
}

export default Main;
