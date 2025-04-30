const mongoose = require("mongoose")

const subscriberSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    interests: {
        type: String,
        default: "",
    }, 
    subscribedAt:  {
        type: Date,
        default: Date.now
    }
})

module.exports =mongoose.model("Subscriber",  subscriberSchema)