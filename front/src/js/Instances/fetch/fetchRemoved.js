const fetchRemoved = async (id) => {
  const event = 'Deleted';
  const response = await fetch(`http://localhost:7070/instances/${id}?event=${event}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event: 'Removed', id }),
  });
  const jsonData = await response.json();
  return jsonData;
};

export default fetchRemoved;
