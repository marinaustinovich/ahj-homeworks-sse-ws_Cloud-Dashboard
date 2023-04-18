const cors = require('@koa/cors');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const fs = require('fs');
const Router = require('koa-router');
const router = new Router();
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 7000 });
const app = new Koa();

const createInstance = require('./public/createInstance');
const startInstance = require('./public/startInstance');
const stopInstance = require('./public/stopInstance');
const deleteInstance = require('./public/deleteInstance');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(koaBody());

server.on('connection', (socket) => {
  console.log('Client connected');

  // Отправка приветственного сообщения клиенту
  socket.send(JSON.stringify({text: 'Welcome to the WebSocket server!'}));

  // Обработчик события 'instance'
  socket.on('message', (instance) => {
    console.log(`Received message: ${instance}`);
  });

  // Обработчик события 'close'
  socket.on('close', () => {
    console.log('Client disconnected');
  });

  // Обработчик события 'error'
  socket.on('error', (error) => {
    console.error(`Error: ${error}`);
  });
});

const sendMessageToClients = async (command, name, info = '') => {
  const response = {
    command,
    timestamp: new Date(),
    name,
    info
  };

  server.clients.forEach((client) => {
    client.send(JSON.stringify(response));
  });
};

router.get('/', async (ctx) => {
  ctx.body = 'Welcome to server!';
});

router.get('/public', async (ctx) => {
  const data = fs.readFileSync('./public/db.json');
  ctx.body = data.toString();
});

// Обработчик запроса для создания нового сервера
router.post('/instances', async (ctx, next) => {
  const id = uuidv4();
  await sendMessageToClients('Received', id, `"Create command"`);
  setTimeout(async () => {
    await createInstance(id);
    await sendMessageToClients('Created', id);
  }, 5000);
  ctx.body = { status: 'ok' };
  await next();
});

// Обработчик запроса для обновления существующего сервера
router.put('/instances/:id', async (ctx, next) => {
  const paramsId = ctx.params.id;
  const queryParams = ctx.query.event;
  const info = queryParams === 'Started' ? `"Start command"` : `"Stop command"`;
  await sendMessageToClients('Received', paramsId, info);

  setTimeout(async () => {
    if (queryParams === 'Started') {
      await startInstance(paramsId);
    } else if (queryParams === 'Stopped') {
      await stopInstance(paramsId);
    }
    await sendMessageToClients(queryParams, paramsId);
  }, 5000);

  ctx.body = { status: 'ok' };
  await next();
});

// Обработчик запроса для удаления сервера
router.delete('/instances/:id', async (ctx, next) => {
  const serverId = ctx.params.id;
  await sendMessageToClients('Received', serverId, `"Remove command"`);
  setTimeout(async () => {
    await deleteInstance(serverId);
    await sendMessageToClients('Removed', serverId);
  }, 5000);
  ctx.body = { status: 'ok' };
  await next();
});

app.use(router.routes()).use(router.allowedMethods());

const port = 7070;
app.listen(port, function () {
  console.log('Server running on http://localhost:7070');
});
