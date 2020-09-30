const mongoose = require('mongoose');
const { url } = require('./config')
const port = 3000
const { app } = require('./router')

const start = async () => {
  await mongoose.connect(url, { useNewUrlParser: true });
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  // await service.bestByOrderToday();
  // await service.bestByOrderYesterday()
  // await service.bestByReactToday()
  // await service.bestByReactYesterday()
}


start();