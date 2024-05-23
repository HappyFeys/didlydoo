export async function postEvent(eventName, dateTab, author, description) {
    const url = "http://localhost:3000/api/events/"; 
  
    let data = {
      name: eventName,
      dates: dateTab,
      author: author,
      description: description
    };
  
    const body = JSON.stringify(data);
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    };
  
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Event created:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error; // rethrow the error to handle it outside the function if needed
    }
  }