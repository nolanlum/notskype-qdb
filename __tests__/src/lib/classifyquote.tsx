import classifyQuote from "lib/classifyquote";

describe("classifyQuote", function() {

    it("should recognize a discord log", function() {
        let discordLog = "[9:06 PM] Wheatless: wow gj gabe"
        expect(classifyQuote(discordLog)).toEqual("discord");

        discordLog += "\n[9:06 PM] PJ: [tiff snaps into the sunset]";
        expect(classifyQuote(discordLog)).toEqual("discord");

    });

    it("should reject not-quite discord logs", function() {
        const tst = (quote) => expect(classifyQuote(quote)).toEqual("unknown");

        tst("[9:06 ZM] PJ: [tiff snaps into the sunset]");
        tst("[9:06 AD] PJ: [tiff snaps into the sunset]");
        tst("[111:06 AM] PJ: [tiff snaps into the sunset]");
        tst("[1:096 AM] PJ: [tiff snaps into the sunset]");
        tst("[1:00 AM]PJ: [tiff snaps into the sunset]");
        tst("[1:00 PM] PJ : [tiff snaps into the sunset]");
        tst("[1:00 PM] PJ : ");
    });


    it("should recognize an irc log", function() {
        let ircLog = "<tttb> Why did the programmer quit his job?"
        expect(classifyQuote(ircLog)).toEqual("irc");

        ircLog += "\n<#tttb_> because he didn't get arrays";
        expect(classifyQuote(ircLog)).toEqual("irc");

    });

    it("should reject not-quite irc logs", function() {
        const tst = (quote) => expect(classifyQuote(quote)).toEqual("unknown");

        tst("<asd > askdhjalskjdh");
        tst("<as asd> askdhjalskjdh");
        tst("<as asd> ");
    });

    it("should recognize a slack log", function() {
        const tst = (quote) => expect(classifyQuote(quote)).toEqual("slack");

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

        tst("Tiffany [5:15 PM]\n"+
            "shucks\n");

        tst("Tiffany [05:15 AM]\n"+
            "shucks\n");

        tst("Tiffany Lu [5:15 PM]\n"+
            "shucks\n");

        tst("Max [5:15 PM]\n"+
            ":thinking_face:"
            "\n"
            "Max [5:15 PM]\n"+
            ":thinking_face:"
            "\n"
            );

    });

    it("should reject not-quite slack logs", function() {
        const tst = (quote) => expect(classifyQuote(quote)).toEqual("unknown");

        tst("Tiffany [500:15 PM]\n"+
            "shucks\n");

        tst("Tiffany [50:151 PM]\n"+
            "shucks\n");

        tst("Tiffany [50:151 ZM]\n"+
            "shucks\n");

        tst("Tiffany  [5:15 PM]\n"+
            "shucks\n");

    });


})
