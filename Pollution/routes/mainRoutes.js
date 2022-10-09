const router = require('express').Router();
const path = require("path");


/************************************************************************* Home Route  ***********************************************************************************/

router.get('/', (req,res) => {
    res.sendFile(express.static(path.join(__dirname, '../public/')));
});

/************************************************************************* Admin Route  ***********************************************************************************/

router.get('/admin', (req,res) => {

    const authHeader = req.headers.authorization;

    var userInfo;

    if (authHeader) {

        userInfo = JSON.parse(Buffer.from(authHeader.split(".")[1], "base64").toString("binary"));
        
        console.log("Teste: " + userInfo);


    }


    // if () {

    // }

    res.sendFile(path.join(__dirname, '../public/admin/login.html'));

});

/************************************************************************* API Calendar Routes  ***********************************************************************************/

// const calendar = require("../controllers/calendar.controller.js");

// router.get("/api/v1/calendar", isAuthenticated, isAdmin, calendar.getAllEvents);
// router.get("/api/v1/calendar/:meetingId", isAuthenticated, calendar.getOneEvents);
// router.put("/api/v1/calendar/:meetingId", isAuthenticated, isStaff, calendar.update);



module.exports = router;
