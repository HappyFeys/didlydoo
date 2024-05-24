export async function patchEvent (eventName, dateTab , author , description,id){

    const url = `http://localhost:3000/api/events/${id}`
  
    let data = {
      name: eventName,
      dates: dateTab,
      author: author,
      description: description,
      id: id
    }
  
    const body = JSON.stringify(data)
  
    const options = {
      method: `PATCH`,
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