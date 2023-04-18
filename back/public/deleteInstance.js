const fs = require('fs');

const deleteInstance = function (id) {
  console.log(id)
  try {
    // Прочитайте содержимое файла db.json
    const data = fs.readFileSync('./public/db.json');
    const servers = JSON.parse(data);
    const serverIndex = servers.findIndex(item => item.id === id);
    if (serverIndex !== -1) {
      servers.splice(serverIndex, 1);
      // Запишите обновленный массив серверов обратно в файл db.json
      fs.writeFileSync('./public/db.json', JSON.stringify(servers));
      return {status: 'ok'};
    } else {
      // Если сервер с указанным serverId не найден, вы можете обработать этот случай здесь
      console.log(`Server with id '${id}' not found.`);
      return {status: 'false'}
    }
  } catch (error) {
    console.error(`Error while deleting server with id '${id}':`, error);
  }


}
module.exports = deleteInstance;
