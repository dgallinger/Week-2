const Calendars = require('../models/calendars');

module.exports = {};
  
module.exports.create = async (name) => {
  return await Calendars.create({ name });
};

module.exports.getAll = async () => {
  const calendar = await Calendars.find();
  return calendar;
};

module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (calendarId, calendar) => {
  return await Calendars.updateOne({ _id: calendarId }, calendar);
};

module.exports.deleteById = async (id) => {
  await Calendars.deleteOne({ _id: id });
};
