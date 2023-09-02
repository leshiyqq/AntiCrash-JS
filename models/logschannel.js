const mongoose = require('mongoose');

let mm = new mongoose.Schema({
    cid: String,
    gid: String,
    logs: Boolean,
    protect: Boolean
});

let lc = mongoose.model('lc', mm);

module.exports = lc