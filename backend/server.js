const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating tokens

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.username ,
  password: process.env.password ,
  database: process.env.database
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// API Routes

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(password)
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) return res.status(500).send('Database error');
      if (results.length === 0) return res.status(401).send({ success: false });
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) return res.status(401).send({ success: false });
        const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
        res.send({ success: true, token });
      });
    });
  });

  
  app.get('/api/allflashcards', (req, res) => {
    const query = 'SELECT * FROM flashcards';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Error fetching flashcards');
        return;
      }
      res.json(results);
    });
  });  


// Get all flashcards
app.get('/api/flashcards', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM flashcards';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching flashcards');
      return;
    }
    res.json(results);
  });
});

// Add a new flashcard
app.post('/api/flashcards', authenticateToken, (req, res) => {
    const { question, answer } = req.body;
    const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
    db.query(query, [question, answer], (err, results) => {
      if (err) {
        res.status(500).send('Error adding flashcard');
        return;
      }
      res.status(201).json({ id: results.insertId, question, answer });
    });
  });
  

// Update an existing flashcard
app.put('/api/flashcards/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  db.query(query, [question, answer, id], (err) => {
      if (err) {
          res.status(500).send('Error updating flashcard');
          return;
      }
      res.send('Flashcard updated successfully');
  });
});

app.delete('/api/flashcards/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  db.query(query, [id], (err) => {
      if (err) {
          res.status(500).send('Error deleting flashcard');
          return;
      }
      res.send('Flashcard deleted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
