import createRequest from './createRequest';

export default class WidgetAPI {
  static list() {
    return createRequest({
      method: 'GET',
      path: '/',
    });
  }

  static create() {
    return createRequest({
      method: 'POST',
      path: '/',
    });
  }

  static delete(id) {
    return createRequest({
      method: 'DELETE',
      path: `/${id}`,
    });
  }

  static subscribeOnServerEvents(eventHandler) {
    const eventSource = new EventSource('http://cloud-dachboard.onrender.com/sse');

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
