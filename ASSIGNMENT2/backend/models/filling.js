const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fillingSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    alt: { type: String, required: true }
});

module.exports = mongoose.model('Filling', fillingSchema);