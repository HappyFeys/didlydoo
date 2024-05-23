import { generateElement, createDiv, resetHTML } from "./generateElement.js";
import { Get, Set } from "./LocalStorage.js";
import { postEvent } from "./postEvent.js";
import { getEvents } from "./getEvent.js";
import { deleteEvents } from "./deleteEvent.js";

const nameEvent = document.querySelector("#name");
const descriptionEvent = document.querySelector("#description");
const dateEvent = document.querySelector("#date");
const author = document.querySelector("#author")
const btnSubmit = document.querySelector("#submit");
const btnConfirm = document.querySelector("#form--popup--yes")
const main = document.querySelector("main")
const btnAddDate = document.querySelector("#btnAddDate")
const divtoggle = document.querySelector("#form--formulaire")
const headerAddEvent = document.querySelector("#header__addEvent")

let jours = []

btnAddDate.addEventListener("click", () => {
    let date = new Date(dateEvent.value)
    let dateIso = date.toISOString()
    jours.push(dateIso)
    let today = new Date()
    let m = today.getMonth()+1
    let d = today.getDate()
    dateEvent.value = today.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    console.log(jours);
})

headerAddEvent.addEventListener("click", () => {
    const computedStyle = window.getComputedStyle(divtoggle);
    const displayStyle = computedStyle.getPropertyValue('display');
    if (displayStyle === "none") {
        divtoggle.style.display = "flex";
    } else {
        divtoggle.style.display = "none";
    }
})

btnSubmit.addEventListener("click", async ()=>{
    if (nameEvent.value.length > 256 || descriptionEvent.value.length > 256 || author.value.length > 256) {
        alert("Les champs doivent contenir moins de 256 caractères.");
        return;
    }

    let eventDetails = {
        name: nameEvent.value,
        description: descriptionEvent.value,
        dates: jours,
        author: author.value,
    };
    console.log(eventDetails.dates);

    try {
        const responseData = await postEvent(eventDetails.name, eventDetails.dates, eventDetails.author, eventDetails.description);
        console.log('Event successfully posted:', responseData);
        nameEvent.value = "";
        descriptionEvent.value = "";
        author.value = "";
        jours = [];
        
       
        generateDom(eventDetails);

    } catch (error) {
        console.error('Failed to post event:', error);
        alert("Une erreur s'est produite lors de la création de l'événement.");
    }
});
      
        

window.addEventListener('load', async () => {
    try {
        const events = await getEvents();
        if (events && events.length > 0) {
            events.forEach(event => generateDom(event));
        }
    } catch (error) {
        console.error('Failed to load events:', error);
    }
});

function generateTable(section, className) {
    const table = document.createElement("table")
    if (className) table.classList.add(className)
    section.appendChild(table)
    return table
}

export function generateTr(section, className) {
    const tr = document.createElement("tr")
    if (className) tr.classList.add(className)
    section.appendChild(tr)
    return tr
}

export function generateTd(content, section, className) {
    const td = document.createElement("td")
    td.innerText = content
    if (className) td.classList.add(className)
    section.appendChild(td)
    return td
}

export function generateTdNoContent(section, className) {
    const td = document.createElement("td")
    if (className) td.classList.add(className)
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


export function generateDom(event) {

    const main = document.querySelector("main");
    const eventSection = createDiv(main, "event");
    
    const mainEvent = createDiv(eventSection, "main__event");
    generateElement("h2", event.name, mainEvent);
    generateElement("p", event.description, mainEvent);
    generateElement("p", event.author, mainEvent, "author");
    const deleteBtn = generateElement("span", "delete", mainEvent, "material-symbols-outlined");

    deleteBtn.addEventListener("click", () => {
        eventSection.remove();
        deleteEvents(event.id);
    });
    
    const eventTableSection = createDiv(eventSection, "event__table");
    const table = generateTable(eventTableSection);
    
    const eventTableDate = generateTr(table, "event__table--date");
    generateTdNoContent(eventTableDate);

    for (const element of event.dates) {
        let newDate = new Date(element.date);
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
