const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: { type: String, max: 400 },
    password: {type: String, max: 400}
    
});

const User = mongoose.model('sessions', schema);

module.exports = User;

