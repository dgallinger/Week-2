const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  calendar : { type : String, required : false }
});


module.exports = mongoose.model("events", eventSchema);