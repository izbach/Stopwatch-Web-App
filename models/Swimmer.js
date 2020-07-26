var mongoose = require("mongoose");
var swimmerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    gender: String,
    email: String,
    
})

module.exports = mongoose.model("Swimmer", swimmerSchema);