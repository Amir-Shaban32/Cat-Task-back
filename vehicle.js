export class Vehicle {
    constructor(color = "blue", no_wheels = 4, horn = "beep beep") {
        this.color = color;
        this.no_wheels = no_wheels;
        this.horn = horn;
    }

    honkHorn() {
        return this.horn;
    }
}