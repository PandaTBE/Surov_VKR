const { Schema, model } = require('mongoose');

const schema = new Schema({
    platform: { type: String },
    userAgent: { type: String },
    ip: String,
    city: String,
    coordinates: Array,
});

module.exports = model('Init', schema);
