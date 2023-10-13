import dayjs from "dayjs";

import "./worklog.css";

export default class Worklog {
  constructor(container, data) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }

    this.container = container;
    this.data = data;
    this.worklog = document.createElement("div");
    this.drawUi();
  }

  drawUi() {
    this.worklog.classList.add("worklog-item");
    const isStartCreate = this.data.info === "Create command";
    const time = isStartCreate
      ? dayjs(this.data.timeStamp).format("HH:mm:ss DD.MM.YY")
      : this.data.timeStamp;
    const label = isStartCreate ? "Received" : "";

    this.worklog.innerHTML = `
      <div class="worklog-timestamp">${time}</div>
      <div class="worklog-name">Server: ${this.data.id}</div>
      <div class="worklog-info">INFO: ${label} ${this.data.info}</div>
      `;
    this.container.querySelector(".worklog-list").append(this.worklog);
  }
}
