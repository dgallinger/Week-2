const { Router } = require("express");
const router = Router();

const EventDAO = require('../daos/events');

//Create an event
router.post('/', async (req, res, next) => {
    const { name } = req.body;
    const { date } = req.body;
    if (!name || !date) {
        res.status(400).send('name and date required');
    } else {
        const event = await EventDAO.create(name, date);
        res.json(event);
    }
});

//Get an event
router.get("/:eventId", async (req, res, next) => {
    const event = await EventDAO.getById(req.params.eventId);
    if (event) {
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  });

//Get all events
router.get("/", async (req, res, next) => {
    const event = await EventDAO.getAll();
    res.json(event);
  });

  //Update an event
router.put("/:eventId", async (req, res, next) => {
    const eventId = req.params.id;
    const event = req.body;
    if (!event || JSON.stringify(event) === '{}' ) {
      res.status(400).send('event is required');
    } else {
      const updatedEvent = await EventDAO.updateById(eventId, event);
      res.json(updatedEvent);
    }
  });

  // Delete an event
router.delete("/:eventId", async (req, res, next) => {
    const eventId = req.params.id;
  
      await EventDAO.deleteById(eventId);
      res.sendStatus(200);
  
  });

module.exports = router;

