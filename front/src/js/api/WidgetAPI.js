import createRequest from './createRequest';

export default class WidgetAPI {
  constructor(entityPath) {
    this.entityPath = entityPath;
  }

  list() {
    return createRequest({
      method: 'GET',
      path: '/',
    });
  }

  create() {
    return createRequest({
      method: 'POST',
      path: '/',
    });
  }

  delete(id) {
    return createRequest({
      method: 'DELETE',
      path: `/${id}`,
    });
  }

  subscribeOnServerEvents(eventHandler) {
    const eventSource = new EventSource('http://localhost:3000/sse');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      eventHandler(data);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return eventSource;
  }
}
