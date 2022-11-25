const Mongoose  = require("mongoose")


const object = [ { type: Object, default: {} } ];
const string = [ { type: String, default: "" } ];
const number = [ { type: Number, default: 0  } ];

const object_array = [ { type: [Object], default: [] } ];
const string_array = [ { type: [String], default: [] } ];
const number_array = [ { type: [Number], default: [] } ];


exports["Player"]               = Mongoose.model("Player", new Mongoose.Schema({}), "Player");
exports["Player Profile"]       = Mongoose.model("Player Profile", new Mongoose.Schema({}), "Player Profile");


exports["Purchases"]         = Mongoose.model(
    "Purchases",

    new Mongoose.Schema({
        _id             : string, // User id
        subscriptions   : object_array,
        transactions    : object_array
    })
)