import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';

const router: Router = Router({
    mergeParams: true
});

const CLIENT_ID = '720087900394-emhkhqeh8m9nhq1mm07td42iuihbu56i.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);


async function verifyLogin(idToken) {
    const loginTicket = await client.verifyIdToken({
        idToken: idToken,
        audience: CLIENT_ID,
    });
    const payload = loginTicket.getPayload();

    if (payload === undefined) {
        return;
    }

    const userid = payload['sub'];
    // If request specified a G Suite domain:
    const domain = payload['hd'];

    console.log(domain);
}

router.post('/google', async (req, res, next) => {
    var user = req.body;

    try {
        await verifyLogin(user.idToken);
        console.log("Successfully verified the login!");
    } catch (error) {
        console.error("There was an error verifying the login");
        console.error(error);
    }

    res.json({});
});

export default router;