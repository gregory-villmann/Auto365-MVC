const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /cars - get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await prisma.cars.findMany();
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /cars/:id - get a specific car by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const car = await prisma.cars.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!car) {
            res.status(404).json({ error: 'Car not found' });
        } else {
            res.json(car);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /cars - create a new car
router.post('/new', async (req, res) => {
    const { make, model, year, mileage, price, image } = req.body;

    try {
        const car = await prisma.cars.create({
            data: {
                make,
                model,
                year: parseInt(year),
                mileage: parseInt(mileage),
                price: parseInt(price),
                image,
            },
        });

        res.status(201).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /cars/:id - edit a existing car
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const { make, model, year, mileage, price, image } = req.body;

    try {
        const car = await prisma.cars.update({
            where: {id},
            data: {
                make,
                model,
                year: parseInt(year),
                mileage: parseInt(mileage),
                price: parseInt(price),
                image,
            },
        });

        res.status(200).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /cars/:id - Delete a car with the given ID
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedCar = await prisma.cars.delete({
            where: { id },
        });

        res.status(200).json(deletedCar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
