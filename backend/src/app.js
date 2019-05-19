const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const fs = require('fs');

const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

const visualRecognition = new VisualRecognitionV3({
	version: '2019-05-17',
	iam_apikey: 'Actw2Gkyp7mACcVfmUmJpwExvS-n_ZW2QUdXAUH8PxR8'
});

const images_file = fs.createReadStream('../backend/assets/truePositives/human1.jpeg');
const classifier_ids = ["DefaultCustomModel_1998152133"];
const threshold = 0.6;

const params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold
};


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/',function(req,res){
  visualRecognition.classify(params, function(err, response) {
  	if (err) {
  		console.log(err);
  	} else {
      res.send(response);
  	}
  });
});

app.listen(3000, () => {
  console.log("App Started .......");
})


module.exports = app;
