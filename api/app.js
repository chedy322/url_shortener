const express=require('express')
const connect=require('./db/dbconnect')
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express()
require('dotenv').config()
url=process.env.URL
const port=process.env.PROT||3500

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/',require('./route/url'))
const start=async ()=>{
    try{
        await connect(url)
        app.listen(port,()=>{
            console.log('working')
        })
    }catch(err){
        console.log(err)
    }
}

start()