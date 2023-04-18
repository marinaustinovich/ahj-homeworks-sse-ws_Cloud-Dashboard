const fetchStoped = async (id) => {
  const event = 'Stopped';
  const response = await fetch(`http://localhost:7070/instances/${id}?event=${event}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event: 'Stopped', id }),
  });
  const jsonData = await response.json();
  return jsonData;
};

export default fetchStoped;
