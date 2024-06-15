const mongoose = require('mongoose');

const formShema = mongoose.Schema({
    name: {type: String, required: true},
    public: {type: Boolean, default: true},
    sharelink: {type: String, default: ''},
    share_at: {type: Date, default: null},
    fields: {type: Array, default: []},
    responses: {type: Array, default: []},
    created_at: {type: Date, required: true},
});

module.exports = mongoose.model('Forms', formShema);
