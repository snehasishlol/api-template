const mongoose = require('mongoose');
const colors = require('colors');

const connectMongoDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) return console.log('[DB]: No MongoDB URI found.'.red);
    mongoose.connect(uri);
    console.log('[DB]: MongoDB Connection Successful.'.green);
}

module.exports = connectMongoDB;