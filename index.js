const service = require('./service')
var mongoose = require('mongoose');
const url = require('./config')

const start = async () => {
  await mongoose.connect(url, { useNewUrlParser: true });
  const db = mongoose.connection;
  await service.bestByOrderToday();
  await service.bestByOrderYesterday()
  db.close()
}

start();