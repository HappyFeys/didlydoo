import { generateDom } from "./generateDom.js";


const inputDate = document.querySelector("#date")
let today = new Date()
let m = today.getMonth()+1
let d = today.getDate()
inputDate.min=today.toISOString().split('T')[0]
inputDate.value=today.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);


let test = new Date('2024-05-25')
console.log(test);

let newDateFormat = (test.getDate() < 10 ? "0" + test.getDate() : test.getDate()) + "/" + ((test.getMonth() + 1) < 10 ? "0" + (test.getMonth() + 1) : (test.getMonth() + 1));

console.log(newDateFormat);