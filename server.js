const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://spartahack9:msu@plantdatabase.wvg4q13.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {});
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

app.use(bodyParser.json());
app.post('/api/process-list', (req, res) => {
    const selectedItems = req.body;
    console.log(selectedItems);
    /*const pythonProcess = spawn('python', ['vis.py', JSON.stringify(selectedItems)]);
    
    child.stdin.setEncoding('utf-8');
    // Handle Python script error
    pythonProcess.on('error', (error) => {
      console.error('Python script error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    });
    
    // Handle process exit
    pythonProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Send a success response if needed
        res.json({ success: true });
      }
    });

    pythonProcess.on('error', (error) => {
        console.error('Python script error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    });*/
  });
  




async function connectToDatabase() {
    try {
      await client.connect();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  // Middleware to ensure the database connection is established
  app.use(async (req, res, next) => {
    if (!client.isConnected) {
      await connectToDatabase();
    }
    next();
  });
  
  // Serve static files
  app.use(express.static(path.join(__dirname, 'web')));
  
  // API route to fetch items from the database
  app.get('/api/items', async (req, res) => {
    try {
      const database = client.db('plantlist');
      const collection = database.collection('listofplants');
      const items = await collection.find({}).toArray();
      res.json(items);
    } catch (error) {
      console.error('Error fetching items from MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Route to serve the main HTML file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'main.html'));
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    try {
      await client.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
      process.exit(1);
    }
  });
