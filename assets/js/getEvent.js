export async function getEvents() {
  const url = `http://localhost:3000/api/events/`;

  try {
      const response = await fetch(url);
      
      const responseData = await response.json();
      return responseData;
  } catch (error) {

  }
}