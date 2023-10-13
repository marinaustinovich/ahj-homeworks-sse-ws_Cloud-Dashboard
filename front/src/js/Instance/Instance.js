import "./instance.css";

export default class Instance {
  constructor(data, ws, api) {
    this.data = data;
    this.ws = ws;
    this.api = api;
    this.instance = document.createElement("li");
    this.init();
    this.registerWebSocketListeners();
  }

  init() {
    this.instance.classList.add("instance-item");
    this.updateUI();
  }

  updateUI() {
    const classStatus =
      this.data.state === "running"
        ? "status-icon-running"
        : "status-icon-stop";
    this.instance.innerHTML = `
      <span class="instance-name">${this.data.id}</span>
      <div class="status">
        <span class="status-title">Status:</span>
        <span class=${classStatus}>${this.data.state}</span>
      </div>
      <div class="actions">
        <span class="status-title">Actions:</span>
        <button class="instance-start" aria-label="start instance" ${
          this.data.state === "running" ? 'style="display:none;"' : ""
        }>▶</button>
        <button class="instance-stop" aria-label="stop instance" ${
          this.data.state === "stopped" ? 'style="display:none;"' : ""
        }>&#9208</button>
        <button class="instance-close" aria-label="close instance">&#10006;</button>
      </div>
    `;
    this.registerEvents();
  }

  registerEvents() {
    const startBtn = this.instance.querySelector(".instance-start");
    const stopBtn = this.instance.querySelector(".instance-stop");
    const closeBtn = this.instance.querySelector(".instance-close");

    startBtn.addEventListener("click", async () => this.sendMessage("start"));
    stopBtn.addEventListener("click", async () => this.sendMessage("stop"));
    closeBtn.addEventListener("click", async () => this.close());
  }

  sendMessage(action) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ id: this.data.id, action }));
    }
  }

  registerWebSocketListeners() {
    if (this.ws) {
      this.ws.addEventListener("message", (event) => {
        const updatedInstance = JSON.parse(event.data);
        if (updatedInstance.id === this.data.id) {
          this.data = updatedInstance;
          this.updateUI();
        }
      });
    }
  }

  updateData(newData) {
    this.data = newData;
    this.updateUI();
  }

  async close() {
    console.log("close");
    try {
      await this.api.delete(this.data.id);
    } catch (error) {
      console.error("Error deleting instance:", error);
    }
  }

  markup() {
    return this.instance;
  }
}
