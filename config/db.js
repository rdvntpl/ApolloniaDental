const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/apolloniadentaldb'

const connectDb = () => {
    mongoose.connect(url ,).then( (res)=>{
        console.log('Connected to MongoDB')
    }).catch(error => {
        console.log(error)
    })
}

module.exports = connectDb