const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nikhil',
    password: 'Nikhil@123',
    database: 'react_intern'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
app.use(cors());
// Define your API endpoints  

app.post('/user_info', (req, res) => {
    const { first_name, last_name, date_of_birth } = req.body;

    const sql = 'INSERT INTO user_info (first_name, last_name, date_of_birth) VALUES (?, ?, ?)';
    db.query(sql, [first_name, last_name, date_of_birth], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).json({ error: 'Error saving data' });
            return;
        }
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

// API endpoint to retrieve all data
app.get('/user_info', (req, res) => {
    const sql = 'SELECT * FROM user_info';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            res.status(500).json({ error: 'Error retrieving data' });
            return;
        }
        res.status(200).json(results);
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

