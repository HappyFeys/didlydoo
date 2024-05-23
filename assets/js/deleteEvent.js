
export async function deleteEvents(id) {
    const url = `http://localhost:3000/api/events/${id}/`;

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Event Deleted', responseData);
    } catch (error) {
        console.error('Failed to delete the event:', error);
    }
}