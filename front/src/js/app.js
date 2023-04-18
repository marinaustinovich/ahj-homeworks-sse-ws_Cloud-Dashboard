import InstanceWidget from './Instances/InstanceWidget';
import WorklogWidget from './Worklog/WorklogWidget';

/* eslint-disable */
console.log('it works!');

window.addEventListener('load', async () => {
    const response = await fetch('http://localhost:7070/public', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status >= 200 && response.status < 300) {
    try {
      const jsonData = await response.json();
      const container = document.querySelector('.cloud-container')
      new InstanceWidget(container, jsonData);
      new WorklogWidget(container);
    } catch (e) {
      /* eslint-disable */
      console.error(e);
    }
  }
});




