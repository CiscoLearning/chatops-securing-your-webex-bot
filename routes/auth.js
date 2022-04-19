import express from 'express'
import {AppConfig} from '../config/AppConfig.js';
import {Auth} from "../services/Auth.js";
// Add the WebexNotifications import
import {WebexNotifications} from '../services/WebexNotifications.js';

const router = express.Router();
const config = new AppConfig();
// instantiate the Auth class, passing in our app config
const auth = new Auth(config);
// ADD CLASS INSTANTIATION
const webex = new WebexNotifications(config);

router.all('/*', async (req, res, next) => {
    // a convenience reference to the POST body
    const messageBody = req.body;
    // a convenience reference to the encrypted string
    const signedValue = req.headers[config.encryptionHeader] || "";
    // call the authentication check
    const isProperlyEncrypted = auth.isProperlyEncrypted(signedValue, messageBody);
    if(!isProperlyEncrypted) {
        res.statusCode = 401;
        res.send("Access denied");
        return;
    }

    // ADD THE AUTHORIZATION CHECK
    const isAuthorized = auth.isUserAuthorized(messageBody);
    if(!isAuthorized) {
        res.statusCode = 403;
        res.send("Unauthorized");
        // ADD THE FAILURE NOTIFICATION
        await webex.sendNotification(messageBody, false);
        return;
    }

    next();
});

export default router;
