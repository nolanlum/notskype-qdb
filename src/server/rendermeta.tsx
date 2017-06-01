import Inferno from "inferno";

interface MetaAttrs {
    title? : string;
    description? : string;
    image? : string;
    twitterLabels? : {
        label1? : string;
        data1? : string;
        label2? : string;
        data2? : string;
    };
}

export default function renderMetadata(attrs : MetaAttrs) {
    const out = [];

    const meta = (prop, content) => {
        if (content) out.push(<meta property={prop} content={content} />);
    };

    // facebook open graph tags
    meta("og:type", "website");
    meta("og:url", "http://qdb.esports.moe/");
    meta("og:title", attrs.title);
    meta("og:description", attrs.description);
    meta("og:image", attrs.image);

    // card title
    let card_type = attrs.image ? "summary_large_image" : "summary";
    meta("twitter:card", card_type);
    meta("twitter:domain", "http://qdb.esports.moe");

    // consistent passed-in content
    meta("twitter:url", "http://qdb.esports.moe");
    meta("twitter:title", attrs.title);
    meta("twitter:description", attrs.description);
    meta("twitter:image", attrs.image);


    // twitter card tags additive with the og: tags
    if (attrs.twitterLabels) {
        // optional labels and stuff
        meta("twitter:label1", attrs.twitterLabels.label1);
        meta("twitter:data1", attrs.twitterLabels.data1);
        meta("twitter:label2", attrs.twitterLabels.label2);
        meta("twitter:data2", attrs.twitterLabels.data1);
    }
    return out;
}
