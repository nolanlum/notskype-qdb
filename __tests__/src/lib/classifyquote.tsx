import classifyQuote from "lib/classifyquote";

const reject = (quote) => expect(classifyQuote(quote)).toEqual({
    type: "unrecognized",
    message: quote
});


describe("classifyQuote", function() {

    it("should parse a discord log", function() {
        let discordLog = "[9:06 PM] Wheatless: wow gj gabe"
        expect(classifyQuote(discordLog)).toEqual({
            type: "discord",
            messages: [
                { speaker: "Wheatless", body: "wow gj gabe" }
            ]
        });

        discordLog += "\n[9:06 PM] PJ: [tiff snaps into the sunset]";
        expect(classifyQuote(discordLog)).toEqual({
            type: "discord",
            messages: [
                { speaker: "Wheatless", body: "wow gj gabe" },
                { speaker: "PJ", body: "[tiff snaps into the sunset]" }
            ]
        });

        expect(classifyQuote("[12:46 AM] Jay Tau: !aku texas")).toEqual({
            type: "discord",
            messages: [
                { speaker: "Jay Tau", body: "!aku texas" },
            ]
        });

    });

    it("should parse a multiline discord log", function() {
        expect(classifyQuote("[12:46 AM] Jay Tau: !aku texas\n!aku texas")).toEqual({
            type: "discord",
            messages: [
                { speaker: "Jay Tau", body: "!aku texas\n!aku texas" },
            ]
        });
    })


    it("should parse a discord log with crlf", function() {
        expect(classifyQuote("[12:46 AM] Jay Tau: !aku texas\r\n[12:46 AM] Jay Tau: !aku texas")).toEqual({
            type: "discord",
            messages: [
                { speaker: "Jay Tau", body: "!aku texas" },
                { speaker: "Jay Tau", body: "!aku texas" },
            ]
        });
    })

    it("should reject not-quite discord logs", function() {
        reject("[9:06 ZM] PJ: [tiff snaps into the sunset]");
        reject("[9:06 AD] PJ: [tiff snaps into the sunset]");
        reject("[111:06 AM] PJ: [tiff snaps into the sunset]");
        reject("[1:096 AM] PJ: [tiff snaps into the sunset]");
        reject("[1:00 AM]PJ: [tiff snaps into the sunset]");
        reject("[1:00 PM] PJ : [tiff snaps into the sunset]");
        reject("[1:00 PM] PJ : ");
    });


    it("should recognize an irc log", function() {
        let ircLog = "<tttb> Why did the programmer quit his job?"
        expect(classifyQuote(ircLog)).toEqual({
            type: "irc",
            messages: [
                { speaker: "tttb", body: "Why did the programmer quit his job?" },
            ]
        });

        ircLog += "\n<#tttb_> because he didn't get arrays";
        expect(classifyQuote(ircLog)).toEqual({
            type: "irc",
            messages: [
                { speaker: "tttb", body: "Why did the programmer quit his job?" },
                { speaker: "#tttb_", body: "because he didn't get arrays" },
            ]
        });

    });

    it("should parse an irc log with crlf", function() {
        expect(classifyQuote("<tttb> its yaboi\r\n<llc> ayy lmao")).toEqual({
            type: "irc",
            messages: [
                { speaker: "tttb", body: "its yaboi" },
                { speaker: "llc", body: "ayy lmao" },
            ]
        });
    })

    it("should reject not-quite irc logs", function() {
        reject("<asd > askdhjalskjdh");
        reject("<as asd> askdhjalskjdh");
        reject("<as asd> ");
    });

    it("should recognize a slack log", function() {
        let slackLog =
            "Tiffany [5:15 PM]\n"+
            "shucks\n"+
            "\n"+
            "melanie \n"+
            "[5:16 PM] \n"+
            "Qq\n"+
            "\n"+
            "Sean★\n"+
            "[5:18 PM] \n"+
            "@melanie did you ever see my thread replies this afternoon\n"+
            "\n"+
            "melanie\n"+ 
            "[5:23 PM] \n" +
            "I just got home, so I'm gonna read them now!\n";

        expect(classifyQuote("Tiffany [5:15 PM]\n"+
            "shucks\n")).toEqual({
            type: "slack",
            messages: [
                { speaker: "Tiffany", body: "shucks" },
            ]
        });

        expect(classifyQuote("Tiffany [05:15 AM]\n"+
            "shucks\n"+
            "golly\n")).toEqual({
            type: "slack",
            messages: [
                { speaker: "Tiffany", body: "shucks\ngolly" },
            ]
        });

        expect(classifyQuote("Max [5:15 PM]\n"+
            ":thinking_face:\n" +
            "\n" +
            "Max [5:15 PM]\n"+
            ":thinccing_face:\n" +
            "\n"
            )).toEqual({
            type: "slack",
            messages: [
                { speaker: "Max", body: ":thinking_face:" },
                { speaker: "Max", body: ":thinccing_face:" },
            ]
        });

    });


    it("should parse a crlf slack log", function() {
        expect(classifyQuote("Tiffany [05:15 AM]\n"+
            "shucks\r\n"+
            "golly\r\n")).toEqual({
            type: "slack",
            messages: [
                { speaker: "Tiffany", body: "shucks\ngolly" },
            ]
        });        
    })

    it("should reject not-quite slack logs", function() {
        reject("Tiffany [500:15 PM]\n" +
            "shucks\n");

        reject("Tiffany [50:151 PM]\n" +
            "shucks\n");

        reject("Tiffany [50:151 ZM]\n" +
            "shucks\n");

        reject("Tiffany  [5:15 PM]\n" +
            "shucks\n");

    });

    // it("should parse a compact slack log", function() {
    //     expect(classifyQuote("[05:15 AM] nolm compact slack is super consistent\n"+
    //         "[05:15 AM] nolm haha jk"
    //         )).toEqual({
    //         type: "slack",
    //         messages: [
    //             { speaker: "nolm", body: "compact slack is super consistent" },
    //             { speaker: "nolm", body: "haha jk" },
    //         ]
    //     });        
    // })

})
