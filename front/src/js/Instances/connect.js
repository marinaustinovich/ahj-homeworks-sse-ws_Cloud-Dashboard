import Worklog from '../Worklog/Worklog';
import Instance from './Instance';

function handleOpen(event, socket) {
  /* eslint-disable */
  console.log('Connected to WebSocket server');
  const request = { type: 'get_all_instances' };

  const requestJson = JSON.stringify(request);
  socket.send(requestJson);
}

function handleMessage(event) {
  try {
    const response = JSON.parse(event.data);
    
    if (!response.hasOwnProperty('text')) {
        const container = document.querySelector('.worklog-list');
        /* eslint-disable */
        new Worklog(container, response);
        
        if (response.command === 'Created') {
          const instancesList = document.querySelector('.instances-list');
          const data = {
            id: response.name,
            state: 'stopped'
          }
          new Instance(data, instancesList);
        }

    }    
  } catch (error) {
    /* eslint-disable */
    console.error(`Error processing message: ${error}`);
  }
}

function handleClose(event) {
  console.log(event)
  /* eslint-disable */
  console.log('Disconnected from WebSocket server');
}

function handleError(event) {
  /* eslint-disable */
  console.error(`Error: ${event}`);
}

export default function connect() {
  const socket = new WebSocket('ws://localhost:7000');

  socket.addEventListener('open', (event) => handleOpen(event, socket));
  socket.addEventListener('message', (event) => handleMessage(event));
  socket.addEventListener('close', (event) => handleClose(event));
  socket.addEventListener('error', (event) => handleError(event));
}
