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

export async function deleteEvent(id) {
    const url = `http://localhost:3000/api/events/${id}/`

    const options = {
        method : `DELETE`,
        headers: {
            'Content-Type': `application/json`
        },
        body: body
    }

    try {
        const response = await fetch(url, options)
        const responseData = await response.json()
        console.log(`Event Deleted`, responseData);
    } catch (error) {
        
    }
}