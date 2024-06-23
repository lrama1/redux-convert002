const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jsonQuery = require('json-query')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const accounts = require('./Accounts.json')

app.get('/redux-convert002/accounts', (req, res) =>{
    return res.json(accounts)
})

app.get('/redux-convert002/account/:accountId', (req, res) =>{
    const returnVal = jsonQuery('rows[accountId=' + req.params.accountId + ']',{data: accounts})
    return res.json(returnVal.value)
})

app.listen(8000)
console.log('Listening on port 8000')