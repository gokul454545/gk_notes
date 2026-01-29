const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log("Testing MongoDB Connection...");
console.log("URI:", process.env.MONGODB_URI ? "Found URI (hidden)" : "MISSING URI");

mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("SUCCESS: Connected to MongoDB!");
        process.exit(0);
    })
    .catch(err => {
        console.error("FAILURE: Could not connect to MongoDB.");
        console.error("Error Code:", err.code);
        console.error("Error Name:", err.name);
        console.error("Message:", err.message);
        if (err.name === 'MongooseServerSelectionError') {
            console.error("--- DIAGNOSIS ---");
            console.error("Your IP address is likely not whitelisted in MongoDB Atlas.");
            console.error("Please go to Network Access -> Add IP Address -> Add Current IP.");
        }
        process.exit(1);
    });
