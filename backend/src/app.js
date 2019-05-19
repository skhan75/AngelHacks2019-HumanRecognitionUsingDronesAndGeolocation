const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const dummyTargetMarkers = require('../data/dummyTargetMarkers');

const app = express();
app.use(awsServerlessExpressMiddleware.eventContext());

const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

const visualRecognition = new VisualRecognitionV3({
	version: '2019-05-17',
	iam_apikey: process.env.IBM_KEY
});

const images_file = fs.createReadStream('./assets/truePositives/human1.jpeg');
const classifier_ids = ["DefaultCustomModel_1998152133"];
const threshold = 0.6;

const params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold
};


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const classify = () => {
  return new Promise((resolve, reject) => {
    visualRecognition.classify(params, function(err, response) {
    	if (err) {
    		console.error("Error from Visual Rec Module", err);
        reject(err);
    	} else {
        console.log("Visual Rec Response", response);
        resolve(response);
    	}
    });
  })
}

app.get('/',async function(req,res, next){
  let response =  await classify();

  // TODO: To be removed when real integration is done
  /*
  Mocking Drone response for Geo tagged coordinates.
  Assuming its also coming with the response
  */
  response.images.forEach(each => {
    each.classifiers.forEach((res,i ) => {
      const {lat:latitude, lng:longitude} =  dummyTargetMarkers.targets[i];
      res["coordinates"] = {latitude, longitude}
    })
  });

  res.json(response);
});


module.exports = app;
