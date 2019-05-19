const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/app');

app.set('port', 1337);

// start the server
app.listen(app.get('port'), () => {
    const port = app.get('port');
    console.log('Server Running at http://127.0.0.1:' + port);
});

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  try {
    return awsServerlessExpress.proxy(server, event, context);
  } catch(e) {
    console.error("ERROR", e);
  }

}
