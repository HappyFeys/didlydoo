export async function postAttendance ( eventId,attendeeName) {
console.log(attendeeName.name);
console.log(attendeeName.dates);
console.log(eventId);
const url = `http://localhost:3000/api/events/${eventId}/attend`;

const data = {
    name: attendeeName.name,
     dates : attendeeName.dates
}
console.log(data);


const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    
    body: JSON.stringify(data)
}

try {
    const response = await fetch(url,options)

    const reponseData = await response.json()

    return reponseData

}catch{



}

}