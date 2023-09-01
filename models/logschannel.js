const mongoose = require('mongoose');

let mm = new mongoose.Schema({
    cid: String,
    gid: String
});

let lc = mongoose.model('lc', mm)

module.exports = lc