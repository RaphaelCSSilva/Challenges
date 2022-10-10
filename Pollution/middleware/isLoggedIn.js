const jwt = require("jsonwebtoken");
const path = require("path");
require('dotenv').config()

function isLoggedIn(req, res, next) {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (token == null) return res.status(401).send({
            message: "The token can not be empty."
        })

        console.log("Token: " + token)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("Error: " + err)
                return res.status(403).send({
                    message: "An error occurred when verifying the token."
                });
            }

            console.log("User: " + JSON.stringify(user));

            if (user.isAdmin === true) {
                next();
            }

            res.status(401).send("You're not an admin!")

        });
    } else {
        res.sendFile(path.join(__dirname, "../admin/login.html"))
    }

}

module.exports = {
    isLoggedIn
}