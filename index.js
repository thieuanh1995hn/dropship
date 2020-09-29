const service = require('./service')
var mongoose = require('mongoose');
const url = "mongodb://root:NDwnMEJ09pds@52.53.199.155:27017/datvt?connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256&3t.uriVersion=3&3t.connection.name=tunel-app";

const start = async () => {
  await mongoose.connect(url, { useNewUrlParser: true });
  const db = mongoose.connection;
  await service.bestByOrderToday();
  db.close()
}

start();