import { generateElement, createDiv, resetHTML } from "./generateElement.js";
import { Get, Set } from "./LocalStorage.js";
import { postEvent } from "./api.js";

const nameEvent = document.querySelector("#name");
const descriptionEvent = document.querySelector("#description");
const dateEvent = document.querySelector("#date");
const author = document.querySelector("#author")
const btnSubmit = document.querySelector("#submit");
const btnConfirm = document.querySelector("#form--popup--yes")
const main = document.querySelector("main")
const btnAddDate = document.querySelector("#btnAddDate")
const divtoggle= document.querySelector("#form--formulaire")
const headerAddEvent = document.querySelector("#header__addEvent")

let jours = []

btnAddDate.addEventListener("click", ()=>{
    let date = new Date(dateEvent.value)
    let dateIso = date.toISOString()
    jours.push(dateIso)
    dateEvent.value=""
    console.log(jours);
})

headerAddEvent.addEventListener("click", ()=>{
    const computedStyle = window.getComputedStyle(divtoggle);
    const displayStyle = computedStyle.getPropertyValue('display');
    if (displayStyle === "none") {
        divtoggle.style.display = "flex";
    } else {
        divtoggle.style.display = "none";
    }
})


btnSubmit.addEventListener("click", ()=>{
    
    const computedStyle = window.getComputedStyle(divtoggle);
    const displayStyle = computedStyle.getPropertyValue('display');
    if (displayStyle === "none") {
        divtoggle.style.display = "flex";
    } else {
        divtoggle.style.display = "none";
    }

    let event = {
        name : nameEvent.value,
        description : descriptionEvent.value,
        dates : jours,
        author : author.value,
    }
//    postEvent(event.name, event.dates, event.author, event.description)
    Set("event", event)
   generateDom(event)
   jours=[]
   console.log(jours);
   console.log(event);
})


function generateTable(section, className) {
    const table = document.createElement("table")
    if(className) table.classList.add(className)
    section.appendChild(table)
    return table
}

export function generateTr(section, className) {
    const tr = document.createElement("tr")
    if(className) tr.classList.add(className)
    section.appendChild(tr)
    return tr
}

export function generateTd(content, section, className) {
    const td = document.createElement("td")
    td.innerText = content
    if(className) td.classList.add(className)
    section.appendChild(td)
    return td
}

export function generateTdNoContent(section, className) {
    const td = document.createElement("td")
    if(className) td.classList.add(className)
    section.appendChild(td)
return td
}

function generateTdinput(parent, type, className) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = type;
    if (className) {
        input.classList.add(className);
    }
    td.appendChild(input);
    parent.appendChild(td);
    return input
}



function datesEveryDay(start, end, f) {
    f = f || function(g) {
      return g;
    };
    let startDate = new Date(start),
        endDate = end ? new Date(end) : new Date(),
        timeStampStart = startDate.getTime(),
        timeStampEnd = endDate.getTime(),
        c = timeStampStart > timeStampEnd ? endDate : startDate,
        d = timeStampEnd > timeStampEnd ? timeStampStart : timeStampEnd;
    do {
      f(new Date(c));
      c.setDate(c.getDate() + 1);
    } while (d >= c.getTime());
  }


export function generateDom(event) {

    const main = document.querySelector("main");
    const eventSection = createDiv(main, "event");
    
    const mainEvent = createDiv(eventSection, "main__event");
    generateElement("h2", event.name, mainEvent);
    generateElement("p", event.description, mainEvent);
    generateElement("p", event.author, mainEvent, "author");
    const deleteBtn = generateElement("span", "delete", mainEvent, "material-symbols-outlined");

    deleteBtn.addEventListener("click", () => {
        console.log("j'ai bien clic sur supprimé");
        eventSection.remove();
    });
    
    const eventTableSection = createDiv(eventSection, "event__table");
    const table = generateTable(eventTableSection);
    
    const eventTableDate = generateTr(table, "event__table--date");
    generateTdNoContent(eventTableDate);
    for (const element of event.dates) {
        let newDate = new Date(element);
        let newDateFormat = (newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()) + "/" + ((newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1));
        generateTd(newDateFormat, eventTableDate, "td--date");
    }
    
    const eventTableAdd = generateTr(table, "event__table--add");
    const addNameInput = generateTdinput(eventTableAdd, "text", "table--addName");
    const isHereCheckboxes = [];
    for (const element of event.dates) {
        const checkbox = generateTdinput(eventTableAdd, "checkbox", "isHere");
        isHereCheckboxes.push(checkbox);
    }

    const TrAddPerson = generateTr(table, "addPerson");
    const tdBtn = generateTdNoContent(TrAddPerson, "tdBtn");
    const btnAddPerson = generateElement("button", "OK", tdBtn, "btnAddPerson");
    
    btnAddPerson.addEventListener("click", () => {
        let newPerson = {
            name: addNameInput.value
        };
        console.log(addNameInput.value);
        let newRow = document.createElement("tr");
        newRow.classList.add("event__table--person");

        generateTd(newPerson.name, newRow, "td--name");

        for (const checkbox of isHereCheckboxes) {
            generateTdNoContent(newRow, checkbox.checked ? "yes" : "no");
        }

        table.insertBefore(newRow, eventTableAdd);
        
        addNameInput.value = ""
        for (const element of isHereCheckboxes) {
            element.checked= false
        }
    });

}
