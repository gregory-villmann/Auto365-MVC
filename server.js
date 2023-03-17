const express = require('express');
const carsRouter = require('./routes/cars');
const cors = require('cors')

const app = express();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the /cars endpoint
app.use('/cars', carsRouter);

// Default error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
