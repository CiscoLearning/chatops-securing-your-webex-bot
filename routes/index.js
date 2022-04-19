import express from 'express'
// Add the AppConfig import
import {AppConfig} from '../config/AppConfig.js';
// Add the WebexNotifications import
import {WebexNotifications} from '../services/WebexNotifications.js';

const router = express.Router();
// instantiate the AppConfig
const config = new AppConfig();
// instantiate the WebexNotification class, passing in our app config
const webex = new WebexNotifications(config);

router.post('/', async function(req, res) {
  console.log(`Received a POST`, req.body);
  res.statusCode = 201;
  res.end();
  await webex.sendNotification(req.body, true);
});

export default router;
