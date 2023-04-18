import fetchRemoved from './fetch/fetchRemoved';
import fetchStarted from './fetch/fetchStarted';
import fetchStoped from './fetch/fetchStoped';

export default class Instance {
  constructor(data, container) {
    this.data = data;
    this.container = container;
    this.instance = document.createElement('li');
    this.init();
  }

  init() {
    this.instance.classList.add('instance-item');
    this.updateUI();
    this.container.appendChild(this.instance);
  }

  updateUI() {
    const classStatus = this.data.state === 'running' ? 'status-icon-running' : 'status-icon-stop';
    this.instance.innerHTML = `
      <span class="instance-name">${this.data.id}</span>
      <div class="status">
        <span class="status-title">Status:</span>
        <span class=${classStatus}>${this.data.state}</span>
      </div>
      <div class="actions">
        <span class="status-title">Actions:</span>
        <button class="instance-start" aria-label="start instance" ${this.data.state === 'running' ? 'style="display:none;"' : ''}>▶</button>
        <button class="instance-stop" aria-label="stop instance" ${this.data.state !== 'running' ? 'style="display:none;"' : ''}>&#9208</button>
        <button class="instance-close" aria-label="close instance">&#10006;</button>
      </div>
    `;
    this.registerEvents();
  }

  registerEvents() {
    const startBtn = this.instance.querySelector('.instance-start');
    const stopBtn = this.instance.querySelector('.instance-stop');
    const closeBtn = this.instance.querySelector('.instance-close');

    startBtn.addEventListener('click', async () => this.start());
    stopBtn.addEventListener('click', async () => this.stop());
    closeBtn.addEventListener('click', async () => this.close());
  }

  async start() {
    const result = await fetchStarted(this.data.id);
    if (result.status === 'ok') {
      this.data.state = 'running';
      setTimeout(() => this.updateUI(), 5000);
    }
  }

  async stop() {
    const result = await fetchStoped(this.data.id);
    if (result.status === 'ok') {
      this.data.state = 'stopped';
      setTimeout(() => this.updateUI(), 5000);
    }
  }

  async close() {
    const result = await fetchRemoved(this.data.id);
    if (result.status === 'ok') {
      setTimeout(() => this.instance.parentNode.removeChild(this.instance), 5000);
    }
  }
}
