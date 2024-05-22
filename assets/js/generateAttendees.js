import { generateTr, generateTd, generateTdNoContent } from "./generateDom.js";
import { resetHTML } from "./generateElement.js";

const addName = document.querySelector(".table--addName")
const isHere = document.querySelectorAll(".isHere")
const tdDate = document.querySelectorAll(".td--date")
const btnAddPerson = document.querySelector(".btnAddPerson")
const eventTableAdd = document.querySelector(".event__table--add")
const table = document.querySelector("table")


btnAddPerson.addEventListener("click", () =>{
    let newPerson = {
        name : addName.value,

    }
    let newRow = document.createElement("tr");
    newRow.classList.add("event__table--person");
    
    generateTd(newPerson.name, newRow, "td--name");
    
    for (const element of isHere) {
        generateTdNoContent(newRow, element.checked ? "yes" : "no");
    }
    
    table.insertBefore(newRow, eventTableAdd);
    addName.value = ""
    for (const element of isHere) {
        element.checked= false
    } 
})

function generateTrInsertBefore(parent, child, className) {
    const tr = document.createElement("tr")
    if(className) tr.classList.add(className)
    parent.insertBefore(tr, child)
}

