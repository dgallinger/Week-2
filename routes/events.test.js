  
const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');

describe("/events", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB)

  describe("GET /:id", () => {
    it("should return 404 if no matching id", async () => {
      const res = await request(server).get("/events/id1");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /', () => {
    it('should return a 400 without name and date provided', async () => {
      //calendar = (await request(server).post("/calendars").send({ name: 'calendar1' })).body;  
      const res = await request(server).post("/calendars/123/events/").send({});
      expect(res.statusCode).toEqual(400);    
    });
  });

  describe('GET /:id after multiple POST /', () => {
    let event1, event2;

    beforeEach(async () => {
      //calendar = (await request(server).post("/calendars").send({ name: 'calendar1' })).body;  
      event1 = (await request(server).post("/calendars/123/events/").send({ name : 'event1', date : '10-10-2020' })).body;
      event2 = (await request(server).post("/calendars/1/events/").send({ name : 'event2', date : '1-1-1973' })).body;
    });

    it('should return event1 using its id', async () => {
      const res = await request(server).get("/calendars/123/events/" + event1._id);
      expect(res.statusCode).toEqual(200);    
      const storedEvent = res.body;
      expect(storedEvent).toMatchObject(event1);
    });

    it('should return event2 using its id', async () => {
      const res = await request(server).get("/calendars/1/events/" + event2._id);
      expect(res.statusCode).toEqual(200);    
      const storedEvent = res.body;
      expect(storedEvent).toMatchObject(event2);
    });
  });

  describe('GET / after multiple POST /', () => {
    let event1, event2;

    beforeEach(async () => {
      event1 = (await request(server).post("/calendars/234/events/").send({ name: 'event1', date : '1-1-2021' })).body;
      event2 = (await request(server).post("/calendars/345/events/").send({ name: 'event2', date : "11-11-2019" })).body;
    });

    it('should return all events', async () => {
      const res = await request(server).get("/calendars/:id/events/");
      expect(res.statusCode).toEqual(200);    
      const storedEvent = res.body;
      expect(storedEvent).toMatchObject([event1, event2]);
    });
  });

  describe('PUT /:id after POST /', () => {
    let event1;

    beforeEach(async () => {
      event1 = (await request(server).post("/calendars/456/events/").send({ name: 'event1', date : '3-3-2017' })).body;
    });

    it('should store and return event1 with new name', async () => {
      const res = await request(server)
        .put("/calendars/456/events/" + event1._id)
        .send({ name: 'new name', date : '4-4-2020' });
      expect(res.statusCode).toEqual(200);    
      const storedEvent = (await request(server).get("/calendars/456/events/" + event1._id));
      expect(storedEvent.body).toMatchObject(event1);
    });

    it('should return status 400 if no event is provided', async () => {
      const res = await request(server).put("/calendars/456/events/" + event1._id).send({});
      expect(res.statusCode).toEqual(400);
    })
  });

  describe('DELETE /:id after POST /', () => {
    let event1;

    beforeEach(async () => {
      event1 = (await request(server).post("/calendars/789/events/").send({ name: 'event1', date : '2-2-2020' })).body;
    });

    const saveId = { $toString : "event1._id" }

    it('should delete and not return event1 on next GET', async () => {
      const res = await request(server).delete("/calendars/789/events/" + event1._id);
      expect(res.statusCode).toEqual(200);    
      const storedEventResponse = (await request(server).get("/calendars/789/events/" + saveId));
      expect(storedEventResponse.statusCode).toEqual(404);
    });
  });
});