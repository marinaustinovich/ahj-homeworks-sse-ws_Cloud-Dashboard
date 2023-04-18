const fs = require('fs');

const startInstance = function (id) {
  const data = fs.readFileSync('./public/db.json');
  const servers = JSON.parse(data);
  const startServer = servers.find(item => item.id === id);
  startServer.state = 'running';
}
module.exports = startInstance;
