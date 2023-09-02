const mongoose = require('mongoose');

let pu = new mongoose.Schema({
    uid: String,
    money: String
});

const prof = mongoose.model('prof', pu)

module.exports = prof