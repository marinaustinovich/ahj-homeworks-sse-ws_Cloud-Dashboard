const fetchStarted = async (id) => {
  const event = 'Started';
  const response = await fetch(`http://localhost:7070/instances/${id}?event=${event}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const jsonData = await response.json();
  return jsonData;
};

export default fetchStarted;
