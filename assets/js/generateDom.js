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

let jours = []

btnAddDate.addEventListener("click", ()=>{
    let date = new Date(dateEvent.value)
    let dateIso = date.toISOString()
    jours.push(dateIso)
    dateEvent.value=""
    console.log(jours);
})



btnSubmit.addEventListener("click", ()=>{
    // let dateDebut = new Date(startEvent.value)
    // let dateFin = new Date(endEvent.value)
    
    // let iteration = function(date) {
    //     jours.push( date.getFullYear() + '-' + ((date.getMonth() + 1)<10? "0"+(date.getMonth() + 1): (date.getMonth() + 1))+ "-"+ (date.getDate()? "0"+date.getDate() : date.getDate()));
    // };
    // datesEveryDay(dateDebut,dateFin,iteration)
    let event = {
        name : nameEvent.value,
        description : descriptionEvent.value,
        dates : jours,
        author : author.value,
    }
   postEvent(event.name, event.dates, event.author, event.description)
   generateDom(event)
})


function generateTable(section, className) {
    const table = document.createElement("table")
    if(className) table.classList.add(className)
    section.appendChild(table)
}

export function generateTr(section, className) {
    const tr = document.createElement("tr")
    if(className) tr.classList.add(className)
    section.appendChild(tr)
}

export function generateTd(content, section, className) {
    const td = document.createElement("td")
    td.innerText = content
    if(className) td.classList.add(className)
    section.appendChild(td)
}

export function generateTdNoContent(section, className) {
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


export function generateDom(event) {
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
    const table= document.querySelector("table")
    generateTr(table, "event__table--date");
    const eventTableDate = document.querySelector(".event__table--date")
    generateTdNoContent(eventTableDate)
    console.log(event.jours);
    for (const element of event.dates) {
        generateTd(element, eventTableDate, "td--date")
    }
    generateTr(table,"event__table--add")
    const eventTableAdd = document.querySelector(".event__table--add")
    generateTdinput(eventTableAdd,"text", "table--addName")
    for (const element of event.dates) {
        generateTdinput(eventTableAdd,"checkbox", "isHere")
    }
    generateTr(table,"addPerson")
    const TrAddPerson = document.querySelector(".addPerson")
    generateTdNoContent(TrAddPerson, "tdBtn")
    const tdBtn = document.querySelector(".tdBtn")
    generateElement("button", "OK", tdBtn, "btnAddPerson")
}