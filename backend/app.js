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
        createdAt: new Date(),
        updatedAt: new Date()
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

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { newTitle, newCompleted } = req.body;
    const indexForTaskToUpdate = tasks.findIndex((task) => task.id === id);

    if (indexForTaskToUpdate === -1) {
        return res.status(404).json({ error: 'Task not found' });
    };

     // Update fields (only if provided)
    if (newTitle !== undefined) {
        if (newTitle.trim() === '') {
            return res.status(400).json({ error: 'Title cannot be empty' });
        };
        tasks[indexForTaskToUpdate].title = newTitle;
    };

    if (newCompleted !== undefined) {
        tasks[indexForTaskToUpdate].completed = newCompleted;
    };

    tasks[indexForTaskToUpdate].updatedAt = new Date();

    res.json(tasks[indexForTaskToUpdate]);
});

module.exports = app;