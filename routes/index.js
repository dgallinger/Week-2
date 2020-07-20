const { Router } = require("express");
const router = Router();

router.use("/calendars", require('./calendars.js'));
router.use("/calendars/:calendarId/events", require('./events.js'));

module.exports = router;