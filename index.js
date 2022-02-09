const mongoose = require('mongoose');
const { db_url } = require('./config')
const port = 3000
const { app } = require('./router')
require('./sequence')

const start = async() => {
    await mongoose.connect(db_url, { useNewUrlParser: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

start();