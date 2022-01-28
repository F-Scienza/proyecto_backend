const express = require("express");

const app = express()

const { Router } = express
const router = Router()

app.listen(8080, ()=>{
    console.log("listen 8080")
})