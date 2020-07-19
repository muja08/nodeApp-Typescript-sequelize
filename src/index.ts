import express from 'express';
import sequelize from './sequelize-connection';
import bodyParser from 'body-parser';
import { videocontents } from './model/videocontents';

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({})
  }
  next();
});



app.use('/onboard', require('./routes/onboard').router);



app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});


















app.post('/listVideos', (req, res) => {
  const failedResponse: any = {
    success: false
  };
  const successResponse: any = {
    success: true,
  };
  try {
    
    videocontents.findAll({
    }).then((resp: any) => {
      resp = JSON.parse(JSON.stringify(resp));

      res.send(JSON.stringify(resp));


    }).catch((error: any) => {
      console.log('error', error)
      failedResponse.message = 'User Creation Failed!!';
      res.send(JSON.stringify(failedResponse));
    })


  } catch (errored) {
    res.send(JSON.stringify(failedResponse));
  }
});






sequelize.sync().then();