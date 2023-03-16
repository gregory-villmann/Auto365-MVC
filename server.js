const express = require('express');
const { PrismaClient } = require('@prisma/client');
const carsRouter = require('./routes/cars');
const cors = require('cors')

const app = express();
app.use(cors());
const prisma = new PrismaClient();

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
