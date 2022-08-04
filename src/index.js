// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const Youtube = require('youtube-stream-url');

// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [{ title: 'Hello, world (again)!' }];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

app.post('/users', (req, res) => {
  res.send(ads);
});

app.get('/test', function (request, response) {
  var id = request.query.id;
  console.log('id:' + id);
  Youtube.getInfo({ url: 'https://www.youtube.com/watch?v=' + id }).then(
    (video) => {
      //console.log(video.formats[0].url);
      response.json({ link: video.formats[0].url });
    }
  );
  //response.writeHead(200, { 'Content-Type': 'text/html' });
  //response.send(id);
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
