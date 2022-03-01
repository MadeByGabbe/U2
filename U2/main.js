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


