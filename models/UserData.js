const { Schema, model } = require('mongoose');

const schema = new Schema({
    screen_size: {
        is_important: Boolean,
        value: Object,
    },
    color_depth: {
        is_important: Boolean,
        value: String,
    },
    pixel_ratio: {
        is_important: Boolean,
        value: String,
    },
    user_agent: {
        is_important: Boolean,
        value: String,
    },
    do_not_track_header: {
        is_important: Boolean,
        value: String,
    },
    cookies: {
        is_important: Boolean,
        value: String,
    },
    plugins: {
        is_important: Boolean,
        value: Array,
    },
    timezone: {
        is_important: Boolean,
        value: String,
    },
    date_format: {
        is_important: Boolean,
        value: String,
    },
    languages: {
        is_important: Boolean,
        value: Array,
    },
    platform: {
        is_important: Boolean,
        value: String,
    },
    hardware_concurrency: {
        is_important: Boolean,
        value: String,
    },
    touch_compatibility: {
        is_important: Boolean,
        value: Number,
    },
    canvas_value: {
        is_important: Boolean,
        value: String,
    },
});

module.exports = model('Init', schema);
