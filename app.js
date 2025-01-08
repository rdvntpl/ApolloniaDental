const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
const employee = require('./models/employee')

const app = express()

connectDb()
const port = process.env.NODE_LOCAL_PORT || 8081

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(require('./routes/employee'))
app.use(require('./routes/department'))
app.use(require('./routes/admin')) // Add admin router

app.set('view engine','ejs')

app.get('/', (req,res) => {
    res.render('home')
})

app.listen(port, ()=>{
    console.log('Server is running on port '+port)
})