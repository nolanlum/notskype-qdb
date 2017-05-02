export type QuoteClass = "slack" | "discord" | "irc" | "unknown"

/*
[9:06 PM] Wheatless: wow gj gabe
[9:06 PM] PJ: [tiff snaps into the sunset]
*/
const discordRegex = /(^\[\d{1,2}:\d{2} (A|P)M\] \w+: (.+)$)+/m

/*
<tttb> Why did the programmer quit his job?
<tttb> because he didn't get arrays
*/
const ircRegex = /(^<[^\s]+> (.+)$)+/m

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
const slackRegex = /^(.+?[^\s])( |$)\[\d{1,2}:\d{2} (A|P)M\]$(.*?$)+?/m

function classifyQuote(rawPaste: string): QuoteClass {
    let match;
    match = rawPaste.match(discordRegex);
    if (match) {
        return "discord";
    }

    match = rawPaste.match(ircRegex);
    if (match) {
        return "irc";
    }

    match = rawPaste.match(slackRegex);
    if (match) {
        return "slack";
    }


    return "unknown";
}

export default classifyQuote