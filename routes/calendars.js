const { Router } = require("express");
const router = Router();

const CalendarDAO = require('../daos/calendars');

//Create calendar
router.post("/", async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send('body parameter "name" is required"');
  } else {
    const calendar = await CalendarDAO.create(name);
    res.json(calendar);
  }
});

//Get calendar
router.get("/:calendarId", async (req, res, next) => {
  const calendar = await CalendarDAO.getById(req.params.calendarId);
  if (calendar) {
    res.json(calendar);
  } else {
    res.sendStatus(404);
  }
});

//Get all calendars
router.get("/", async (req, res, next) => {
  const calendar = await CalendarDAO.getAll();
  res.json(calendar);
});

//Update calendar name
router.put("/:calendarId", async (req, res, next) => {
  const calendarId = req.params.calendarId;
  const calendar = req.body;
  if (!calendar || JSON.stringify(calendar) === '{}' ) {
    res.status(400).send('calendar is required');
  } else {
    const updatedCalendar = await CalendarDAO.updateById(calendarId, calendar);
    res.json(updatedCalendar);
  }
});

// Delete Calendar
router.delete("/:calendarId", async (req, res, next) => {
  const calendarId = req.params.calendarId;
    await CalendarDAO.deleteById(calendarId);
    res.sendStatus(200);
});

module.exports = router;
