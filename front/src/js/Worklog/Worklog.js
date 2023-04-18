import dayjs from 'dayjs';

export default class Worklog {
  constructor(container, data) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    this.data = data;
    this.worklog = document.createElement('div');
    this.drawUi();
  }

  drawUi() {
    this.worklog.classList.add('worklog-item');
    const time = dayjs(this.data.timestamp).format('HH:mm:ss DD.MM.YY');
    this.worklog.innerHTML = `
      <div class="worklog-timestamp">${time}</div>
      <div class="worklog-name">Server: ${this.data.name}</div>
      <div class="worklog-info">INFO: ${this.data.command} ${this.data.info}</div>
      `;
    this.container.append(this.worklog);
  }
}
