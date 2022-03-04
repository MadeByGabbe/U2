"use strict";

// Pushes a new car to our database
function addCarToDatabase(database, car) {
    database.push(car);
}

// Creates a new car object
function createNewCar(model, body, price, drivetrain) {
    let car = {
        model: model,
        body: body,
        price: price,
        drivetrain: drivetrain,
    };

    return car
}

// Returns all cars by specified body
function getCarsByBody(cars, body) {
    let carsByBody = [];

    // If the cars' body equals specified body, push to array
    for (let car of cars) {
        if (car.body.toLowerCase() == body.toLowerCase()) {
            carsByBody.push(car);
        
        } 
    }

    // Rewrite ID to fit new array
    idFixer(carsByBody)

    return carsByBody;
}

// Returns all cars by specified drivetrain
function getCarsByDrivetrain(cars, drivetrain) {
    let carsByDrivetrain = [];

    for (let car of cars) {
        if (car.drivetrain.toLowerCase() == drivetrain.toLowerCase()) {
            carsByDrivetrain.push(car)
        }
    }

    idFixer(carsByDrivetrain)

    return carsByDrivetrain
}

// Fixes ids to display in order
function idFixer(array) {
    for (let i = 0; i < array.length; i++) {
        // Loops through array and replace IDs
        array[i].id = i + 1
    }
}

// When the add car form is submitted
function onAddCarSubmit(event) {
    // Prevents sending to new page
    event.preventDefault();

    let model = document.getElementById("model").value;
    let body = document.getElementById("body").value;
    let price = Number(document.getElementById("price").value);
    let drivetrain = document.getElementById("drivetrain").value;
    let car = createNewCar(model, body, price, drivetrain);

    // Alerts for empty fields on submit
    if (model == "") {
        return alert("You need to enter a model name!");
    }

    else if (body == "") {
        return alert("You need to enter a body-type!")
    }

    else if (price == 0) {
        return alert("You need to enter a price!")
    }

    // If everything is filled, asks to confirm and then add car
    if (model != "" && body != "" && price != 0 == true) {
        let conf = confirm("Do you really want to add this car?")
        if (conf == true) {
            addCarToDatabase(database, car);
        }
    }

    // Calculates ID of new cars
    car.id = database[database.length - 1].id + 1;

    // Rewrites IDs for whole list to fit order
    idFixer(database)

    renderCars(database);

    // Emptys all form fields after submit
    let form = document.getElementById("add-car-form");
    form.reset();
}

// Filter cars by body
function onFilterByBody(event) {
    event.preventDefault();
    // Fetch input value from filter form
    let body = document.getElementById("filter-body").value;
    // Get cars by body
    let cars = getCarsByBody(database, body);
    // Render filtered cars
    renderCars(cars);
}

// Filter cars by drivetrain
function onFilterByDrivetrain(event) {
    event.preventDefault();
    // Fetch input value from filter form
    let drivetrain = document.getElementById("filter-drivetrain").value;
    // Get cars by drivetrain
    let cars = getCarsByDrivetrain(database, drivetrain);
    // Render filtered cars
    renderCars(cars);
}

// When clicking on remove buttons
function onRemoveCarClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    // To remove car from global "database"
    removeCarById(database, id);
}

// Clears filters and render all cars in database
function onViewAllClick() {
    // Clear filters
    document.getElementById("filter-body").value = "";
    document.getElementById("filter-drivetrain").value = "";

    // Rewrite ID to fit order
    idFixer(database)
    renderCars(database);
}

// Removes a car from the database based on ID
function removeCarById(cars, id) {
    for (let i = 0; i < cars.length; i++) {
        // This is our car currently in the loop
        let car = cars[i];
        // Checking if the id matches the car we want to remove
        if (car.id == id) {
            // Confirm if you want to remove it
            let conf = confirm(`Do you really want to remove this car?`)
            // If it's true, remove it from array and replace ids
            if (conf == true) {
                cars.splice(i, 1);
                for (let y = 0; y < cars.length; y++) {
                    cars[y].id = y + 1;
                }
                // Then rerender the cars in the list
                renderCars(database)
                

            }

            return;
        }
        
    }
}

// Render HTML element for car object
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

// Renders the array of cars to HTML
function renderCars(cars) {
    let carsElement = document.getElementById("cars");
    carsElement.innerHTML = "";

    // Goes through all cars and insert their html respectively
    for (let car of cars) {
        let carElement = renderCar(car);
        carsElement.appendChild(carElement);
    }

    // Set remove-handlers for each car
    setRemoveCarHandlers();
}

// Adds click-event to add-button
function setAddCarHandler() {
    let form = document.getElementById("addbutton");
    form.addEventListener("click", onAddCarSubmit);
}

// Adds click-event to remove-buttons
function setRemoveCarHandlers() {
    let buttons = document.querySelectorAll(".car button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveCarClick);
    }
}

// Adds submit and click-events to filter buttons and view all
function setFilterCarHandlers() {
    // Fetch elements
    let body_form = document.getElementById("filter-by-body");
    let drivetrain_form = document.getElementById("filter-by-drivetrain");
    let viewAll = document.getElementById("view-all");

    // Add events
    body_form.addEventListener("submit", onFilterByBody);
    drivetrain_form.addEventListener("submit", onFilterByDrivetrain);
    viewAll.addEventListener("click", onViewAllClick);
}

// To initiallize the page
renderCars(database);
setAddCarHandler();
setFilterCarHandlers();