const express = require('express');
const app = express();
const tasksRouter = require('./index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount the tasks router at the root endpoint
app.use('/', tasksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
