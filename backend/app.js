const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
    res.send('Welcome to the Automation First Task Manager!');
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({
            error: 'Title is required'
        });
    };

    const newTask = {
        id: Date.now().toString(),
        title,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
    res.send(tasks);
});

app.delete('/tasks', (req, res) => {
    tasks = [];
    res.send('Tasks deleted.');
});

module.exports = app;