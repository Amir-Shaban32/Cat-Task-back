import { Vehicle } from "./vehicle.js";
import { Bicycle } from "./bicycle.js";


let v = new Vehicle("green", 2)
let c = new Bicycle();

console.log(v.honkHorn());
console.log(c.honkHorn());
console.log(c.color);
console.log(c.no_wheels);
