const fetchCreated = async () => {
  const response = await fetch('http://localhost:7070/instances', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event: 'Created' }),
  });
  const jsonData = await response.json();
  return jsonData;
};

export default fetchCreated;
