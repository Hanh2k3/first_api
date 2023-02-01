const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const routesUser = require('./routes/user') 


const app = express()

app.use(express.json())

// setup connect to mongoDB by mongoose
mongoose.connect('mongodb://localhost/api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected successfully'))
  .catch(err => console.log(err))

// Middleware 
app.use(logger('dev')) // in ra số giấy của một request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


// Routes
app.use('/users', routesUser) 
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'server is ok!'
    })
})


// catch 404 errors and forward the to error (bắt lỗi)
app.use((req, res, next) =>  {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})


// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ?err : {}
    const status = err.status || 500

    // response to client 
    return res.status(status).json({
        error : {
            message: error.message
        }
    })
})


// Start server 
const port = app.get('port') || 3000
app.listen(port, () => console.log(`server is running ${port}`))