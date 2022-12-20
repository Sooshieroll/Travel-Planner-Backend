const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
    name: String,
    address: String,
    rating: Number,
    establishment: String,
    userId: Number

});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;