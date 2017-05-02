import classifyQuote from "lib/classifyquote";

const reject = (quote) => expect(classifyQuote(quote)).toEqual({
    type: "unknown",
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

    });

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

        // expect(classifyQuote("Max [5:15 PM]\n"+
        //     ":thinking_face:\n"
        //     "\n"
        //     "Max [5:15 PM]\n"+
        //     ":thinccing_face:\n"
        //     "\n"
        //     )).toEqual({
        //     type: "slack",
        //     messages: [
        //         { speaker: "Max", body: ":thinking_face:\n" },
        //         { speaker: "Max", body: ":thinccing_face:\n" },
        //     ]
        // });

    });

    it("should reject not-quite slack logs", function() {
        reject("Tiffany [500:15 PM]\n"+
            "shucks\n");

        reject("Tiffany [50:151 PM]\n"+
            "shucks\n");

        reject("Tiffany [50:151 ZM]\n"+
            "shucks\n");

        reject("Tiffany  [5:15 PM]\n"+
            "shucks\n");

    });


})
