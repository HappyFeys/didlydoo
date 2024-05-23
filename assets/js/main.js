import { generateDom } from "./generateDom.js";


const inputDate = document.querySelector("#date")
let today = new Date()
let m = today.getMonth()+1
let d = today.getDate()
inputDate.min=today.toISOString().split('T')[0]
inputDate.value=today.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);


