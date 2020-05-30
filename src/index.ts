import express from 'express';
import sequelize from './sequelize-connection';
import uuid = require('uuid');
import { check01 } from './model/check01';

const app = express();
const port = 3000;


app.get('/listUsers', (req, res) => {
  res.send("muja")


  const k: any = {
    'id': '1'
  };
  check01.create(k);
});



app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
sequelize.sync().then();