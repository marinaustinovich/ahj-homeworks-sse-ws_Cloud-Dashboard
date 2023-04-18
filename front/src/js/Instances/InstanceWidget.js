import Instance from './Instance';
import fetchCreated from './fetch/fetchCreated';
import connect from './connect';

export default class InstanceWidget {
  constructor(container, data) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    this.instances = data;
    this.widget = document.createElement('div');

    this.init();
  }

  async init() {
    this.drawUi();
    this.events();
    await connect();
  }

  drawUi() {
    this.widget.classList.add('instances-widget');
    this.widget.innerHTML = `
      <h3>Your micro instances</h3>
      <ul class="instances-list"></ul>
      <button class="add-instance" aria-label="Create new instance">Create new instance</button>
    `;

    this.instances.forEach((instance) => this.addInstance(instance));
    this.container.append(this.widget);
  }

  events() {
    const addBtn = this.widget.querySelector('.add-instance');
    addBtn.addEventListener('click', async () => await fetchCreated());
  }

  addInstance(result) {
    const instancesList = this.widget.querySelector('.instances-list');
    const instance = new Instance(result, instancesList);
  }
}
