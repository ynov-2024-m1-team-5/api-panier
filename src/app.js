const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const { sequelize } = require('./database/index.js');
const apiRouter = require('./router/');
app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`)
    await sequelize.authenticate();
    // await sequelize.sync(); // sync all models with the database
});