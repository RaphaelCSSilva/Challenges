const jwt = require("jsonwebtoken");
const path = require("path");
require('dotenv').config()

function isLoggedIn(req, res, next) {

    switch(req.url.split("/")[1]) {
        case "css":
        case "js":
        case "img":
        case "webfonts":
        case "jquery-ui-datepicker":
            return next()
    }

    const authHeader = req.headers.authorization;

    if (authHeader && !req.admin) {
        const token = authHeader.split(' ')[1];

        if (token == null) {

            return res.status(401).send({
                message: "The token can not be empty."
            });

        }

        console.log("Token: " + token);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("Error: " + err)
                return res.status(403).send({
                    message: "An error occurred when verifying the token."
                });
            }

            console.log("User: " + JSON.stringify(user));

            if (user.isAdmin === true) {
                console.log("admin true")
                req.admin = true;
                return next()
                return res.redirect("/admin/dashboard");
            }

            console.log("admin false")

            return res.status(401).send("You're not an admin!")

        });
    } else {
        console.log(`${req.url === "/"} > ${req.url}`)
        if (req.url !== "/") {
            return res.redirect("/admin/");
        }
        return res.sendFile(path.join(__dirname, "../admin/index.html"))
    }

}

module.exports = {
    isLoggedIn
}