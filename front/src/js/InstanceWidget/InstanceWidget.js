import Instance from '../Instance/Instance';
import Worklog from '../Worklog/Worklog';
import WidgetAPI from '../api/WidgetAPI';
import './instance-widget.css';

export default class InstanceWidget {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    this.instances = [];
    this.instanceListWidget = null;
    this.instanceObjects = [];
    this.websocket = null;
  }

  init() {
    this.drawUi();
    this.events();
    this.onEnterChatHandler();
    this.subscribeToServerEvents();
  }

  async drawUi() {
    this.instanceListWidget = document.createElement('div');
    this.instanceListWidget.classList.add('instances-widget');

    this.instanceListWidget.innerHTML = `
      <h3>Your micro instances</h3>
      <ul class="instances-list"></ul>
      <button class="add-instance" aria-label="Create new instance">Create new instance</button>
    `;

    this.list = this.instanceListWidget.querySelector('.instances-list');
    this.renderInstanceList();
    this.container.append(this.instanceListWidget);
  }

  events() {
    const addBtn = this.instanceListWidget.querySelector('.add-instance');
    addBtn.addEventListener('click', () => InstanceWidget.createInstance());
  }

  static async createInstance() {
    try {
      await WidgetAPI.create();
    } catch (error) {
      console.error('Error creating new instance:', error);
    }
  }

  subscribeToServerEvents() {
    WidgetAPI.subscribeOnServerEvents((data) => {
      const worklog = new Worklog(this.container, data);
      this.activeWorklog = worklog;

      if (data.info !== 'Create command') {
        this.renderInstanceList();
      }
    });
  }

  onEnterChatHandler() {
    this.websocket = new WebSocket('ws://localhost:3000');
    this.subscribeOnEvents();
  }

  subscribeOnEvents() {
    this.websocket.addEventListener('open', () => InstanceWidget.handleOpen());
    this.websocket.addEventListener('message', (event) => InstanceWidget.handleMessage(event));
    this.websocket.addEventListener('close', () => InstanceWidget.handleClose());
    this.websocket.addEventListener('error', (event) => InstanceWidget.handleError(event));
  }

  static handleOpen() {
    console.log('Connected to WebSocket server');
  }

  static handleClose() {
    console.log('Disconnected from WebSocket server');
  }

  static handleError(event) {
    console.error(`Error: ${event}`);
  }

  static handleMessage(event) {
    console.log(event.data);
  }

  async renderInstanceList() {
    this.list.innerHTML = '';
    const { data } = await WidgetAPI.list();
    this.instances = data;

    if (this.instances.length > 0) {
      this.instances.forEach((instance) => this.addInstance(instance));
    }
  }

  addInstance(result) {
    const instance = new Instance(result, this.websocket);
    this.instanceObjects.push(instance);
    this.list.appendChild(instance.markup());
  }
}
