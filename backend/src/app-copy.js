const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');

const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

const visualRecognition = new VisualRecognitionV3({
	version: '2019-05-17',
	iam_apikey: 'Actw2Gkyp7mACcVfmUmJpwExvS-n_ZW2QUdXAUH8PxR8'
});


const images_file= fs.createReadStream('./assets/truePositives/human1.jpeg');
const classifier_ids = ["DefaultCustomModel_1998152133"];
const threshold = 0.6;

const params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold
};

visualRecognition.classify(params, function(err, response) {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.stringify(response, null, 2))
	}
});



const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
