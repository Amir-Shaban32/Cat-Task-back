import { Vehicle } from "./vehicle.js";


export class Bicycle extends Vehicle {
    constructor(color, no_wheels = 2, horn = "honk honk") {
        super(color, no_wheels, horn);
    }
}