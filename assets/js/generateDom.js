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
const divtoggle = document.querySelector("#form--formulaire")
const headerAddEvent = document.querySelector("#header__addEvent")

let jours = []

btnAddDate.addEventListener("click", () => {
    let date = new Date(dateEvent.value)
    let dateIso = date.toISOString()
    jours.push(dateIso)
    dateEvent.value = ""
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

btnSubmit.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Validation des champs
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

    try {
        const responseData = await postEvent(eventDetails.name, eventDetails.dates, eventDetails.author, eventDetails.description);
        console.log('Event successfully posted:', responseData);

        // Cache le formulaire après la soumission réussie
        divtoggle.style.display = "none";

        // Réinitialise les champs du formulaire
        nameEvent.value = "";
        descriptionEvent.value = "";
        author.value = "";
        jours = [];
        
        // Appelle la fonction pour générer le DOM avec l'événement créé
        generateDom(eventDetails);

        // Enregistre l'événement dans le local storage
        Set("event", eventDetails);

    } catch (error) {
        console.error('Failed to post event:', error);
        alert("Une erreur s'est produite lors de la création de l'événement.");
    }
});

window.addEventListener('load', () => {
    const storedEvent = Get("event");
    if (storedEvent) {
        generateDom(storedEvent);
    }
});

function generateTable(section, className) {
    const table = document.createElement("table")
    if (className) table.classList.add(className)
    section.appendChild(table)
}

export function generateTr(section, className) {
    const tr = document.createElement("tr")
    if (className) tr.classList.add(className)
    section.appendChild(tr)
}

export function generateTd(content, section, className) {
    const td = document.createElement("td")
    td.innerText = content
    if (className) td.classList.add(className)
    section.appendChild(td)
}

export function generateTdNoContent(section, className) {
    const td = document.createElement("td")
    if (className) td.classList.add(className)
    section.appendChild(td)
}

function generateTdinput(section, type, className) {
    const td = document.createElement("td")
    section.appendChild(td)
    const input = document.createElement("input")
    input.type = type
    if (className) input.classList.add(className)
    td.appendChild(input)
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
    createDiv(main, "event")
    const eventSection = document.querySelector(".event")
    createDiv(eventSection, "main__event")
    const mainEvent = document.querySelector(".main__event")
    generateElement("h2", event.name, mainEvent)
    generateElement("p", event.description, mainEvent)
    generateElement("p", event.author, mainEvent, "author")
    createDiv(eventSection, "event__table")
    const eventTable = document.querySelector(".event__table")
    generateTable(eventTable)
    const table = document.querySelector("table")
    generateTr(table, "event__table--date");
    const eventTableDate = document.querySelector(".event__table--date")
    generateTdNoContent(eventTableDate)
    for (const element of event.dates) {
        generateTd(element, eventTableDate, "td--date")
    }
    generateTr(table, "event__table--add")
    const eventTableAdd = document.querySelector(".event__table--add")
    generateTdinput(eventTableAdd, "text", "table--addName")
    for (const element of event.dates) {
        generateTdinput(eventTableAdd, "checkbox", "isHere")
    }
    generateTr(table, "addPerson")
    const TrAddPerson = document.querySelector(".addPerson")
    generateTdNoContent(TrAddPerson, "tdBtn")
    const tdBtn = document.querySelector(".tdBtn")
    generateElement("button", "OK", tdBtn, "btnAddPerson")
}
