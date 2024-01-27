const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://spartahack9:msu@plantdatabase.wvg4q13.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {});

app.use(express.static(path.join(__dirname, 'web')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'list.html'));
});

app.get('/api/items', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('plantlist');
    const collection = database.collection('listofplants');
    const items = await collection.find({}).toArray();
    res.json(items);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
