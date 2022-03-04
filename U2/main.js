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
            let conf = confirm(`Do you really want to remove ${car.model}?`)
            if (conf == true) {
                cars.splice(i, 1);
                for (let y = 0; y < cars.length; y++) {
                    cars[y].id = y + 1;
                }
                renderCars(database)
                

            }

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

    for (let i = 0; i < carsByBody.length; i++) {
        carsByBody[i].id = i + 1
    }

    return carsByBody;
}

function getCarsByDrivetrain(cars, drivetrain) {
    let carsByDrivetrain = [];

    for (let car of cars) {
        if (car.drivetrain.toLowerCase() == drivetrain.toLowerCase()) {
            carsByDrivetrain.push(car)
        }
    }

    for (let i = 0; i < carsByDrivetrain.length; i++) {
        carsByDrivetrain[i].id = i + 1
    }

    return carsByDrivetrain
}

function renderCar(car) {
    let div = document.createElement("div");
    div.classList.add("car");
    div.id = car.id

    div.innerHTML = `
    <div>${car.id}</div>
    <div>${car.model}</div>
    <div>${car.body}</div>
    <div>${car.price}</div>
    <div>${car.drivetrain}</div>
    <button type="button">Remove</button>
    `;

    return div;
}

function renderCars(cars) {
    let carsElement = document.getElementById("cars");
    carsElement.innerHTML = "";

    for (let car of cars) {
        let carElement = renderCar(car);
        carsElement.appendChild(carElement);
    }

    setRemoveCarHandlers();
}

function onAddCarSubmit(event) {
    event.preventDefault();

    let model = document.getElementById("model").value;
    let body = document.getElementById("body").value;
    let price = Number(document.getElementById("price").value);
    let drivetrain = document.getElementById("drivetrain").value;

    let car = createNewCar(model, body, price, drivetrain);

    car.id = database[database.length - 1].id + 1;

    if (model == "") {
        return alert("You need to enter the model name!");
    }

    else if (body == "") {
        return alert("You need to enter a body-type!")
    }

    else if (price == 0) {
        return alert("You forgot to fill in a price!")
    }

    if (model != "" && body != "" && price != 0 == true) {
        let conf = confirm("Do you really want to add this car?")
        if (conf == true) {
            addCarToDatabase(database, car);
        }
    }

    for (let i = 0; i < database.length; i++) {
        database[i].id = i + 1
    }

    renderCars(database);

    let form = document.getElementById("add-car-form");
    form.reset();
}

function setAddCarHandler() {
    let form = document.getElementById("addbutton");
    form.addEventListener("click", onAddCarSubmit);
}

function onRemoveCarClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    removeCarById(database, id);
    // renderCars(database)
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
    renderCars(cars);
    return cars
}

function onFilterByDrivetrain(event) {
    event.preventDefault();
    let drivetrain = document.getElementById("filter-drivetrain").value;
    let cars = getCarsByDrivetrain(database, drivetrain);
    renderCars(cars);
    return cars
}

function onListAllClick() {
    document.getElementById("filter-body").value = "";
    document.getElementById("filter-drivetrain").value = "";
    renderCars(database);
}

function setFilterCarHandlers() {
    let body_form = document.getElementById("filter-by-body");
    let drivetrain_form = document.getElementById("filter-by-drivetrain");
    let listAll = document.getElementById("list-all");

    body_form.addEventListener("submit", onFilterByBody);
    drivetrain_form.addEventListener("submit", onFilterByDrivetrain);
    listAll.addEventListener("click", onListAllClick);
}

renderCars(database);
setAddCarHandler();
setFilterCarHandlers();