class EventBus {
    constructor() {
        this._bus = document.createElement('div');
    }

    addEventListener(event, callback) {
        this._bus.addEventListener(event, callback);
    }

    removeEventListener(event, callback) {
        this._bus.removeEventListener(event, callback);
    }

    dispatchEvent(event, detail = {}) {
        this._bus.dispatchEvent(new CustomEvent(event, {detail}))
    }
}

const bus = new EventBus();
export { bus as EventBus }