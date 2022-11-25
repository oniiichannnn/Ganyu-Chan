const Express       = require("express");
const Discord       = require("discord.js");
const Mongoose      = require("mongoose");
const TopGG         = require("@top-gg/sdk");
const ms            = require("ms");

const Models = require("./models");


const App = Express()
const {
    EmbedBuilder
} = Discord;
const {
    Webhook
} = TopGG;



const Client = new Discord.Client({
    intents: [
        "GuildMembers", "GuildMessages", "MessageContent", "Guilds"
    ]
});




App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));




const TOKEN         = process.env["BOT_TOKEN"];
const MongooseURL   = process.env["URL"];
const SECRET        = process.env["SECRET"];
const KoFiToken     = process.env["KOFI_TOKEN"];
const webhook       = new Webhook(SECRET)



Client.on("ready", () => {
    console.log("✅ Ganyu-Chan is Online");
});




App.get("/", (req, res) => {
    res.send("helo")
});



App.post("/api/purchase", async (request, response) => {
    /* ## Single donation
    {
        data: 
            {
                "verification_token"            : "",
                "message_id"                    : "de348d05-0ead-4570-81d9-2f0511c285c5",
                "timestamp"                     : "2022-11-23T15:28:40Z",
                "type"                          : "Donation",       // Donation, Subscription, Commission, or Shop Order
                "is_public"                     : true,             // user can set is public or not, if false, then dont post it publicly
                "from_name"                     : "Ko-fi Team",
                "message"                       : "Good luck with the integration!",
                "amount"                        : "3.00",
                "url"                           : "https://ko-fi.com/Home/CoffeeShop?txid=00000000-1111-2222-3333-444444444444",
                "email"                         : "someone@example.com",
                "currency"                      : "USD",
                "is_subscription_payment"       : false,
                "is_first_subscription_payment" : false,
                "kofi_transaction_id"           : "00000000-1111-2222-3333-444444444444",
                "shop_items"                    : [
                                                    {
                                                      "direct_link_code": "1a2b3c4d5e",
                                                        "variation_name": "Blue",
                                                        "quantity": 1
                                                    },
                                                    {
                                                        "direct_link_code": "a1b2c3d4e5",
                                                        "variation_name": "Large",
                                                        "quantity": 5
                                                    }
                                                ],
                "tier_name"                     : "Bronze",
                "shipping"                      : null
            }
    }
    */
    
    if ("data" in request.body === false) return;

    const Purchase = request.body.data;

    // Subscriptions: Traveller, Favonius Knight, Wangsheng Funeral Parlor Under, Adeptus, Archon
    if (Purchase.tier_name !== null) {
        const CurrentDate = new Date();

        const SubscriptionData = {
            tier    : Purchase.tier_name,
            from    : CurrentDate.getTime(),
            until   : CurrentDate.setMonth(CurrentDate.getMonth() + 1) // timestamp
        }

        const ExistingPurchases = await Models.Purchases.findOne({ _id: P })
    }


    /* Shop items
        c9afedeb9f - ✨ Primogems x2,000
        5ea37e9e9b - ✨ Primogems x20,000
        883ddf0e4c - ✨ Primogems x40,000
        1fcd287e81 - 🪙 Mora x500,000
        0af0f06bb4 - 🪙 Mora x1,000,000
        99d1653450 - 💎 Genesis Crystals x150
        7ca5f2e1d6 - 💎 Genesis Crystals x350
        28954a90b3 - 💎 Genesis Crystals x600
        4075d7bc14 - 💎 Genesis Crystals x800
    */
});

App.post("/api/votes/topgg", webhook.listener(async Vote => {
    const UserId = Vote.user;
    const Player = await Models["Player"].findOne({ _id: UserId });
    const PlayerProfile = await Models["Player Profile"].findOne({ _id: UserId });
    const User = await Client.users.fetch(UserId);


    if (Balance === null) {
        try {
            await User.send({
                content: `Hello **${User.username}**! You have not created an account, please create an account in order to receive rewards from voting. You can create an account by typing \`kcreate\` in any server that has Karyl in it.`
            });
        } catch { }
    }


    const NewCurrencies = { ...Balance.currencies };
    const NewStats      = [...PlayerProfile.stats];
    let   VoteCount     = 1;


    NewCurrencies.Primogem += 160;
    NewCurrencies.Mora     += 5000;

    if (NewStats.find(stat => stat.name === "Vote Cooldown")) {
        NewStats.splice(NewStats.findIndex(stat => stat.name === "Vote Cooldown"), 1);
    }

    if (NewStats.find(stat => stat.name === "Votes")) {
        VoteCount += NewStats.find(stat => stat.name === "Votes").data.votes;

        NewStats.splice(NewStats.findIndex(stat => stat.name === "Votes"), 1);
    }



    NewStats.push({
        name: "Vote Cooldown",
        data: {
            cooldown: Date.now() + ms("12 hour")
        },
        display: true
    });

    NewStats.push({
        name: "Votes",
        data: {
            votes: VoteCount
        },
        display: true
    });



    await Player.updateOne({
        currencies: NewCurrencies
    });

    await PlayerProfile.updateOne({
        stats: NewStats
    });



    await Client.channels.cache
        .get("926755476643934218")
        .send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: User.tag, iconURL: User.displayAvatarURL({ extension: "gif" }) })
                    .setTitle("Voted On Top.gg")
                    .setURL("https://top.gg/bot/892431287699243038/")
                    .setDescription(
                        "[`  +160`](https://top.gg/bot/892431287699243038/) <:Primogem:886542095274352652>\n" +
                        "[`+5,000`](https://top.gg/bot/892431287699243038/) <:Mora:886479447635669042>"
                    )
                    .setColor("#2C2F33")
            ]
        });
}));



App.listen(4000, () => {
    console.log("✅ Backend Online");
})

Mongoose.connect(MongooseURL, () => {
    console.log("✅ Database Connected")
})

Client.login(TOKEN).catch(console.log)