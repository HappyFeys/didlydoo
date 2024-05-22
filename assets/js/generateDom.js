import { generateElement, createDiv, resetHTML } from "./generateElement.js";
import { Get, Set } from "./LocalStorage.js";

const nameEvent = document.querySelector("#name");
const descriptionEvent = document.querySelector("#description");
const startEvent = document.querySelector("#start");
const endEvent = document.querySelector("#end");
const author = document.querySelector("#author")
const btnSubmit = document.querySelector("#submit");
const btnConfirm = document.querySelector("#form--popup--yes")
const main = document.querySelector("main")

btnSubmit.addEventListener("click", ()=>{
    let dateDebut = new Date(startEvent.value)
    let dateFin = new Date(endEvent.value)
    let jours = []
    let iteration = function(date) {
        jours.push( date.getDate() + '/' + ((date.getMonth() + 1)<10? "0"+(date.getMonth() + 1): (date.getMonth() + 1)));
    };
    datesEveryDay(dateDebut,dateFin,iteration)
    const event = {
        id: generateID(),
        name : nameEvent.value,
        description : descriptionEvent.value,
        dates : jours,
        author : author.value,
        // created_at : new Date.now(),
        // num_modification : 0, // faire un systeme de count
        // last_modification : new Date.now() // récupérer la date de modif et la stocker la
    }
    Set("event", event)
    createDiv(main, "event")
    const eventSection = document.querySelector(".event")
    createDiv(eventSection, "main__event")
    const mainEvent = document.querySelector(".main__event")
    generateElement("h2",event.name,mainEvent)
    generateElement("p", event.description, mainEvent)
    generateElement("p", event.author,mainEvent,"author")
    createDiv(eventSection, "event__table")
    const eventTable = document.querySelector(".event__table")
    generateTable(eventTable)
    const table= document.querySelector("table") //possible bug ici lorsque je crée plusieurs évent en même temps
    generateTr(table, "event__table--date");
    const eventTableDate = document.querySelector(".event__table--date")
    generateTdNoContent(eventTableDate)
    
    console.log(jours);
    for (const element of jours) {
        generateTd(element, eventTableDate, "td--date")
    }
    generateTr(table,"event__table--add")
    const eventTableAdd = document.querySelector(".event__table--add")
    generateTdinput(eventTableAdd,"text", "table--addName")
    for (const element of jours) {
        generateTdinput(eventTableAdd,"checkbox", "isHere")
    }
})


function generateTable(section, className) {
    const table = document.createElement("table")
    if(className) table.classList.add(className)
    section.appendChild(table)
}

function generateTr(section, className) {
    const tr = document.createElement("tr")
    if(className) tr.classList.add(className)
    section.appendChild(tr)
}

function generateTd(content, section, className) {
    const td = document.createElement("td")
    td.innerText = content
    if(className) td.classList.add(className)
    section.appendChild(td)
}

function generateTdNoContent(section, className) {
    const td = document.createElement("td")
    if(className) td.classList.add(className)
    section.appendChild(td)
}

function generateTdinput(section, type, className) {
    const td = document.createElement("td")
    section.appendChild(td)
    const input = document.createElement("input")
    input.type=type
    if(className) input.classList.add(className)
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


  function generateID() {
    const length = 12;
    
    const characters = '0123456789abcdef';
    
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    
    return result;
}

