const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Cars API', () => {
    let carId = null;

    // Test GET /cars
    describe('GET /cars', () => {
        it('should get all cars', (done) => {
            chai
                .request(app)
                .get('/cars')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.greaterThan(1);
                    done();
                });
        });
    });

    // Test POST /cars
    describe('POST /cars', () => {
        it('should create a new car', (done) => {
            const car = {
                make: 'Toyota',
                model: 'Camry',
                year: 2021,
                mileage: 200,
                price: 25000,
                image: "qwerty"
            };
            chai
                .request(app)
                .post('/cars/new')
                .send(car)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.make).to.equal(car.make);
                    expect(res.body.model).to.equal(car.model);
                    expect(res.body.year).to.equal(car.year);
                    expect(res.body.mileage).to.equal(car.mileage);
                    expect(res.body.price).to.equal(car.price);
                    expect(res.body.image).to.equal(car.image);
                    carId = res.body.id;
                    done();
                });
        });

        it('should not create a car', (done) => {
            const faultyCar = {
                make: 1,
                model: 1,
                year: "abc",
                price: "ykskaks",
                image: "qwerty"
            };
            chai
                .request(app)
                .post('/cars/new')
                .send(faultyCar)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.error).to.be.equal('Internal server error');
                    done();
                });
        });
    });

    // Test GET /cars/:id
    describe('GET /cars/:id', () => {
        it('should get a single car by id', (done) => {
            const car = {
                make: 'Toyota',
                model: 'Camry',
                year: 2021,
                mileage: 200,
                price: 25000,
                image: "qwerty"
            };
            chai
                .request(app)
                .get(`/cars/${carId}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal(carId);
                    expect(res.body.make).to.equal(car.make);
                    expect(res.body.model).to.equal(car.model);
                    expect(res.body.year).to.equal(car.year);
                    expect(res.body.mileage).to.equal(car.mileage);
                    expect(res.body.price).to.equal(car.price);
                    expect(res.body.image).to.equal(car.image);
                    done();
                });
        });

        it('should not return car', (done) => {
            const idThatDoestnExist = 999999999;
            chai
                .request(app)
                .get(`/cars/${idThatDoestnExist}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.error).to.be.equal('Car not found');
                    done();
                });
        });
    });

    // Test PUT /cars/:id
    describe('PUT /cars/:id', () => {
        it('should update a car by id', (done) => {
            const updatedCar = {
                make: 'Audi',
                model: 'RS6',
                year: 2022,
                mileage: 1,
                price: 1,
                image: "abcdef"
            };
            chai
                .request(app)
                .put(`/cars/${carId}`)
                .send(updatedCar)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.make).to.equal('Audi');
                    expect(res.body.model).to.equal('RS6');
                    expect(res.body.year).to.equal(2022);
                    expect(res.body.mileage).to.equal(1);
                    expect(res.body.price).to.equal(1);
                    expect(res.body.image).to.equal('abcdef');
                    expect(res.body.id).to.equal(carId);
                    done();
                });
        });

        it('should not update car', (done) => {
            const idThatDoestnExist = 999999999;
            const faultyCar = {
                make: 1,
                model: 1,
                year: "abc",
                price: "ykskaks",
                image: "qwerty"
            };
            chai
                .request(app)
                .put(`/cars/${idThatDoestnExist}`)
                .send(faultyCar)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.error).to.be.equal('Internal server error');
                    done();
                });
        });
    });

    // Test DELETE /cars/:id
    describe('DELETE /cars/:id', () => {
        it('should delete a car by id', (done) => {
            const updatedCar = {
                make: 'Audi',
                model: 'RS6',
                year: 2022,
                mileage: 1,
                price: 1,
                image: "abcdef"
            };
            chai
                .request(app)
                .delete(`/cars/${carId}`)
                .send(updatedCar)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.make).to.equal('Audi');
                    expect(res.body.model).to.equal('RS6');
                    expect(res.body.year).to.equal(2022);
                    expect(res.body.mileage).to.equal(1);
                    expect(res.body.price).to.equal(1);
                    expect(res.body.image).to.equal('abcdef');
                    expect(res.body.id).to.equal(carId);
                    done();
                });
        });

        it('should return Iternal Server Error', (done) => {
            const idThatDoestnExist = 999999999;
            chai
                .request(app)
                .delete(`/cars/${idThatDoestnExist}`)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    expect(res.body.error).to.be.equal('Internal server error');
                    done();
                });
        });
    });

})


