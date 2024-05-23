import { resetHTML } from "./generateElement.js";

const event = document.querySelectorAll(".event")

event.forEach(events => {
    const btnDelete = events.querySelectorAll(".material-symbols-outlined");
    for (const element of btnDelete) {
        element.addEventListener("click", () => {
            events.remove();
            
        });
    }
})