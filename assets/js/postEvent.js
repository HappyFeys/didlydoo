export async function postEvent (eventName, dateTab , author , description, attendees){

  const url = "http://localhost:3000/api/events/"

  let data = {
    name: eventName,
    dates: dateTab,
    author: author,
    description: description,
    attendees: attendees
  }

  const body = JSON.stringify(data)

  const options = {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`
    },
    body: body
  }

  try{

    const response = await fetch(url,options)

  

    const responseData = await response.json()
    console.log(`Event Created`, responseData)
    return responseData


  }catch (error) {

  }
}