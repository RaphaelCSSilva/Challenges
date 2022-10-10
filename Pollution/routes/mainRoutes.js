const router = require('express').Router();
const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const {isLoggedIn} = require("../middleware/isLoggedIn");

/************************************************************************* Helper Functions, don't feel like doing a controller for this challenge...  ***********************************************************************************/

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
}

/************************************************************************* Home Route  ***********************************************************************************/

router.get('/', (req, res) => {
    console.log("Heyeyeyey")
    res.sendFile(path.join(__dirname, "../public"))
})

router.get('/admin/', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/index.html"))
})

router.get('/admin/index.html', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/index.html"))
})

router.get('/admin/products.html', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/products.html"))
})

router.post('/admin', (req, res) => {

    // Not through here...
    res.send("Wrong Username or Password");

})

module.exports = router;
