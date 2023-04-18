const fs = require('fs');
const Instance = require('./Instance');

const createInstance = function (id) {
  const instance = new Instance(id);
  // Чтение данных из db.json, Добавление нового объекта в массив
  const data = fs.readFileSync('./public/db.json');
  const servers = JSON.parse(data);
  servers.push(instance);
  // Запись обновленных данных в файл
  fs.writeFileSync('./public/db.json', JSON.stringify(servers));

  return instance;
}
module.exports = createInstance;
