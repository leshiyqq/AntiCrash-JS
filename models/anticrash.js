const mongoose = require('mongoose');

const anticrash = new mongoose.Schema({
    toogle: Boolean,
    gid: String
});

let ac = new mongoose.model('ac', anticrash);

module.exports = ac