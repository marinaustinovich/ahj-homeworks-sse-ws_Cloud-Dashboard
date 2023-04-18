const fs = require('fs');

const stopInstance = function (id) {
  const data = fs.readFileSync('./public/db.json');
  const servers = JSON.parse(data);
  const stopServer = servers.find(item => item.id === id);
  stopServer.state = 'stopped';
}
module.exports = stopInstance;
