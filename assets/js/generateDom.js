import { generateElement, createDiv, resetHTML } from "./generateElement.js";
import { postEvent } from "./postEvent.js";
import { getEvents } from "./getEvent.js";
import { deleteEvents } from "./deleteEvent.js";
import { postAttendance } from "./postAttendance.js"; 

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
    let m = today.getMonth() + 1
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

btnSubmit.addEventListener("click", async () => {
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

        eventDetails.id = responseData.id;  // Ajouter l'ID de l'événement à l'objet
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
    const editBtn = generateElement("span", "edit", mainEvent, "material-symbols-outlined");

    deleteBtn.addEventListener("click", () => {
        eventSection.remove();
        deleteEvents(event.id);
    });

    editBtn.addEventListener("click", () => {
        // Edit functionality can be implemented here
    })

    const eventTableSection = createDiv(eventSection, "event__table");
    const table = generateTable(eventTableSection);
    table.classList.add("test-" + event.id)

    const eventTableDate = generateTr(table, "event__table--date");
    generateTdNoContent(eventTableDate);

    for (const element of event.dates) {
        let newDate = new Date(element.date);
        let newDateFormat = (newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()) + "/" + ((newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1));
        generateTd(newDateFormat, eventTableDate, "td--date");
    }

    const eventTableAdd = generateTr(table, "event__table--add-" + event.id);
    const addNameInput = generateTdinput(eventTableAdd, "text", "table--addName");
    const isHereCheckboxes = [];
    for (const element of event.dates) {
        const checkbox = generateTdinput(eventTableAdd, "checkbox", "isHere");
        isHereCheckboxes.push(checkbox);
    }

    const TrAddPerson = generateTr(table, "addPerson");
    const tdBtn = generateTdNoContent(TrAddPerson, "tdBtn");
    const btnAddPerson = generateElement("button", "OK", tdBtn, "btnAddPerson");

    let organizedData = {};

    for (const element of event.dates) {
        if (element.attendees) {
            for (const iterator of element.attendees) {
                if (!organizedData[element.date]) {
                    organizedData[element.date] = [];
                }
                organizedData[element.date].push({ name: iterator.name, available: iterator.available });
            }
        }
    }

    console.log(organizedData);

    displayData(organizedData, event.id);

    btnAddPerson.addEventListener("click", async () => {
        let newPerson = {
            name: addNameInput.value,
            dates: []

        };
        let newRow = document.createElement("tr");
        newRow.classList.add("event__table--person");

        generateTd(newPerson.name, newRow, "td--name");

        let attendanceData = [];

        for (let i = 0; i < event.dates.length; i++) {
            const isAvailable = isHereCheckboxes[i].checked;
            newPerson.dates.push({
                date: event.dates[i].date,
                available: isAvailable
            });
            console.log(newPerson)
        }

        for (const checkbox of isHereCheckboxes) {
            const isAvailable = checkbox.checked;
            attendanceData.push(isAvailable);
            generateTd(isAvailable ? "yes" : "no", newRow, isAvailable ? "yes" : "no");
        }

        table.insertBefore(newRow, eventTableAdd);

        addNameInput.value = "";
        for (const element of isHereCheckboxes) {
            element.checked = false;
        }

        try {
            for (let i = 0; i < event.dates.length; i++) {
                await postAttendance(event.id, newPerson);
            }
            console.log('Attendance successfully posted');
        } catch (error) {
            console.error('Failed to post attendance:', error);
            alert("Une erreur s'est produite lors de l'ajout de la disponibilité.");
        }
    });
}

function displayData(organizedData, test) {
    const table = document.querySelector(".test-" + test);
    const eventTableAdd = document.querySelector(".event__table--add-" + test);
    const dates = Object.keys(organizedData);

    let names = new Set();
    for (const date in organizedData) {
        organizedData[date].forEach(attendee => names.add(attendee.name));
    }
    names = Array.from(names);

    names.forEach(name => {
        let newRow = document.createElement("tr");
        newRow.classList.add("event__table--person");

        generateTd(name, newRow, "td--name");

        dates.forEach(date => {
            const attendee = organizedData[date].find(attendee => attendee.name === name);
            const availability = attendee ? (attendee.available !== null ? (attendee.available ? "yes" : "no") : "unknown") : "no info";

            generateTd(availability, newRow, "td--availability");
            setTimeout(() => {
                let elements = document.querySelectorAll(".td--availability");
                elements.forEach(td => {
                    if (td.innerText === "yes") {
                        td.classList.add("yes");
                        td.style.color = "transparent"
                    } else if (td.innerText === "no") {
                        td.classList.add("no");
                        td.style.color = "transparent"
                    } else {
                        td.classList.add("unknown");
                        td.style.color = "transparent"
                    }
                });
            }, 0);
        });

        table.insertBefore(newRow, eventTableAdd);
    });
}
