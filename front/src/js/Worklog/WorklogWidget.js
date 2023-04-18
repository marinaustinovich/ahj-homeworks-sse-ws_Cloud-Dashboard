export default class WorklogWidget {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    this.widget = document.createElement('div');

    this.drawUi();
  }

  drawUi() {
    this.widget.classList.add('worklog-widget');
    this.widget.innerHTML = `
        <h3>Worklog:</h3>
        <div class="worklog-list"></div>
      `;
    this.container.append(this.widget);
  }
}
