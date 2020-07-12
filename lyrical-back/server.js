const express = require('express');
const cors = require('cors');
const models = require('./models');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();
app.use(cors());

const MONGO_URI =
  'mongodb+srv://lastaw:passwordpassword@lyricaldb.iovub.mongodb.net/lyricaldb?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once('open', () => console.log('Connected to Mongodb instance.'))
  .on('error', (error) => console.log('Error connecting to Mongodb:', error));

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
