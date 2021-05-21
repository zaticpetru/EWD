import { EventBus } from '../events/eventBus.js';
import { STATE_UPDATED } from '../events/eventNames.js';

class State {
    constructor() {
        this._state = {
            loading : false
        }
    }

    set state(updatedState) {
        this._state = updatedState;
        EventBus.dispatchEvent(STATE_UPDATED, {"new_state" : this._state});
    }

    get state() { return this._state; }
}

const S = new State();
export { S as GS }