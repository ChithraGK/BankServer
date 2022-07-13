
// import express

const express = require('express')
const jwt = require('jsonwebtoken')
const dataService = require('./services/data.service')
const cors = require('cors')



// create server app

const app = express()

app.use(cors({
    origin:'http://localhost:4200'
}))

// parse json

app.use(express.json())

// application specific middleware

// const appMiddleware = (req,res,next) => {
//     console.log("application specific middleware");
//     next()
// }

// use middleware in app

// app.use(appMiddleware)

const jwtMiddleware = (req, res, next) => {
    try {
        token = req.headers["x-access-token"]
        const data = jwt.verify(token, 'supersecretkey12345')
        console.log(data)
        req.currentAcno=data.currentAcno
        next()
        } catch {
            res.status(401).json({
                status: false,
                statusCode:401,
                message:"please login"
            })
        }
}

// bank server
// register api
app.post('/register', (req, res) => {
    // resolve register here(async)
    dataService.register(req.body.username, req.body.acno, req.body.password)
        .then( result => { res.status(result.statusCode).json(result) } )  
})

// login

app.post('/login', (req,res) => {
    dataService.login(req.body.acno, req.body.pswd)
        .then(result => { res.status(result.statusCode).json(result) })
})

// deposit

app.post('/deposit',jwtMiddleware, (req,res) => {
    dataService.deposit(req,req.body.acno, req.body.pswd, req.body.amt)
        .then( result => { res.status(result.statusCode).json(result) })
    
})

// withdraw

app.post('/withdraw',jwtMiddleware, (req,res) => {
    dataService.withdraw(req,req.body.acno, req.body.pswd, req.body.amt)
        .then(result => { res.status(result.statusCode).json(result) })
    
})

// transaction

app.post('/transaction',jwtMiddleware, (req,res) => {
    dataService.getTransaction(req.body.acno)
        .then( result => { res.status(result.statusCode).json(result) })
})
//delAcc API
app.delete('/deleteAcc/:acno',jwtMiddleware, (req,res) => {
    //delete solving
    dataService.deleteAcc(req.params.acno)
        .then( result => { res.status(result.statusCode).json(result) })
})
// setup a port number

app.listen(3000, () => {
    console.log("server started at 3000");
})

// user request resolving

// get for fetching data

// app.get('/', (req, res) => {
//     res.send("GET request")
// })

// post for creating data 

// app.post('/', (req, res) => {
//     res.send("POST request")
// })

// put for modifying data

// app.put('/', (req, res) => {
//     res.send("PUT request")
// })

// patch for modifying partially

// app.patch('/', (req, res) => {
//     res.send("PATCH request")
// })

// delete to delete data

// app.delete('/', (req, res) => {
//     res.send("DELETE request")
// })