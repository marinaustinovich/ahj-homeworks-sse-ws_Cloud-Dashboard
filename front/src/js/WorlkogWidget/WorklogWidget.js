import './worklog-widget.css';

export default class WorklogWidget {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    this.worklogList = null;
  }

  init() {
    this.worklogList = document.createElement('div');
    this.worklogList.classList.add('worklog-widget');
    this.worklogList.innerHTML = `
        <h3>Worklog:</h3>
        <div class="worklog-list"></div>
      `;
    this.container.append(this.worklogList);
  }
}
