const Events = require('../models/events');


module.exports = {};

module.exports.create = async (name, date) => {
   return await Events.create({ name, date });   
};

module.exports.getById = async (id) => {
    try {
      const event = await Events.findOne({ _id: id }).lean();
      return event;
    } catch (e) {
      return null;
    }
  };

  module.exports.getAll = async () => {
    const event = await Events.find();
    return event;
  };

  module.exports.updateById = async (eventId, event) => {
    return await Events.updateOne({ _id: eventId }, event);
  };
  
  module.exports.deleteById = async (id) => {
    await Events.deleteOne({ _id: id });
  };
  