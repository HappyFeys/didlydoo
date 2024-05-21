export async function postEvent (eventName, dateTab , author , description){

  const url = "http://localhost:3000/"

  let data = {
    name: eventName,
    dates: dateTab,
    author: author,
    description: description
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





