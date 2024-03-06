var express = require('express');
var router = express.Router();

// In-memory array to store tasks
let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  // Add more tasks as needed
];

/* GET all tasks */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To-Do App', tasks });
});

/* GET a specific task by ID */
router.get('/:id', function(req, res, next) {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    res.status(404).send('Task not found');
    return;
  }

  res.render('task', { title: 'Task Details', task });
});

/* POST create a new task */
router.post('/', function(req, res, next) {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };

  tasks.push(newTask);
  res.redirect('/');
});

/* PUT update a task's completion status */
router.put('/:id', function(req, res, next) {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    res.status(404).send('Task not found');
    return;
  }

  task.completed = !task.completed;
  res.send('Task updated successfully');
});

/* DELETE a task */
router.delete('/:id', function(req, res, next) {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.send('Task deleted successfully');
});

module.exports = router;
