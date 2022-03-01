"use strict";

// Skapa nytt objekt i databasen och returnerar det
function createNewCar(model, body, price, drivetrain) {
    let car = {
        model: model,
        body: body,
        price: price,
        drivetrain: drivetrain,
    };

    return car
}

function addCarToDatabase(database, car) {
    database.push(car);
}

function removeCarById(cars, id) {
    for (let i = 0; i < cars.length; i++) {
        let car = cars[i];
        if (car.id == id) {
            cars.splice(i, 1);
            return;
        }
    }
}

function getCarsByBody(cars, body) {
    let carsByBody = [];

    for (let car of cars) {
        if (car.body.toLowerCase() == body.toLowerCase()) {
            carsByBody.push(car);
        } 
    }

    return carsByBody;
}

function getCarsByDrivetrain(cars, drivetrain) {
    let carsByDrivetrain = [];

    for (let car of cars) {
        if (car.drivetrain == drivetrain) {
            carsByDrivetrain.push(car)
        }
    }
    
}

function injectCar(car) {
    let div = document.createElement("div");
    div.classList.add("car");
    div.id = car.id

    div.innerHTML = `
    <div>${car.model}</div>
    <div>${car.body}</div>
    <div>${car.price}</div>
    <div>${car.drivetrain}</div>
    <button type="button">Remove</button>
    `;

    return div;
}

function injectCars(cars) {
    let carsElement = document.getElementById("cars");
    carsElement.innerHTML = "";

    for (let car of cars) {
        let carElement = injectCar(car);
        carsElement.appendChild(carElement);
    }

    setRemoveDogHandlers();
}

function onAddCarSubmit(event) {
    event.preventDefault();

    let model = document.getElementById("model").value;
    let body = document.getElementById("body").value;
    let price = Number(document.getElementById("price").value);
    let drivetrain = document.getElementById("drivetrain").value;



    let car = createNewCar(model, body, price, drivetrain);
    addCarToDatabaseFromPrompt(database, car);
    renderCars(database);

    let form = document.getElementById("add-car-form");
    form.reset();
}

function setAddCarHandler() {
    let form = document.getElementById("add-car-form");
    form.addEventListener("submit", onAddCarSubmit);
}

function onRemoveCarClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    removeCarById(database, id);
    renderCars(cars);
}

function setRemoveCarHandlers() {
    let buttons = document.querySelectorAll(".car button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveCarClick);
    }
}

function onFilterByBody(event) {
    event.preventDefault();
    let body = document.getElementById("filter-body").value;
    let cars = getCarsByBody(database, body);
    injectCars(cars);
}

function onFilterByDrivetrain(event) {
    event.preventDefault();
    let drivetrain = document.getElementById("filter-drivetrain").value;
    let cars = getCarsByDrivetrain(database, drivetrain)
}

function onListAllClick() {
    document.getElementById("filter-body").value = "";
    document.getElementById("filter-drivetrain").value = "";
    injectCars(database);
}

function setFilterCarHandlers() {
    let body_form = document.getElementById("filter-by-body");
    let drivetrain_form = document.getElementById("filter-by-drivetrain")
    let listAll = document.getElementById("list-all");

    body_form.addEventListener("submit", onFilterByBody);
    drivetrain_form.addEventListener("submit", onFilterByDrivetrain);
    listAll.addEventListener("click", onListAllClick);
}

injectCars(database);
setAddCarHandler();
setFilterCarHandlers();