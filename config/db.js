const mongoose = require('mongoose')

const url = process.env.MONGODB_URI || 'mongodb://ApolloDental:root@mongo:27017/apolloniadentaldb?authSource=admin'

const connectDb = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res) => {
        console.log('Connected to MongoDB')
    }).catch(error => {
        console.log('MongoDB connection error:', error)
    })
}

module.exports = connectDb