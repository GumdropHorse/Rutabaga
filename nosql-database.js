const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://spartahack9:<Rutabaga>@plantdatabase.wvg4q13.mongodb.net/';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) throw err;

  // Perform database operations here

  client.close();
});
