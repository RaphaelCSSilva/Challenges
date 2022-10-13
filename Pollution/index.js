const express = require("express");
const expressSanitizer = require("express-sanitizer");
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const router = require("./routes/mainRoutes");
const bodyParser = require("body-parser");
const {isLoggedIn} = require("./middleware/isLoggedIn")

// Init App
const app = express();

// app.use(
//     cors({
//         credentials: true,
//         origin: "https://",
//         methods: "GET, POST, PUT, DELETE",
//         preflightContinue: true,
//         optionsSuccessStatus: 200
//     })
// );

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

// Set up routes
// app.enable('strict routing');
app.use("/", router);
app.use(express.static(path.join(__dirname, './public')));
// app.all('/admin', isLoggedIn, function(req, res) { res.redirect('/admin/'); });
app.all(/^\/admin$/, function(req, res) { res.redirect('/admin/'); });
app.use("/admin/", isLoggedIn, express.static(path.join(__dirname, './admin')))

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});