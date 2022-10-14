const router = require('express').Router();
const path = require("path");
const fs = require('fs');
const express = require("express");
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
require('dotenv').config()
const {isLoggedIn} = require("../middleware/isLoggedIn");

/************************************************************************* Helper Functions, don't feel like doing a controller for this challenge...  ***********************************************************************************/

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
}

const UNSAFE_KEYS = ["__proto__", "constructor", "prototype"];

const merge = (obj1, obj2) => {
    for (let key of Object.keys(obj2)) {
        if (UNSAFE_KEYS.includes(key)) continue;
        const val = obj2[key];
        key = key.trim();
        if (typeof obj1[key] !== "undefined" && typeof val === "object") {
            obj1[key] = merge(obj1[key], val);
        } else {
            obj1[key] = val;
        }
    }
    return obj1;
};

class cmd {

    SAFE_HOSTS = ["localhost", "127.0.0.1"];

    constructor(logLevel) {
        if (!this.SAFE_HOSTS.includes(host)) {
            this.host = host;
        }
        this.host = "localhost";
        this.logLevel = logLevel;
    }

    getHost() {
        return this.host;
    }

    logCmd() {

        // TODO: Implement different log levels...
        switch (log) {
            case 1:
                console.log("Checked connectivity at " + Date.now());

        }

    }
}

/************************************************************************* Home Route  ***********************************************************************************/

// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "../public"))
// })

// router.get('/admin/?', isLoggedIn, (req, res) => {
//     res.sendFile(path.join(__dirname, "../admin/index.html"))
// })
//
// router.get('/admin/index.html', isLoggedIn, (req, res) => {
//     res.sendFile(path.join(__dirname, "../admin/index.html"))
// })
//
// router.get('/admin/products.html', isLoggedIn, (req, res) => {
//     res.sendFile(path.join(__dirname, "../admin/products.html"))
// })

router.post('/admin', (req, res) => {

    // TODO: Implement admin login using JWT
    res.send("Wrong Username or Password");

})

router.get("/speakers", (req, res) => {
    if (!req.query.p || !fs.existsSync(path.join(__dirname, "../public", `${req.query.p}`))) {
        res.redirect("/index.html")
    }
    res.sendFile(path.join(__dirname, "../public", `${req.query.p}`), { dotfiles: "allow", root: path.join(__dirname, "../") });
})

router.post("/checkConnectivity", isLoggedIn, (req, res) => {
    console.log("req.body: " + JSON.stringify(req.body))
    let obj = {};
    let body = merge(obj, req.body);
    let cmd = new cmd();
    console.log("req.body.__proto__: " + req.body.__proto__)
    console.log("body.host: " + body.host)
    console.log("body.test: " + body.test)
    console.log("obj.__proto__.host: " + cmd.__proto__.host)
    console.log("obj.host: " + cmd.host)
    exec(`ping -n 1 ${obj.getHost()}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.send(stdout);
    });
});

module.exports = router;
