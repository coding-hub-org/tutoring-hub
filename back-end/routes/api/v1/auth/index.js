const express = require('express');
const router = express.Router({
    mergeParams: true
});

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '720087900394-emhkhqeh8m9nhq1mm07td42iuihbu56i.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);


async function verifyLogin(idToken) {
    return new Promise((resolve, reject) => {
        client.verifyIdToken({
            idToken: idToken,
            audience: CLIENT_ID,
        })
            .then(function (loginTicket) {
                const payload = loginTicket.getPayload();
                const userid = payload['sub'];
                // If request specified a G Suite domain:
                const domain = payload['hd'];

                console.log(domain);
                return resolve();
            })
            .catch(function (err) {
                return reject(err);
            });
    });
}

router.post('/google', async (req, res, next) => {
    var user = req.body;

    verifyLogin(user.idToken)
        .then(function () {
            console.log("Successfully verified the login!");
        }).catch(function (err) {
            console.log("There was an error verifying the login");
            console.log(err);
        });

    res.json({});
});


module.exports = router;