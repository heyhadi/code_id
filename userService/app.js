const express = require('express')
const {connect} = require('./mongodb')
const app = express()
const PORT = process.env.PORT || 4001
const routes = require('./routes/index')

app.get('/', (req, res) => {
    res.send('jalan bang')
})


app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(routes);

connect().then(async (db) => {
    console.log("terhubung");
  app.listen(PORT, () => {
    console.log("Runnning at port,", PORT);
  });
});