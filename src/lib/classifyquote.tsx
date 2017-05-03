export type QuoteClass = "slack" | "discord" | "irc" | "unrecognized";

export interface Message {
    speaker : string;
    body : string;
}

export interface Quote {
    type : QuoteClass;
    messages? : Message[];
    message? : string;
}

/*
[9:06 PM] Wheatless: wow gj gabe
[9:06 PM] PJ: [tiff snaps into the sunset
*/
const discordRegex = /(^\[\d{1,2}:\d{2} [AP]M\] ([^:]*?[^\s]): (.+?)$(\n|\r\n)*)+/m;

/*
<tttb> Why did the programmer quit his job?
<tttb> because he didn't get arrays
*/
const ircRegex = /(^<([^\s]+)> (.+?)$(\n|\r\n)?)+/m;

/*
Tiffany [5:15 PM]
shucks

melanie
[5:16 PM]
Qq

Sean★
[5:18 PM]
@melanie did you ever see my thread replies this afternoon

melanie
[5:23 PM]
I just got home, so I'm gonna read them now!
*/
const slackHeaderRegex = /^(.+?[^\s])( |$(\r\n|\n)?)\[\d{1,2}:\d{2} (A|P)M\](\s+)?/;

function parseLog(regex, extractor, rawQuote) {
    let log = [];
    let i = 0;
    while (rawQuote !== "") {
        if (i++ > 1000) {
            // error case for infinite reppetition
            throw Error("log parsing exceeded 1000 loops");
        }
        let match = rawQuote.match(regex);
        if (!match) {
            console.log("match failed?");
            break;
        }

        let messageStr = match[1];
        let message = extractor(match);

        log.unshift(message);
        rawQuote = rawQuote.substr(0, rawQuote.length - messageStr.length);
    }
    return log;
}

function parseSlackLog(rawQuote) {
    let log = [];
    let currentAuthor = undefined;
    let currentMessage = [];
    let i = 0;
    while (rawQuote !== "") {
        if (i++ > 1000) {
            // error case for infinite reppetition
            throw Error("log parsing exceeded 1000 loops");
        }

        let match = rawQuote.match(slackHeaderRegex);
        if (match) {
            if (currentAuthor !== undefined) {
                log.push({
                    speaker: currentAuthor,
                    body: currentMessage.join("\n").trim(),
                });
            }
            currentMessage = [];
            currentAuthor = match[1];
            rawQuote = rawQuote.substring(match[0].length);
        }

        else {
            let lineStart = rawQuote.indexOf("\r\n");
            if (lineStart !== -1) {
                currentMessage.push(rawQuote.substring(0, lineStart));
                rawQuote = rawQuote.substring(lineStart + 2);
            } else {
                lineStart = rawQuote.indexOf("\n");
                if (lineStart === -1 ) {
                    currentMessage.push(rawQuote);
                    rawQuote = "";
                } else {
                    currentMessage.push(rawQuote.substring(0, lineStart));
                    rawQuote = rawQuote.substring(lineStart + 1);
                }
            }
        }
    }

    if (currentAuthor !== undefined) {
        log.push({
            speaker: currentAuthor,
            body: currentMessage.join("\n").trim(),
        });
    }

    return log;
}

function discordExtractor(match) {
    return {
        speaker: match[2],
        body: match[3]
    };
}


function ircExtractor(match) {
    return {
        speaker: match[2],
        body: match[3]
    };
}

function slackExtractor(match) {
    console.log(match);
    return {
        speaker: match[2],
        body: match[7]
    };
}

function classifyQuote(rawPaste : string) : Quote {
    let match;
    match = rawPaste.match(discordRegex);
    if (match && match[0] === rawPaste) {
        return {
            type: "discord",
            messages: parseLog(discordRegex, discordExtractor, rawPaste),
        };
    }

    match = rawPaste.match(ircRegex);
    if (match && match[0] === rawPaste) {
        return {
            type: "irc",
            messages: parseLog(ircRegex, ircExtractor, rawPaste),
        };
    }

    match = rawPaste.match(slackHeaderRegex);
    if (match) {
        return {
            type: "slack",
            messages: parseSlackLog(rawPaste)
        };
    } else if (match) {
        console.log("rejected partial match", match);
    }


    return {
        type: "unrecognized",
        message: rawPaste,
    };
}

export default classifyQuote;
